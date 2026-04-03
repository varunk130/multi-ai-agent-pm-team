/**
 * MetricBadge — Small badge showing a metric value with optional icon.
 */

export function MetricBadge({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-[#1E293B] px-3 py-1.5 text-sm">
      {Icon && <Icon className="h-3.5 w-3.5 text-[#94A3B8]" />}
      <span className="font-medium text-[#F1F5F9]">{value}</span>
      <span className="text-[#64748B]">{label}</span>
    </div>
  );
}
