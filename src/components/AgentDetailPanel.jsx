/**
 * AgentDetailPanel — Right panel showing detailed output of the selected agent.
 * Supports tabbed output for agents like Agent 6 (5 stakeholder comms).
 */
import { useState, useEffect } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';
import { StatusDot } from './StatusDot.jsx';
import { ModelBadge } from './ModelBadge.jsx';
import { MarkdownRenderer } from './MarkdownRenderer.jsx';
import { AgentOutputTabs } from './AgentOutputTabs.jsx';

const STAKEHOLDER_TABS = [
  { id: 'engineering', label: 'Engineering' },
  { id: 'executive', label: 'Executive' },
  { id: 'board', label: 'Board' },
  { id: 'customer', label: 'Customer' },
  { id: 'sales', label: 'Sales' },
];

export function AgentDetailPanel({ agent, agentState, agentOutput, agentError }) {
  const [activeTab, setActiveTab] = useState('engineering');
  const [copied, setCopied] = useState(false);

  // Default to executive when stakeholder agent is selected (best for screenshots/exec demo)
  useEffect(() => {
    setActiveTab(agent?.id === 'stakeholder-translator' ? 'executive' : 'engineering');
    setCopied(false);
  }, [agent?.id]);

  if (!agent) {
    return (
      <div className="flex flex-col p-6 sm:p-8">
        <div className="mb-5">
          <span className="eyebrow">Live output</span>
          <h2 className="mt-3 text-lg font-semibold tracking-tight text-[#F4F4F5]">
            What you'll see here
          </h2>
          <p className="mt-1 text-sm text-[#D1D5DB]">
            Click any agent on the left, or run the pipeline to watch outputs fill in live.
          </p>
        </div>

        <ul className="space-y-2">
          {[
            { n: '01', t: 'Theme clusters', d: 'ARR-weighted feedback themes from 50 raw tickets' },
            { n: '02', t: 'Statistical correlations', d: 'Quant validation across 6 months of metrics' },
            { n: '03', t: 'Strategic narrative', d: 'Leading indicators + executive framing' },
            { n: '04', t: 'Prioritized recommendation', d: 'Trade-offs + pre-mortem from Chief of Staff' },
            { n: '05', t: 'Full PRD', d: 'User stories, acceptance criteria, tech requirements' },
            { n: '06', t: '5 stakeholder briefs', d: 'Engineering / Exec / Board / Customer / Sales' },
          ].map((row) => (
            <li
              key={row.n}
              className="flex items-start gap-3 rounded-lg border border-[#1A1F2E] bg-[#0E1117] p-3 transition-colors hover:border-[#2A3344]"
            >
              <span className="font-mono text-[11px] font-semibold text-[#A78BFA]">{row.n}</span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#F4F4F5]">{row.t}</div>
                <div className="mt-0.5 text-xs text-[#B4B4BB]">{row.d}</div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-[#9CA3AF]">
          Tip — outputs are pre-baked from a real pipeline run, so the demo is fully offline.
        </p>
      </div>
    );
  }

  const status = agentState?.status || 'idle';
  const isStreaming = status === 'processing';
  const isStakeholderAgent = agent.id === 'stakeholder-translator';
  const hasTabbedOutput =
    isStakeholderAgent &&
    agentOutput &&
    typeof agentOutput === 'object' &&
    (agentOutput.tabs || agentOutput.communications);

  const getDisplayContent = () => {
    if (!agentOutput) return null;
    if (typeof agentOutput === 'string') return agentOutput;
    if (hasTabbedOutput) {
      if (agentOutput.tabs) return agentOutput.tabs[activeTab] || '';
      // Newer shape: { communications: { engineering: { content, ... } } }
      const block = agentOutput.communications?.[activeTab];
      if (!block) return '';
      if (typeof block === 'string') return block;
      return block.content || JSON.stringify(block, null, 2);
    }
    if (agentOutput.content) return agentOutput.content;
    return JSON.stringify(agentOutput, null, 2);
  };

  const displayContent = getDisplayContent();

  const handleCopy = async () => {
    if (displayContent) {
      await navigator.clipboard.writeText(displayContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-[#1A1F2E] bg-[#0B0E16] px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-bold tabular-nums"
              style={{
                backgroundColor: `${agent.colorHex}15`,
                color: agent.colorHex,
                borderColor: `${agent.colorHex}33`,
              }}
            >
              {agent.number}
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight text-[#F4F4F5]">{agent.name}</h2>
              <div className="mt-1 flex items-center gap-2">
                <ModelBadge model={agent.model} />
                <span className="inline-flex items-center gap-1.5 text-[11px] text-[#D1D5DB]">
                  <StatusDot status={status} size="sm" />
                  <span className="capitalize">{status}</span>
                </span>
              </div>
            </div>
          </div>
          {displayContent && (
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-md border border-[#1A1F2E] bg-[#0E1117] p-2 text-[#D1D5DB] transition-colors hover:border-[#2A3344] hover:text-[#F4F4F5]"
              title="Copy output"
            >
              {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-6 sm:px-6">
        {status === 'idle' && (
          <p className="text-sm text-[#B4B4BB]">Agent has not started yet. Run the pipeline to see live output.</p>
        )}
        {status === 'waiting' && (
          <p className="text-sm text-[#B4B4BB]">Waiting for upstream agents to complete…</p>
        )}
        {status === 'error' && (
          <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
            <div className="font-semibold text-red-200">Agent failed</div>
            <div className="mt-1 text-red-300/90">{agentError || 'An unknown error occurred.'}</div>
            {displayContent && (
              <div className="mt-2 text-xs text-red-300/70">
                Partial output below was streamed before the failure.
              </div>
            )}
          </div>
        )}
        {status === 'processing' && !displayContent && (
          <div className="flex items-center gap-2 text-sm text-[#D1D5DB]">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1A1F2E] border-t-[#A78BFA]" />
            Streaming output…
          </div>
        )}
        {displayContent && (
          <>
            {isStreaming && (
              <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-wide text-[#A78BFA]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A78BFA] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A78BFA]" />
                </span>
                Streaming · {agentState?.progress ?? 0}%
              </div>
            )}
            {hasTabbedOutput ? (
              <AgentOutputTabs
                tabs={STAKEHOLDER_TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              >
                <MarkdownRenderer content={displayContent} />
                {isStreaming && <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-[#A78BFA] align-middle" />}
              </AgentOutputTabs>
            ) : (
              <>
                <MarkdownRenderer content={displayContent} />
                {isStreaming && <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-[#A78BFA] align-middle" />}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
