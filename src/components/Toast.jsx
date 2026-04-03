/**
 * Toast — Auto-dismissing notification for copy confirmations.
 */
import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export function Toast({ message, isVisible, onDismiss }) {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => onDismiss?.(), 3000);
    return () => clearTimeout(timer);
  }, [isVisible, onDismiss]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg animate-fade-in">
      <CheckCircle2 className="h-4 w-4" />
      {message}
    </div>
  );
}
