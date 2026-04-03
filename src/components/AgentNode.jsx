/**
 * AgentNode — Individual agent card in the pipeline view.
 * Shows number badge, name, model, cognitive function, status, sub-steps, progress.
 */
import { StatusDot } from './StatusDot.jsx';
import { ModelBadge } from './ModelBadge.jsx';
import { SubStepIndicator } from './SubStepIndicator.jsx';

export function AgentNode({ agent, state = {}, isSelected = false, onSelect }) {
  const { status = 'idle', currentSubStep = 0, progress = 0 } = state;
  const isProcessing = status === 'processing';
  const isComplete = status === 'complete';

  return (
    <button
      type="button"
      onClick={() => onSelect?.(agent.id)}
      className={`group relative w-full text-left rounded-xl border p-4 transition-all duration-200 ${
        isSelected
          ? 'border-opacity-80 bg-[#111827]'
          : 'border-[#1E293B] bg-[#111827] hover:border-[#334155]'
      }`}
      style={
        isSelected
          ? { borderColor: agent.colorHex, boxShadow: `0 0 20px ${agent.colorHex}20` }
          : undefined
      }
    >
      {/* Pulse glow for active agents */}
      {isProcessing && (
        <div
          className="absolute inset-0 rounded-xl animate-pulse-glow pointer-events-none"
          style={{ boxShadow: `0 0 30px ${agent.colorHex}15` }}
        />
      )}

      <div className="relative flex items-start gap-3">
        {/* Number badge */}
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
          style={{ backgroundColor: `${agent.colorHex}20`, color: agent.colorHex }}
        >
          {agent.number}
        </div>

        <div className="min-w-0 flex-1">
          {/* Header row */}
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-[#F1F5F9] truncate">{agent.name}</h3>
            <StatusDot status={status} size="sm" />
          </div>

          {/* Tags row */}
          <div className="mt-1.5 flex items-center gap-2 flex-wrap">
            <ModelBadge model={agent.model} />
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
              style={{ backgroundColor: `${agent.colorHex}15`, color: agent.colorHex }}
            >
              {agent.cognitiveFunction}
            </span>
          </div>

          {/* Sub-step indicator */}
          {(isProcessing || isComplete) && (
            <div className="mt-2">
              <SubStepIndicator
                text={agent.subSteps[currentSubStep]}
                isActive={isProcessing}
              />
            </div>
          )}

          {/* Progress bar */}
          {(isProcessing || isComplete) && (
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#1E293B]">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  backgroundColor: agent.colorHex,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
