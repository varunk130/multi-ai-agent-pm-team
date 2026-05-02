/**
 * StatusDot — Colored dot indicating agent status.
 * gray=idle, yellow=waiting, blue=processing, green=complete, red=error.
 */

const STATUS_COLORS = {
  idle: 'bg-gray-500',
  waiting: 'bg-yellow-400',
  processing: 'bg-blue-500',
  complete: 'bg-emerald-500',
  error: 'bg-red-500',
};

const SIZE_MAP = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
};

export function StatusDot({ status = 'idle', size = 'md' }) {
  const color = STATUS_COLORS[status] || STATUS_COLORS.idle;
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;
  const isAnimated = status === 'processing';

  return (
    <span className="relative inline-flex">
      {isAnimated && (
        <span
          className={`absolute inline-flex h-full w-full rounded-full ${color} opacity-75 animate-ping`}
        />
      )}
      <span className={`relative inline-flex rounded-full ${sizeClass} ${color}`} />
    </span>
  );
}
