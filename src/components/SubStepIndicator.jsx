/**
 * SubStepIndicator — Current sub-step text with spinner for active agents.
 */
import { Loader2 } from 'lucide-react';

export function SubStepIndicator({ text, isActive = false }) {
  if (!text) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
      {isActive && (
        <Loader2 className="h-3 w-3 animate-spin text-blue-400" />
      )}
      <span className={isActive ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
        {text}
      </span>
    </div>
  );
}
