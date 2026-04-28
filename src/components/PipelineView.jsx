/**
 * PipelineView — Displays all 6 agents as cards with DataFlowConnectors.
 * Renders inside the Layout's left panel (already padded by parent card).
 */
import { AgentNode } from './AgentNode.jsx';
import { DataFlowConnector } from './DataFlowConnector.jsx';
import { InputDataPanel } from './InputDataPanel.jsx';

export function PipelineView({ agents = [], agentStates = {}, selectedAgent, onAgentSelect }) {
  return (
    <div className="px-5 py-5 sm:px-6 sm:py-6">
      <InputDataPanel feedbackCount={50} metricsMonths={6} />

      <div className="space-y-0">
        {agents.map((agent, idx) => {
          const state = agentStates[agent.id];
          const nextAgent = agents[idx + 1];
          const isConnectorActive =
            state?.status === 'complete' && nextAgent && agentStates[nextAgent.id]?.status !== 'idle';

          return (
            <div key={agent.id}>
              <AgentNode
                agent={agent}
                state={state}
                isSelected={selectedAgent === agent.id}
                onSelect={onAgentSelect}
              />
              {idx < agents.length - 1 && (
                <DataFlowConnector
                  fromColor={agent.colorHex}
                  toColor={nextAgent.colorHex}
                  isActive={isConnectorActive}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
