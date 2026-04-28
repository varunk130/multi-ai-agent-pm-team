/**
 * ModelBadge — Pill badge showing the AI model name.
 */

export function ModelBadge({ model }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-[#1A1F2E] bg-[#0A0D14] px-2 py-0.5 font-mono text-[10.5px] font-medium uppercase tracking-wide text-[#D1D5DB]">
      <span className="h-1 w-1 rounded-full bg-[#A78BFA]" />
      {model}
    </span>
  );
}
