/**
 * TimerDisplay — Formatted elapsed timer in mm:ss.
 */
import { Clock } from 'lucide-react';

export function TimerDisplay({ elapsed = 0, isRunning = false }) {
  const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const secs = String(elapsed % 60).padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-[#1A1F2E] bg-[#0E1117] px-2.5 py-1.5 font-mono text-xs">
      <Clock
        className={`h-3.5 w-3.5 ${isRunning ? 'text-[#A78BFA]' : 'text-[#B4B4BB]'}`}
      />
      <span className={isRunning ? 'font-semibold text-[#F4F4F5]' : 'text-[#B4B4BB]'}>
        {mins}:{secs}
      </span>
    </div>
  );
}
