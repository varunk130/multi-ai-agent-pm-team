/**
 * DataFlowConnector — Vertical line with animated traveling dot between agent nodes.
 */

export function DataFlowConnector({ fromColor = '#6366F1', toColor = '#6366F1', isActive = false }) {
  return (
    <div className="flex justify-center py-0">
      <div className="relative h-8 w-px overflow-hidden">
        {/* Static line */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${fromColor}40, ${toColor}40)`,
          }}
        />
        {/* Animated dot */}
        {isActive && (
          <div
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
            style={{
              background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
              animation: 'flow-dot 1.5s ease-in-out infinite',
              boxShadow: `0 0 6px ${fromColor}`,
            }}
          />
        )}
      </div>
    </div>
  );
}
