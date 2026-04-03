import { useState, useCallback } from 'react';
import { Layout } from './components/Layout.jsx';
import { PipelineHeader } from './components/PipelineHeader.jsx';
import { PipelineView } from './components/PipelineView.jsx';
import { AgentDetailPanel } from './components/AgentDetailPanel.jsx';
import { usePipelineRunner } from './hooks/usePipelineRunner.js';
import { AGENTS } from './data/agentConfig.js';

export default function App() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const pipeline = usePipelineRunner();

  const handleAgentSelect = useCallback((agentId) => {
    setSelectedAgent(agentId);
  }, []);

  const handleRun = useCallback(() => {
    pipeline.run();
    setSelectedAgent(null);
  }, [pipeline]);

  const handleReset = useCallback(() => {
    pipeline.reset();
    setSelectedAgent(null);
  }, [pipeline]);

  const selectedAgentData = selectedAgent
    ? AGENTS.find((a) => a.id === selectedAgent)
    : null;

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <PipelineHeader
        status={pipeline.status}
        elapsed={pipeline.elapsed}
        completedCount={pipeline.completedCount}
        totalCount={AGENTS.length}
        onRun={handleRun}
        onReset={handleReset}
      />
      <Layout
        left={
          <PipelineView
            agents={AGENTS}
            agentStates={pipeline.agentStates}
            selectedAgent={selectedAgent}
            onAgentSelect={handleAgentSelect}
          />
        }
        right={
          <AgentDetailPanel
            agent={selectedAgentData}
            agentState={selectedAgent ? pipeline.agentStates[selectedAgent] : null}
            agentOutput={selectedAgent ? pipeline.outputs[selectedAgent] : null}
          />
        }
      />
    </div>
  );
}
