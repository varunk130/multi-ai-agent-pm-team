/**
 * Layout — Two-panel pipeline layout, contained, with proper card chrome.
 */
export function Layout({ left, right }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#1A1F2E] bg-[#0B0E16]/60 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur">
      <div className="flex flex-col lg:flex-row lg:min-h-[640px]">
        {/* Left panel — pipeline */}
        <div className="w-full border-b border-[#1A1F2E] lg:w-[58%] lg:border-b-0 lg:border-r">
          {left}
        </div>
        {/* Right panel — agent detail */}
        <div className="w-full bg-[#0A0D14] lg:w-[42%]">
          {right}
        </div>
      </div>
    </div>
  );
}
