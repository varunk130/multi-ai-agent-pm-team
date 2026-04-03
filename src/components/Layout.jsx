/**
 * Layout — Responsive two-panel layout.
 * Left panel (~60%), right panel (~40%). Stacks vertically on small screens.
 */

export function Layout({ left, right }) {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-57px)]">
      {/* Left panel — pipeline view */}
      <div className="w-full lg:w-[60%] overflow-y-auto border-b border-[#1E293B] lg:border-b-0 lg:border-r">
        {left}
      </div>
      {/* Right panel — agent detail */}
      <div className="w-full lg:w-[40%] overflow-y-auto bg-[#111827]">
        {right}
      </div>
    </div>
  );
}
