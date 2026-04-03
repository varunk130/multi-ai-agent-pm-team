/**
 * InputDataPanel — Shows the two input data sources as expandable cards.
 */
import { useState } from 'react';
import { Database, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';

export function InputDataPanel({ feedbackCount = 50, metricsMonths = 6 }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between rounded-lg border border-[#1E293B] bg-[#111827] px-4 py-3 text-left transition-colors hover:border-[#334155]"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[#F1F5F9]">Input Data Sources</span>
          <span className="rounded-full bg-[#1E293B] px-2 py-0.5 text-xs text-[#94A3B8]">2 sources</span>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-[#64748B]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[#64748B]" />
        )}
      </button>

      {expanded && (
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 animate-fade-in">
          <div className="flex items-center gap-3 rounded-lg border border-[#1E293B] bg-[#0B1120] px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10">
              <Database className="h-4 w-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#F1F5F9]">{feedbackCount} Feedback Tickets</p>
              <p className="text-xs text-[#64748B]">Qualitative customer data</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-[#1E293B] bg-[#0B1120] px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10">
              <BarChart3 className="h-4 w-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#F1F5F9]">{metricsMonths}-Month Metrics</p>
              <p className="text-xs text-[#64748B]">Quantitative product data</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
