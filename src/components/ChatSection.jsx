/**
 * ChatSection — Conversational interface to "ask the PM team".
 * Mock chat with pre-baked Q&A pairs (offline demo).
 */
import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare } from 'lucide-react';
import { Section } from './Section.jsx';

const SUGGESTED = [
  'What\'s the top theme in this quarter\'s feedback?',
  'Which initiative should we prioritize and why?',
  'Summarize this for the board.',
  'What\'s the biggest risk if we ship this?',
];

const RESPONSES = {
  default: {
    agent: 'Chief of Staff',
    text: `Based on the latest pipeline run, the highest-leverage opportunity is **fixing the onboarding drop-off in the trial flow** — it's correlated with $1.4M ARR at risk over the next two quarters and addresses the #1 ARR-weighted feedback theme. Recommended path: ship the redesigned activation flow in 4 weeks; defer the workspace-permissions rebuild to Q3 (lower ARR exposure, higher engineering cost).`,
  },
  theme: {
    agent: 'Customer Feedback Pipeline',
    text: `The top theme this quarter is **"Onboarding & first-value friction"** — 14 of 50 tickets, weighted by ARR impact at $1.42M. Sub-themes:\n• Trial users stuck on workspace setup (8 tickets)\n• Unclear next steps after import (4 tickets)\n• Permission errors on team invite (2 tickets)\n\nSecondary themes: Reporting gaps (9 tickets, $620K), Mobile parity (7 tickets, $310K).`,
  },
  prioritize: {
    agent: 'Chief of Staff',
    text: `Top initiative: **Trial activation redesign**. Trade-off analysis:\n• ARR upside: +$1.4M (high confidence, validated by funnel data)\n• Engineering cost: 4 weeks · 3 engineers\n• Pre-mortem risk: medium — depends on auth team availability for SSO changes\n• Defer: workspace permissions rebuild (lower ARR, higher cost, less validated signal)`,
  },
  board: {
    agent: 'Stakeholder Translator',
    text: `**Board summary:** Customer feedback this quarter points to a single high-leverage problem — trial users are not reaching first value. We've quantified the exposure at $1.4M ARR over two quarters and validated it against funnel data. The recommended response is a 4-week activation redesign with measurable leading indicators (D1 activation, time-to-first-workspace). Confidence: high. ROI is asymmetric — small investment, large protected revenue.`,
  },
  risk: {
    agent: 'Chief of Staff',
    text: `Biggest risk: **shipping a partial redesign that doesn't move the activation metric**. Mitigations baked into the plan:\n1. Ship behind a feature flag with 50/50 split\n2. Pre-defined success threshold (D1 activation +12pp)\n3. Two-week kill criteria if metrics don't move\n4. Pre-mortem identified auth dependency early — locked in eng commitment first`,
  },
};

function pickResponse(q) {
  const lower = q.toLowerCase();
  if (lower.includes('theme') || lower.includes('feedback')) return RESPONSES.theme;
  if (lower.includes('priorit') || lower.includes('focus')) return RESPONSES.prioritize;
  if (lower.includes('board') || lower.includes('exec')) return RESPONSES.board;
  if (lower.includes('risk') || lower.includes('worst')) return RESPONSES.risk;
  return RESPONSES.default;
}

export function ChatSection() {
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      agent: 'PM Team',
      text: 'Hi — I\'m the synthesized voice of the 6-agent pipeline. Ask me anything about this quarter\'s product strategy, customer feedback, or trade-offs.',
    },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 9999, behavior: 'smooth' });
  }, [messages, thinking]);

  const send = (text) => {
    const q = (text ?? input).trim();
    if (!q || thinking) return;
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setThinking(true);
    setTimeout(() => {
      const r = pickResponse(q);
      setMessages((m) => [...m, { role: 'agent', agent: r.agent, text: r.text }]);
      setThinking(false);
    }, 1100);
  };

  return (
    <Section
      id="chat"
      eyebrow="Talk to the team"
      eyebrowColor="#34D399"
      title="Ask the PM team a question."
      intro="The agents above produced a structured strategy. This is the conversational layer on top — ask in plain English and get the answer in the voice of the right specialist."
    >
      <div className="overflow-hidden rounded-2xl border border-[#1A1F2E] bg-[#0B0E16]/70 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur">
        {/* Chat header */}
        <div className="flex items-center justify-between border-b border-[#1A1F2E] bg-[#0E1117]/60 px-5 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#7C3AED] to-[#6366F1] text-[10px] font-bold text-white shadow-md shadow-[#7C3AED]/30">
              <MessageSquare className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#F4F4F5]">PM Team chat</div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#B4B4BB]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                6 agents online · pre-baked replies for the demo
              </div>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-[#1A1F2E] bg-[#0A0D14] px-2 py-1 font-mono text-[10.5px] uppercase tracking-wide text-[#D1D5DB]">
            <Sparkles className="h-3 w-3 text-[#A78BFA]" />
            Demo mode
          </span>
        </div>

        {/* Messages */}
        <div ref={scrollerRef} className="h-[420px] overflow-y-auto px-5 py-5 sm:px-6">
          <div className="space-y-4">
            {messages.map((m, i) => (
              <Message key={i} m={m} />
            ))}
            {thinking && <TypingBubble />}
          </div>
        </div>

        {/* Suggested prompts */}
        <div className="border-t border-[#1A1F2E] bg-[#0A0D14]/60 px-5 py-3 sm:px-6">
          <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-[#B4B4BB]">
            Try asking
          </div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-[#1A1F2E] bg-[#0E1117] px-3 py-1 text-xs text-[#D1D5DB] transition-colors hover:border-[#3A2A66] hover:bg-[#15102A] hover:text-[#F4F4F5]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-[#1A1F2E] bg-[#0E1117] px-5 py-4 sm:px-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the PM team…"
              className="flex-1 rounded-lg border border-[#1A1F2E] bg-[#0A0D14] px-3.5 py-2.5 text-sm text-[#F4F4F5] placeholder:text-[#9CA3AF] outline-none transition-colors focus:border-[#3A2A66] focus:ring-2 focus:ring-[#7C3AED]/20"
            />
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              className="btn-primary inline-flex h-[42px] items-center gap-2 rounded-lg px-4 text-sm font-semibold text-white"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
}

function Message({ m }) {
  if (m.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-[#6D28D9] to-[#5B21B6] px-4 py-2.5 text-sm leading-relaxed text-white shadow-md shadow-[#7C3AED]/20">
          {m.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#2A3344] bg-[#11151F] text-xs font-bold text-[#A78BFA]">
        AI
      </div>
      <div className="max-w-[85%]">
        <div className="mb-1 text-[11px] font-medium text-[#B4B4BB]">
          {m.agent || 'PM Team'}
        </div>
        <div className="rounded-2xl rounded-tl-sm border border-[#1A1F2E] bg-[#0E1117] px-4 py-3 text-sm leading-relaxed text-[#E4E4E7] whitespace-pre-line">
          {renderMarkdown(m.text)}
        </div>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#2A3344] bg-[#11151F] text-xs font-bold text-[#A78BFA]">
        AI
      </div>
      <div className="rounded-2xl rounded-tl-sm border border-[#1A1F2E] bg-[#0E1117] px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#B4B4BB]" style={{ animationDelay: '0ms' }} />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#B4B4BB]" style={{ animationDelay: '150ms' }} />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#B4B4BB]" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

// Tiny inline markdown — bold + bullets only
function renderMarkdown(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[#F4F4F5]">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{p}</span>;
  });
}
