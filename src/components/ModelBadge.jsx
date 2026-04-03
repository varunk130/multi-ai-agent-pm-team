/**
 * ModelBadge — Pill badge showing the AI model name.
 */

export function ModelBadge({ model }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#1E293B] px-2.5 py-0.5 text-xs font-medium text-[#94A3B8]">
      {model}
    </span>
  );
}
