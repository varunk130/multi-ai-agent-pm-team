/**
 * RunButton — Styled button with icon for run/reset actions.
 */

const VARIANTS = {
  primary:
    'bg-indigo-600 hover:bg-indigo-500 text-white disabled:bg-indigo-600/50',
  secondary:
    'bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8] hover:text-[#F1F5F9] disabled:opacity-40',
};

export function RunButton({
  onClick,
  label,
  icon: Icon,
  disabled = false,
  variant = 'primary',
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed ${VARIANTS[variant] || VARIANTS.primary}`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </button>
  );
}
