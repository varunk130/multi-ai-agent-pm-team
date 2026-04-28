/**
 * AgentOutputTabs — Tabbed output viewer for agents with multiple output sections.
 */

export function AgentOutputTabs({ tabs = [], activeTab, onTabChange, children }) {
  if (!tabs.length) return children;

  return (
    <div>
      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-[#1A1F2E]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`-mb-px whitespace-nowrap border-b-2 px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
              activeTab === tab.id
                ? 'border-[#A78BFA] text-[#F4F4F5]'
                : 'border-transparent text-[#B4B4BB] hover:text-[#D1D5DB]'
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
