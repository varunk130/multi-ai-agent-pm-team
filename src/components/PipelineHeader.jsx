/**
 * PipelineHeader — Top header bar with title, timer, completion badges, and controls.
 */
import { Play, RotateCcw } from 'lucide-react';
import { TimerDisplay } from './TimerDisplay.jsx';
import { MetricBadge } from './MetricBadge.jsx';
import { ProgressStepper } from './ProgressStepper.jsx';
import { RunButton } from './RunButton.jsx';
import { AGENTS } from '../data/agentConfig.js';

export function PipelineHeader({
  status = 'idle',
  elapsed = 0,
  completedCount = 0,
  totalCount = 6,
  onRun,
  onReset,
  agentStates = {},
}) {
  const isRunning = status === 'running';
  const isComplete = status === 'complete';
  const isIdle = status === 'idle';

  return (
    <header className="sticky top-0 z-40 border-b border-[#1E293B] bg-[#0B1120]/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left: Title + stepper */}
        <div className="flex items-center gap-4">
          <h1 className="text-base font-bold text-[#F1F5F9] whitespace-nowrap">
            ⚡ Multi AI Agent PM Team
          </h1>
          <div className="hidden sm:block">
            <ProgressStepper agents={AGENTS} agentStates={agentStates} />
          </div>
        </div>

        {/* Right: Metrics + controls */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <MetricBadge
              value={`${completedCount}/${totalCount}`}
              label="Complete"
            />
            <TimerDisplay elapsed={elapsed} isRunning={isRunning} />
          </div>

          <div className="flex items-center gap-2">
            <RunButton
              onClick={onRun}
              label={isComplete ? 'Re-run' : 'Run Pipeline'}
              icon={Play}
              disabled={isRunning}
              variant="primary"
            />
            {!isIdle && (
              <RunButton
                onClick={onReset}
                label="Reset"
                icon={RotateCcw}
                disabled={isRunning}
                variant="secondary"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
