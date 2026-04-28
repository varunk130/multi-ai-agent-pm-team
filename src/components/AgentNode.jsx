/**
 * AgentNode — Individual agent card in the pipeline view.
 * Monochrome surface with thin colored top accent strip.
 */
import { ChevronRight } from 'lucide-react';
import { StatusDot } from './StatusDot.jsx';
import { ModelBadge } from './ModelBadge.jsx';
import { SubStepIndicator } from './SubStepIndicator.jsx';

export function AgentNode({ agent, state = {}, isSelected = false, onSelect }) {
  const { status = 'idle', currentSubStep = 0, progress = 0 } = state;
  const isProcessing = status === 'processing';
  const isComplete = status === 'complete';
  const isActive = isProcessing || isComplete;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(agent.id)}
      className={`group relative w-full overflow-hidden rounded-xl border p-4 text-left transition-all duration-200 ${
        isSelected
          ? 'border-[#3A2A66] bg-[#11111E]'
          : 'border-[#1A1F2E] bg-[#0E1117] hover:border-[#2A3344] hover:bg-[#11151F]'
      }`}
      style={
        isSelected
          ? { boxShadow: `0 0 0 1px ${agent.colorHex}55, 0 8px 32px -12px ${agent.colorHex}40` }
          : undefined
      }
    >
      {/* Thin accent top strip */}
      <div
        className="absolute left-3 right-3 top-0 h-px transition-opacity"
        style={{
          background: `linear-gradient(90deg, transparent, ${agent.colorHex}, transparent)`,
          opacity: isActive || isSelected ? 0.9 : 0.25,
        }}
      />

      {/* Pulse glow when processing */}
      {isProcessing && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl animate-pulse-glow"
          style={{ boxShadow: `inset 0 0 32px ${agent.colorHex}18` }}
        />
      )}

      <div className="relative flex items-start gap-3">
        {/* Number badge */}
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-sm font-bold tabular-nums"
          style={{
            backgroundColor: `${agent.colorHex}15`,
            color: agent.colorHex,
            borderColor: `${agent.colorHex}33`,
          }}
        >
          {agent.number}
        </div>

        <div className="min-w-0 flex-1">
          {/* Header row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="truncate text-sm font-semibold tracking-tight text-[#F4F4F5]">
                {agent.name}
              </h3>
              <StatusDot status={status} size="sm" />
            </div>
            <ChevronRight className={`h-4 w-4 shrink-0 transition-all ${isSelected ? 'text-[#A78BFA] translate-x-0.5' : 'text-[#3A4556] group-hover:text-[#B4B4BB]'}`} />
          </div>

          {/* Description */}
          <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-[#B4B4BB]">
            {agent.description}
          </p>

          {/* Tags row */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <ModelBadge model={agent.model} />
            <span
              className="inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10.5px] font-medium uppercase tracking-wide"
              style={{
                backgroundColor: `${agent.colorHex}10`,
                color: agent.colorHex,
                borderColor: `${agent.colorHex}25`,
              }}
            >
              {agent.cognitiveFunction}
            </span>
          </div>

          {/* Sub-step indicator */}
          {(isProcessing || isComplete) && (
            <div className="mt-2.5">
              <SubStepIndicator
                text={agent.subSteps[currentSubStep]}
                isActive={isProcessing}
              />
            </div>
          )}

          {/* Progress bar */}
          {(isProcessing || isComplete) && (
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#11151F]">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${agent.colorHex}cc, ${agent.colorHex})`,
                  boxShadow: `0 0 8px ${agent.colorHex}66`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
