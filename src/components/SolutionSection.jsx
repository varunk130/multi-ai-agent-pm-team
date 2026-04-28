/**
 * SolutionSection — Three pillars positioning the system as a full-stack PM
 * org-in-a-box covering qual + quant + strategy + spec + audience comms.
 */
import { Section } from './Section.jsx';
import { Workflow, Sigma, Megaphone } from 'lucide-react';

const PILLARS = [
  {
    icon: Workflow,
    accent: '#A78BFA',
    title: 'End-to-end PM workstream coverage',
    body: 'Customer signal → quantitative validation → strategic recommendation → full PRD → exec, board, eng, sales, and customer briefs. One pipeline owns the entire chain — not just one slice of it.',
    chips: ['6 specialized agents', 'Launches · Reviews · Board'],
  },
  {
    icon: Sigma,
    accent: '#22D3EE',
    title: 'Quant + qual fusion',
    body: 'A dedicated Data Scientist agent correlates 6 months of product metrics against the qualitative themes — cohort math, funnel drop-offs, ARR impact. Strategy reasons over evidence, not vibes.',
    chips: ['Cohort analysis', 'ARR-weighted scoring'],
  },
  {
    icon: Megaphone,
    accent: '#34D399',
    title: 'One run, every audience',
    body: 'The same underlying decision is reframed for Engineering specs, Exec staff updates, the Board narrative, Customer comms, and Sales enablement — each with the right priorities, evidence, and tone.',
    chips: ['5 stakeholder lenses', 'Single source of truth'],
  },
];

export function SolutionSection() {
  return (
    <Section
      id="solution"
      eyebrow="The Solution"
      eyebrowColor="#A78BFA"
      title="A multi-agent PM team that runs every workstream end-to-end."
      intro="Six specialized agents, each owning a distinct cognitive role, operating in sequence on the full upstream context. The output is what a high-performing product org would produce across a quarter — synthesized, written, and audience-formatted in under a minute."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {PILLARS.map((p) => (
          <article
            key={p.title}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#1A1F2E] bg-[#0E1117] p-6 transition-all hover:-translate-y-0.5 hover:border-[#2A3344]"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-25 blur-3xl transition-opacity group-hover:opacity-50"
              style={{ background: p.accent }}
            />
            <div
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border"
              style={{
                borderColor: `${p.accent}55`,
                background: `${p.accent}12`,
              }}
            >
              <p.icon className="h-5 w-5" style={{ color: p.accent }} />
            </div>
            <h3 className="relative mt-5 text-lg font-semibold tracking-tight text-white">
              {p.title}
            </h3>
            <p className="relative mt-2 flex-1 text-sm leading-relaxed text-[#D4D4D8]">{p.body}</p>
            <div className="relative mt-5 flex flex-wrap gap-1.5">
              {p.chips.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-medium uppercase tracking-wide"
                  style={{
                    borderColor: `${p.accent}40`,
                    background: `${p.accent}10`,
                    color: '#E4E4E7',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
