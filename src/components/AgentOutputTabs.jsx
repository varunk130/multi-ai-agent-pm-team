/**
 * AgentOutputTabs — Tabbed output viewer for agents with multiple output sections.
 */

export function AgentOutputTabs({ tabs = [], activeTab, onTabChange, children }) {
  if (!tabs.length) return children;

  return (
    <div>
      <div className="flex gap-1 border-b border-[#1E293B] mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-[#F43F5E] text-[#F1F5F9]'
                : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
