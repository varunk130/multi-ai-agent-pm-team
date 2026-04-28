/**
 * AboutSection — Personal-website-style intro to the builder.
 */
import { Section } from './Section.jsx';
import { Github, Linkedin, ArrowUpRight } from 'lucide-react';

export function AboutSection() {
  return (
    <Section id="about" eyebrow="About the builder" eyebrowColor="#FBBF24">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
        {/* Avatar / identity card */}
        <div className="rounded-2xl border border-[#1A1F2E] bg-gradient-to-br from-[#0E1117] to-[#0A0D14] p-6">
          <div className="relative mb-5 flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border border-[#2A3344] bg-gradient-to-br from-[#7C3AED] to-[#6366F1] text-5xl font-bold text-white shadow-xl shadow-[#7C3AED]/30">
            VK
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15" />
          </div>
          <div className="text-lg font-semibold tracking-tight text-[#F4F4F5]">
            Varun Kulkarni
          </div>
          <div className="mt-1 text-sm text-[#D1D5DB]">
            AI Builder at Microsoft
          </div>
          <div className="mt-5 space-y-2">
            <a
              href="https://github.com/varunk130"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-[#1A1F2E] bg-[#0A0D14] px-3 py-2 text-sm text-[#D1D5DB] transition-colors hover:border-[#2A3344] hover:text-[#F4F4F5]"
            >
              <span className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                github.com/varunk130
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#9CA3AF]" />
            </a>
            <a
              href="https://www.linkedin.com/in/varun-kulkarni/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-[#1A1F2E] bg-[#0A0D14] px-3 py-2 text-sm text-[#D1D5DB] transition-colors hover:border-[#2A3344] hover:text-[#F4F4F5]"
            >
              <span className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#9CA3AF]" />
            </a>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-5 text-[15px] leading-relaxed text-[#D1D5DB]">
          <p>
            <span className="text-[#F4F4F5]">AI Builder at Microsoft</span> — driving{' '}
            <span className="text-[#F4F4F5]">FDE Copilot extensibility</span> and{' '}
            <span className="text-[#C4B5FD]">AI Native engagements</span>.
          </p>
          <p>
            This project is one of a larger collection of multi-agent workflows I build
            across the product lifecycle. The thesis: most PM bottlenecks aren't about
            access to data — they're about{' '}
            <span className="text-[#C4B5FD]">synthesis under uncertainty</span>.
            Multi-agent orchestration with cognitive specialization is the cleanest path
            I've found to collapse that bottleneck without losing the rigor of how a real
            product org actually thinks.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3">
            <Stat label="Multi-agent projects" value="14+" />
            <Stat label="Skill libraries shipped" value="6" />
            <Stat label="Years building product" value="10+" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-[#1A1F2E] bg-[#0E1117] px-3 py-3">
      <div className="text-2xl font-semibold tracking-tight text-[#F4F4F5]">{value}</div>
      <div className="mt-0.5 text-[11px] text-[#B4B4BB]">{label}</div>
    </div>
  );
}
