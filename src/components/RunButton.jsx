/**
 * RunButton — Styled button with icon for run/reset actions.
 */

const VARIANTS = {
  primary: 'btn-primary text-white',
  secondary: 'btn-secondary',
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
      className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold disabled:cursor-not-allowed ${VARIANTS[variant] || VARIANTS.primary}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {label}
    </button>
  );
}
