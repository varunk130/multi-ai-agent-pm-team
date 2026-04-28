/**
 * Hero — landing section. Tight, centered, classy.
 */
import { Sparkles, ArrowRight, ArrowDown } from 'lucide-react';

export function Hero({ onRun, isRunning }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(124,58,237,0.22), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-5xl px-6 pb-12 pt-16 text-center sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24">
        {/* Eyebrow */}
        <div className="mb-7 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2A3344] bg-[#0E1117]/80 px-3 py-1 text-[11px] font-medium text-[#D1D5DB] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-[#A78BFA]" />
            <span>A multi-agent product team — running in your browser</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="mx-auto max-w-4xl text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] text-gradient sm:text-[52px] lg:text-[60px]">
          Six AI agents.
          <br />
          <span className="text-gradient-accent">One product strategy.</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#E4E4E7] sm:text-lg">
          A full PM org-in-a-box for product launches, exec narratives, board updates,
          quantitative deep-dives, and audience-tailored briefs — synthesized in under a
          minute, not a working week.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onRun}
            disabled={isRunning}
            className="btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
          >
            {isRunning ? (
              <>
                <span className="h-2 w-2 animate-pulse rounded-full bg-white/80" />
                Running pipeline…
              </>
            ) : (
              <>
                Run the live demo
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
          <a
            href="#problem"
            className="btn-secondary inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
          >
            Why this matters
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>

        {/* Trust line */}
        <p className="mt-10 text-xs text-[#B4B4BB]">
          Built by Varun Kulkarni · Powered by{' '}
          <span className="font-medium text-[#D4D4D8]">Claude Code Opus 4.7</span> +{' '}
          <span className="font-medium text-[#D4D4D8]">GitHub Copilot</span> · Pre-baked
          outputs from a real pipeline run
        </p>
      </div>
    </section>
  );
}
