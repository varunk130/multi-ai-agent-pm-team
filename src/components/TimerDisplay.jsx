/**
 * TimerDisplay — Formatted elapsed timer in mm:ss.
 */
import { Clock } from 'lucide-react';

export function TimerDisplay({ elapsed = 0, isRunning = false }) {
  const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const secs = String(elapsed % 60).padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-[#1E293B] px-3 py-1.5 font-mono text-sm">
      <Clock
        className={`h-3.5 w-3.5 ${isRunning ? 'text-blue-400' : 'text-[#64748B]'}`}
      />
      <span className={isRunning ? 'text-[#F1F5F9]' : 'text-[#64748B]'}>
        {mins}:{secs}
      </span>
    </div>
  );
}
