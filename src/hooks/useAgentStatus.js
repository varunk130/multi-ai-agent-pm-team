import { useMemo } from 'react';

/**
 * Derives display-friendly status information for an agent.
 */
export function useAgentStatus(agentConfig, agentState) {
  return useMemo(() => {
    if (!agentConfig || !agentState) {
      return { label: 'Unknown', dotColor: 'gray', isActive: false };
    }

    const { status, currentSubStep } = agentState;
    const { subSteps } = agentConfig;

    switch (status) {
      case 'idle':
        return { label: 'Idle', dotColor: 'gray', isActive: false, subStepText: null };
      case 'waiting':
        return { label: 'Waiting', dotColor: 'yellow', isActive: false, subStepText: 'Queued...' };
      case 'processing':
        return {
          label: 'Processing',
          dotColor: 'blue',
          isActive: true,
          subStepText: subSteps[currentSubStep] || 'Processing...',
        };
      case 'complete':
        return { label: 'Complete', dotColor: 'green', isActive: false, subStepText: 'Done' };
      case 'error':
        return { label: 'Error', dotColor: 'red', isActive: false, subStepText: 'Failed' };
      default:
        return { label: status, dotColor: 'gray', isActive: false, subStepText: null };
    }
  }, [agentConfig, agentState]);
}
