import { useState, useCallback } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { Layout } from './components/Layout.jsx';
import { Hero } from './components/Hero.jsx';
import { Footer } from './components/Footer.jsx';
import { PipelineHeader } from './components/PipelineHeader.jsx';
import { PipelineView } from './components/PipelineView.jsx';
import { AgentDetailPanel } from './components/AgentDetailPanel.jsx';
import { ProblemSection } from './components/ProblemSection.jsx';
import { SolutionSection } from './components/SolutionSection.jsx';
import { DashboardSection } from './components/DashboardSection.jsx';
import { ChatSection } from './components/ChatSection.jsx';
import { AboutSection } from './components/AboutSection.jsx';
import { Section } from './components/Section.jsx';
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
    requestAnimationFrame(() => {
      document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [pipeline]);

  const handleReset = useCallback(() => {
    pipeline.reset();
    setSelectedAgent(null);
  }, [pipeline]);

  const selectedAgentData = selectedAgent
    ? AGENTS.find((a) => a.id === selectedAgent)
    : null;

  return (
    <div id="top" className="bg-app min-h-screen">
      <PipelineHeader
        status={pipeline.status}
        elapsed={pipeline.elapsed}
        completedCount={pipeline.completedCount}
        totalCount={AGENTS.length}
        onRun={handleRun}
        onReset={handleReset}
        agentStates={pipeline.agentStates}
      />

      <main className="relative z-10">
        <Hero onRun={handleRun} isRunning={pipeline.status === 'running'} />

        <SectionDivider />
        <ProblemSection />

        <SectionDivider />
        <SolutionSection />

        <SectionDivider />
        <DashboardSection />

        <SectionDivider />
        <Section
          id="pipeline"
          eyebrow="The Pipeline"
          eyebrowColor="#818CF8"
          title="Watch the agents collaborate, live."
          intro="Each agent has a focused cognitive role and operates on the full upstream context. Click any card on the left to inspect its output on the right."
        >
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleRun}
              disabled={pipeline.status === 'running'}
              className="btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
            >
              {pipeline.status === 'running' ? (
                <>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white/80" />
                  Running pipeline…
                </>
              ) : pipeline.status === 'complete' ? (
                <>
                  <RotateCcw className="h-4 w-4" />
                  Run again
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Run the pipeline
                </>
              )}
            </button>
            {pipeline.status !== 'idle' && (
              <button
                type="button"
                onClick={handleReset}
                disabled={pipeline.status === 'running'}
                className="btn-secondary inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold"
              >
                Reset
              </button>
            )}
            <span className="ml-1 text-xs text-[#B4B4BB]">
              {pipeline.status === 'running'
                ? `${pipeline.completedCount} of ${AGENTS.length} agents complete · ${(pipeline.elapsed / 1000).toFixed(1)}s`
                : pipeline.status === 'complete'
                  ? `Finished in ${(pipeline.elapsed / 1000).toFixed(1)}s — click any agent on the left to inspect output`
                  : 'Roughly 30 seconds end-to-end · 6 agents · pre-baked outputs'}
            </span>
          </div>
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
        </Section>

        <SectionDivider />
        <ChatSection />

        <SectionDivider />
        <AboutSection />

        <Footer />
      </main>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="divider-x" />
    </div>
  );
}
