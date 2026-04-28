/**
 * PipelineHeader — Top header bar with title, timer, completion badges, and controls.
 */
import { Play, RotateCcw, Github } from 'lucide-react';
import { TimerDisplay } from './TimerDisplay.jsx';
import { MetricBadge } from './MetricBadge.jsx';
import { RunButton } from './RunButton.jsx';

const NAV = [
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'dashboard', label: 'Outcomes' },
  { id: 'pipeline', label: 'Live demo' },
  { id: 'chat', label: 'Chat' },
  { id: 'about', label: 'About' },
];

export function PipelineHeader({
  status = 'idle',
  elapsed = 0,
  completedCount = 0,
  totalCount = 6,
  onRun,
  onReset,
}) {
  const isRunning = status === 'running';
  const isComplete = status === 'complete';
  const isIdle = status === 'idle';

  return (
    <header className="sticky top-0 z-40 border-b border-[#1A1F2E] bg-[#06080F]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand + nav */}
        <div className="flex min-w-0 items-center gap-6">
          <a href="#top" className="flex items-center gap-2.5 whitespace-nowrap">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#7C3AED] to-[#6366F1] text-[11px] font-bold text-white shadow-lg shadow-[#7C3AED]/30">
              PM
            </span>
            <span className="hidden sm:inline text-sm font-semibold tracking-tight text-[#F4F4F5]">
              Multi-Agent PM Team
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-md px-2.5 py-1.5 text-xs font-medium text-[#D1D5DB] transition-colors hover:bg-white/5 hover:text-[#F4F4F5]"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: Metrics + controls */}
        <div className="flex shrink-0 items-center gap-2">
          {!isIdle && (
            <div className="hidden md:flex items-center gap-2">
              <MetricBadge value={`${completedCount}/${totalCount}`} label="agents" />
              <TimerDisplay elapsed={elapsed} isRunning={isRunning} />
            </div>
          )}

          <a
            href="https://github.com/varunk130/multi-ai-agent-pm-team"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#1A1F2E] bg-[#0E1117] px-2.5 text-xs font-medium text-[#D1D5DB] transition-colors hover:border-[#2A3344] hover:text-[#F4F4F5]"
            title="View on GitHub"
          >
            <Github className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">GitHub</span>
          </a>

          <div className="flex items-center gap-2">
            <RunButton
              onClick={onRun}
              label={isComplete ? 'Re-run' : isRunning ? 'Running…' : 'Run demo'}
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
