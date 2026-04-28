/**
 * Reusable section wrapper for consistent vertical rhythm + container.
 */
export function Section({ id, eyebrow, eyebrowColor, title, intro, children, className = '' }) {
  const eyebrowStyle = eyebrowColor
    ? {
        background: `${eyebrowColor}15`,
        borderColor: `${eyebrowColor}40`,
        color: eyebrowColor,
      }
    : undefined;
  return (
    <section id={id} className={`relative scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || intro) && (
          <header className="mb-10 max-w-3xl sm:mb-14">
            {eyebrow && (
              <span className="eyebrow" style={eyebrowStyle}>
                {eyebrowColor && (
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: eyebrowColor, boxShadow: `0 0 8px ${eyebrowColor}` }}
                  />
                )}
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-4 text-base leading-relaxed text-[#E4E4E7] sm:text-lg">
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
