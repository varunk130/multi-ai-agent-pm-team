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
        className="flex w-full items-center justify-between rounded-lg border border-[#1A1F2E] bg-[#0E1117] px-4 py-3 text-left transition-colors hover:border-[#2A3344] hover:bg-[#11151F]"
      >
        <div className="flex items-center gap-3">
          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#A78BFA]">
            Inputs
          </span>
          <span className="text-sm font-semibold text-[#F4F4F5]">2 data sources</span>
          <span className="text-xs text-[#B4B4BB]">
            · {feedbackCount} tickets · {metricsMonths}-mo metrics
          </span>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-[#B4B4BB]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[#B4B4BB]" />
        )}
      </button>

      {expanded && (
        <div className="mt-2 grid grid-cols-1 gap-2 animate-fade-in sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-lg border border-[#1A1F2E] bg-[#0A0D14] px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2A3344] bg-[#11151F]">
              <Database className="h-4 w-4 text-[#818CF8]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F4F4F5]">{feedbackCount} Feedback Tickets</p>
              <p className="text-xs text-[#B4B4BB]">Qualitative customer signal</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-[#1A1F2E] bg-[#0A0D14] px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2A3344] bg-[#11151F]">
              <BarChart3 className="h-4 w-4 text-[#22D3EE]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F4F4F5]">{metricsMonths}-Month Metrics</p>
              <p className="text-xs text-[#B4B4BB]">Quantitative product data</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
