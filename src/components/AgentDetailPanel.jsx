/**
 * AgentDetailPanel — Right panel showing detailed output of the selected agent.
 * Supports tabbed output for agents like Agent 6 (5 stakeholder comms).
 */
import { useState, useEffect } from 'react';
import { Bot, Copy, CheckCircle2 } from 'lucide-react';
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

export function AgentDetailPanel({ agent, agentState, agentOutput }) {
  const [activeTab, setActiveTab] = useState('engineering');
  const [copied, setCopied] = useState(false);

  // Reset tab when agent changes
  useEffect(() => {
    setActiveTab('engineering');
    setCopied(false);
  }, [agent?.id]);

  if (!agent) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <Bot className="mx-auto mb-3 h-12 w-12 text-[#334155]" />
          <p className="text-sm text-[#64748B]">Select an agent to view output</p>
        </div>
      </div>
    );
  }

  const status = agentState?.status || 'idle';
  const isStakeholderAgent = agent.id === 'stakeholder-translator';
  const hasTabbedOutput = isStakeholderAgent && agentOutput && typeof agentOutput === 'object' && !Array.isArray(agentOutput) && agentOutput.tabs;

  const getDisplayContent = () => {
    if (!agentOutput) return null;
    if (typeof agentOutput === 'string') return agentOutput;
    if (hasTabbedOutput) return agentOutput.tabs[activeTab] || '';
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
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="shrink-0 border-b border-[#1E293B] px-4 py-4 lg:px-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold"
              style={{ backgroundColor: `${agent.colorHex}20`, color: agent.colorHex }}
            >
              {agent.number}
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#F1F5F9]">{agent.name}</h2>
              <div className="mt-1 flex items-center gap-2">
                <ModelBadge model={agent.model} />
                <StatusDot status={status} size="sm" />
                <span className="text-xs capitalize text-[#64748B]">{status}</span>
              </div>
            </div>
          </div>
          {displayContent && (
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#1E293B] hover:text-[#94A3B8]"
              title="Copy output"
            >
              {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 lg:px-6">
        {status === 'idle' && (
          <p className="text-sm text-[#64748B]">Agent has not started yet.</p>
        )}
        {status === 'waiting' && (
          <p className="text-sm text-[#64748B]">Waiting for upstream agents to complete...</p>
        )}
        {status === 'processing' && !displayContent && (
          <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#334155] border-t-blue-400" />
            Processing...
          </div>
        )}
        {displayContent && (
          hasTabbedOutput ? (
            <AgentOutputTabs
              tabs={STAKEHOLDER_TABS}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            >
              <MarkdownRenderer content={displayContent} />
            </AgentOutputTabs>
          ) : (
            <MarkdownRenderer content={displayContent} />
          )
        )}
      </div>
    </div>
  );
}
