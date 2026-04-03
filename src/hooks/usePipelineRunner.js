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
 * Pipeline orchestration state machine.
 * Runs 6 agents sequentially with sub-step cycling and timing.
 */
export function usePipelineRunner() {
  const [status, setStatus] = useState('idle');
  const [agentStates, setAgentStates] = useState(createInitialStates);
  const [outputs, setOutputs] = useState({});
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
      new Promise((resolve) => {
        const agent = AGENTS[agentIndex];
        if (!agent) {
          resolve();
          return;
        }

        setAgentStates((prev) => ({
          ...prev,
          [agent.id]: {
            ...prev[agent.id],
            status: 'processing',
            startTime: Date.now(),
          },
        }));

        const totalSteps = agent.subSteps.length;
        const stepDuration = agent.processingTime / totalSteps;
        let currentStep = 0;

        const stepInterval = setInterval(() => {
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

            setOutputs((prev) => ({
              ...prev,
              [agent.id]: AGENT_OUTPUTS[agent.id],
            }));

            setCompletedCount((c) => c + 1);
            resolve();
          } else {
            setAgentStates((prev) => ({
              ...prev,
              [agent.id]: {
                ...prev[agent.id],
                currentSubStep: currentStep,
                progress: Math.round((currentStep / totalSteps) * 100),
              },
            }));
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

    // Run agents sequentially
    for (let i = 0; i < AGENTS.length; i++) {
      if (!runningRef.current) break;
      await runAgent(i);
    }

    clearInterval(timerRef.current);
    timerRef.current = null;
    setStatus('complete');
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
    setElapsed(0);
    setCompletedCount(0);
  }, []);

  return {
    status,
    agentStates,
    outputs,
    elapsed,
    completedCount,
    run,
    reset,
  };
}
