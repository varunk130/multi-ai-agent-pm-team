/**
 * ProgressStepper — Horizontal progress showing pipeline completion.
 * 6 steps, each lights up as its agent completes.
 */
import { Check } from 'lucide-react';

export function ProgressStepper({ agents = [], agentStates = {} }) {
  return (
    <div className="flex items-center gap-1">
      {agents.map((agent, idx) => {
        const state = agentStates[agent.id];
        const isComplete = state?.status === 'complete';
        const isProcessing = state?.status === 'processing';

        return (
          <div key={agent.id} className="flex items-center">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                isComplete
                  ? 'text-white'
                  : isProcessing
                    ? 'border-2 text-white'
                    : 'border border-[#334155] text-[#64748B] bg-[#111827]'
              }`}
              style={
                isComplete
                  ? { backgroundColor: agent.colorHex }
                  : isProcessing
                    ? { borderColor: agent.colorHex, color: agent.colorHex }
                    : undefined
              }
            >
              {isComplete ? <Check className="h-3 w-3" /> : agent.number}
            </div>
            {idx < agents.length - 1 && (
              <div
                className={`mx-0.5 h-px w-4 transition-colors duration-300 ${
                  isComplete ? 'bg-[#334155]' : 'bg-[#1E293B]'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
