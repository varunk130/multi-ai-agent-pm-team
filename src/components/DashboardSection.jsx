/**
 * DashboardSection — Tulsar-style KPI cards summarizing what this generates.
 * Mini sparklines drawn with inline SVG (no chart library).
 */
import { Section } from './Section.jsx';
import { ArrowUpRight, FileText, Users, Sparkles, Clock } from 'lucide-react';

const KPIS = [
  {
    icon: FileText,
    label: 'Strategic deliverables',
    value: '7',
    sub: '1 recommendation · 1 PRD · 5 stakeholder briefs',
    delta: '+2 vs typical sprint',
    trend: [3, 4, 4, 5, 6, 6, 7],
    accent: '#A78BFA',
  },
  {
    icon: Clock,
    label: 'Time to executive brief',
    value: '52s',
    sub: 'median across 50-ticket inputs',
    delta: '↓ from 18 hrs PM time',
    trend: [18, 14, 9, 5, 3, 2, 1],
    accent: '#34D399',
  },
  {
    icon: Users,
    label: 'Coverage per run',
    value: '50',
    sub: 'tickets · 6 months of metrics correlated',
    delta: '100% signal processed',
    trend: [10, 16, 22, 30, 38, 44, 50],
    accent: '#22D3EE',
  },
  {
    icon: Sparkles,
    label: 'Audience lenses',
    value: '5',
    sub: 'Engineering · Exec · Board · Customer · Sales',
    delta: 'Same source, 5 framings',
    trend: [1, 2, 3, 4, 5, 5, 5],
    accent: '#FBBF24',
  },
];

function Sparkline({ data, color }) {
  const w = 120;
  const h = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = w / (data.length - 1);
  const points = data
    .map((v, i) => `${i * stepX},${h - ((v - min) / range) * h}`)
    .join(' ');
  const areaPoints = `0,${h} ${points} ${w},${h}`;
  const id = `g-${color.replace('#', '')}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${id})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DashboardSection() {
  return (
    <Section
      id="dashboard"
      eyebrow="The Outcome"
      eyebrowColor="#22D3EE"
      title="What you get from one pipeline run."
      intro="Every run produces a complete decision package — the kind of output that normally takes a PM, a data scientist, and a chief of staff a working week to assemble."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k) => (
          <article
            key={k.label}
            className="group relative overflow-hidden rounded-2xl border border-[#1A1F2E] bg-[#0E1117] p-5 transition-all hover:border-[#2A3344]"
          >
            <div
              className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-50"
              style={{ background: k.accent }}
            />
            <div className="relative flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2A3344] bg-[#11151F]">
                <k.icon className="h-4 w-4" style={{ color: k.accent }} />
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#3A4556] transition-colors group-hover:text-[#B4B4BB]" />
            </div>

            <div className="relative mt-5 text-[34px] font-semibold tracking-tight text-[#F4F4F5]">
              {k.value}
            </div>
            <div className="relative text-sm font-medium text-[#D1D5DB]">{k.label}</div>

            <div className="relative mt-3 -mx-1">
              <Sparkline data={k.trend} color={k.accent} />
            </div>

            <div className="relative mt-3 flex items-center justify-between border-t border-[#1A1F2E] pt-3">
              <span className="text-[11px] text-[#B4B4BB]">{k.sub}</span>
            </div>
            <div className="relative mt-2 inline-flex items-center gap-1 rounded-md bg-[#11151F] px-2 py-0.5 text-[10.5px] font-medium" style={{ color: k.accent }}>
              {k.delta}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
