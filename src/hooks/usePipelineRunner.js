import { useState, useCallback, useRef, useEffect } from 'react';
import { AGENTS } from '../data/agentConfig.js';
import { agent1Output } from '../data/agent1Output.js';
import { agent2Output } from '../data/agent2Output.js';
import { agent3Output } from '../data/agent3Output.js';
import { agent4Output } from '../data/agent4Output.js';
import { agent5Output } from '../data/agent5Output.js';
import { agent6Output } from '../data/agent6Output.js';

const AGENT_OUTPUTS = {
  'customer-feedback-pipeline': agent1Output,
  'data-scientist': agent2Output,
  'metrics-narrator': agent3Output,
  'chief-of-staff': agent4Output,
  'prd-architect': agent5Output,
  'stakeholder-translator': agent6Output,
};

const createInitialStates = () => {
  const states = {};
  AGENTS.forEach((agent) => {
    states[agent.id] = {
      status: 'idle',
      currentSubStep: 0,
      progress: 0,
      startTime: null,
      endTime: null,
    };
  });
  return states;
};

/**
 * Slice a single output payload to a fraction `frac` (0–1) of its content.
 * Strings are sliced char-by-char. Objects with `tabs` or `communications`
 * have their nested content sliced so streaming works for the multi-tab agent.
 * Returns a partial-but-renderable copy that the UI can display mid-flight.
 */
const sliceOutput = (full, frac) => {
  if (full === null || full === undefined) return null;
  const f = Math.max(0, Math.min(1, frac));

  if (typeof full === 'string') {
    return full.slice(0, Math.floor(full.length * f));
  }

  if (typeof full !== 'object') return full;

  if (full.tabs && typeof full.tabs === 'object') {
    const tabs = {};
    for (const [k, v] of Object.entries(full.tabs)) {
      tabs[k] = typeof v === 'string' ? v.slice(0, Math.floor(v.length * f)) : v;
    }
    return { ...full, tabs };
  }

  if (full.communications && typeof full.communications === 'object') {
    const communications = {};
    for (const [k, block] of Object.entries(full.communications)) {
      if (block && typeof block === 'object' && typeof block.content === 'string') {
        communications[k] = {
          ...block,
          content: block.content.slice(0, Math.floor(block.content.length * f)),
        };
      } else if (typeof block === 'string') {
        communications[k] = block.slice(0, Math.floor(block.length * f));
      } else {
        communications[k] = block;
      }
    }
    return { ...full, communications };
  }

  if (typeof full.content === 'string') {
    return { ...full, content: full.content.slice(0, Math.floor(full.content.length * f)) };
  }

  return full;
};

/**
 * Pipeline orchestration state machine.
 * Runs 6 agents sequentially with sub-step cycling and timing.
 *
 * Output streaming: while an agent is processing, its output is revealed
 * progressively in lockstep with its sub-step progress so the UI never sits
 * silent waiting for a 4–6s agent to finish (issue #8).
 */
export function usePipelineRunner() {
  const [status, setStatus] = useState('idle');
  const [agentStates, setAgentStates] = useState(createInitialStates);
  const [outputs, setOutputs] = useState({});
  const [errors, setErrors] = useState({});
  const [elapsed, setElapsed] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const timerRef = useRef(null);
  const runningRef = useRef(false);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const runAgent = useCallback(
    (agentIndex) =>
      new Promise((resolve, reject) => {
        const agent = AGENTS[agentIndex];
        if (!agent) {
          resolve();
          return;
        }

        const fullOutput = AGENT_OUTPUTS[agent.id];

        setAgentStates((prev) => ({
          ...prev,
          [agent.id]: {
            ...prev[agent.id],
            status: 'processing',
            startTime: Date.now(),
            currentSubStep: 0,
            progress: 0,
          },
        }));

        // Seed an empty partial output immediately so the UI can switch from
        // "waiting" copy to a streaming view as soon as the agent starts.
        setOutputs((prev) => ({
          ...prev,
          [agent.id]: sliceOutput(fullOutput, 0),
        }));

        const totalSteps = agent.subSteps.length;
        const stepDuration = agent.processingTime / totalSteps;
        let currentStep = 0;

        const stepInterval = setInterval(() => {
          try {
            currentStep++;

            if (currentStep >= totalSteps) {
              clearInterval(stepInterval);

              setAgentStates((prev) => ({
                ...prev,
                [agent.id]: {
                  ...prev[agent.id],
                  status: 'complete',
                  currentSubStep: totalSteps - 1,
                  progress: 100,
                  endTime: Date.now(),
                },
              }));

              // Final reveal: full, untruncated output.
              setOutputs((prev) => ({
                ...prev,
                [agent.id]: fullOutput,
              }));

              setCompletedCount((c) => c + 1);
              resolve();
            } else {
              const progress = currentStep / totalSteps;
              setAgentStates((prev) => ({
                ...prev,
                [agent.id]: {
                  ...prev[agent.id],
                  currentSubStep: currentStep,
                  progress: Math.round(progress * 100),
                },
              }));

              // Stream the next slice in lockstep with sub-step progress.
              setOutputs((prev) => ({
                ...prev,
                [agent.id]: sliceOutput(fullOutput, progress),
              }));
            }
          } catch (err) {
            clearInterval(stepInterval);
            setAgentStates((prev) => ({
              ...prev,
              [agent.id]: {
                ...prev[agent.id],
                status: 'error',
                endTime: Date.now(),
              },
            }));
            setErrors((prev) => ({
              ...prev,
              [agent.id]: err?.message || String(err),
            }));
            reject(err);
          }
        }, stepDuration);
      }),
    []
  );

  const run = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;

    setStatus('running');
    setAgentStates(createInitialStates());
    setOutputs({});
    setErrors({});
    setCompletedCount(0);
    setElapsed(0);

    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    // Mark all agents as waiting
    setAgentStates((prev) => {
      const next = { ...prev };
      AGENTS.forEach((a) => {
        next[a.id] = { ...next[a.id], status: 'waiting' };
      });
      return next;
    });

    // Run agents sequentially. If one errors, halt the pipeline but keep
    // already-streamed partial outputs visible for inspection.
    let pipelineErrored = false;
    for (let i = 0; i < AGENTS.length; i++) {
      if (!runningRef.current) break;
      try {
        await runAgent(i);
      } catch {
        pipelineErrored = true;
        break;
      }
    }

    clearInterval(timerRef.current);
    timerRef.current = null;
    setStatus(pipelineErrored ? 'error' : 'complete');
    runningRef.current = false;
  }, [runAgent]);

  const reset = useCallback(() => {
    runningRef.current = false;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setStatus('idle');
    setAgentStates(createInitialStates());
    setOutputs({});
    setErrors({});
    setElapsed(0);
    setCompletedCount(0);
  }, []);

  return {
    status,
    agentStates,
    outputs,
    errors,
    elapsed,
    completedCount,
    run,
    reset,
  };
}
