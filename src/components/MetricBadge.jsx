/**
 * MetricBadge — Small badge showing a metric value with optional icon.
 */

export function MetricBadge({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-[#1A1F2E] bg-[#0E1117] px-2.5 py-1.5 text-xs">
      {Icon && <Icon className="h-3.5 w-3.5 text-[#D1D5DB]" />}
      <span className="font-mono font-semibold text-[#F4F4F5]">{value}</span>
      <span className="text-[#B4B4BB]">{label}</span>
    </div>
  );
}
