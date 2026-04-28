/**
 * ProblemSection — PM leaders juggle many workstreams; the real bottleneck
 * is the synthesis layer between raw signal and exec-ready recommendation.
 */
import { Section } from './Section.jsx';
import { Layers, Repeat, GitPullRequestArrow } from 'lucide-react';

const STATS = [
  {
    icon: Layers,
    accent: '#F59E0B',
    value: '12+ workstreams',
    label: 'in flight every quarter',
    sub: 'concurrent launches, exec reviews, board narratives, roadmap re-priors, GTM briefs, customer themes, quant deep-dives — all owned by the same PM bench.',
  },
  {
    icon: Repeat,
    accent: '#22D3EE',
    value: '8 hrs / week',
    label: 'lost to re-formatting the same insight',
    sub: 'one decision gets re-written for engineering, exec staff, board, sales, and customers — five docs, five tones, one underlying truth.',
  },
  {
    icon: GitPullRequestArrow,
    accent: '#FB7185',
    value: '3 weeks late',
    label: 'from signal to strategic decision',
    sub: 'the data is usually clear weeks before the recommendation lands in the next exec review — that lag is where ARR, launches, and momentum quietly slip.',
  },
];

export function ProblemSection() {
  return (
    <Section
      id="problem"
      eyebrow="The Problem"
      eyebrowColor="#FB7185"
      title="PM leaders own too many workstreams to synthesize them by hand."
      intro="A modern product org runs launches, exec narratives, board updates, GTM motions, quantitative deep-dives, and customer-theme triage in parallel. The bottleneck isn't data or talent — it's the weeks of manual synthesis between raw signal and a board-ready recommendation."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map((s) => (
          <article
            key={s.label}
            className="group relative overflow-hidden rounded-2xl border border-[#1A1F2E] bg-[#0E1117] p-6 transition-all hover:-translate-y-0.5 hover:border-[#2A3344]"
            style={{ '--accent': s.accent }}
          >
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
              style={{ background: s.accent }}
            />
            <div
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border"
              style={{
                borderColor: `${s.accent}55`,
                background: `${s.accent}12`,
              }}
            >
              <s.icon className="h-5 w-5" style={{ color: s.accent }} />
            </div>
            <div className="relative mt-5 text-3xl font-semibold tracking-tight text-white">
              {s.value}
            </div>
            <div className="relative mt-1 text-sm font-medium text-[#E4E4E7]">{s.label}</div>
            <p className="relative mt-3 text-sm leading-relaxed text-[#C7C7CD]">{s.sub}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-[#2A3344] bg-gradient-to-r from-[#1A1235] via-[#0B0E16] to-[#0B1F2A] p-5 text-sm text-[#E4E4E7] sm:p-6">
        <span className="font-semibold text-white">The pattern: </span>
        the raw inputs already exist — tickets, dashboards, win/loss notes, exec asks. The
        cost is the <span className="font-semibold text-[#C4B5FD]">synthesis layer</span>{' '}
        that turns them into a prioritized recommendation, a PRD, and five audience-tailored
        briefs. That's the layer this project automates.
      </div>
    </Section>
  );
}
