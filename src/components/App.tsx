import { useState } from 'react';
import { Navigation } from './shared/Navigation';
import { FilteredSubgraph } from './views/FilteredSubgraph';
import { EgoNetwork } from './views/EgoNetwork';
import { TagClusterView } from './views/TagClusterView';
import { LearningPath } from './views/LearningPath';
import { FilterPanel } from './shared/FilterPanel';
import { ViewType } from '../types';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('tag-cluster');
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [filteredModelIds, setFilteredModelIds] = useState<string[]>([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const handleModelSelect = (modelId: string) => {
    setSelectedModelId(modelId);
    setCurrentView('ego-network');
  };

  const handleFilterComplete = (modelIds: string[]) => {
    setFilteredModelIds(modelIds);
    setShowFilterPanel(false);
    setCurrentView('filtered-subgraph');
  };

  return (
    <div className="min-h-screen neural-bg" style={{
      background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%)',
    }}>
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 80% 50% at 10% 90%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 90% 10%, rgba(0, 245, 255, 0.06) 0%, transparent 50%),
          radial-gradient(ellipse 50% 30% at 50% 50%, rgba(255, 0, 170, 0.04) 0%, transparent 40%)
        `,
      }} />

      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        onStartScenario={() => setShowFilterPanel(true)}
      />

      <main className="container mx-auto p-4 relative z-10">
        {showFilterPanel && (
          <FilterPanel
            onComplete={handleFilterComplete}
            onCancel={() => setShowFilterPanel(false)}
          />
        )}

        {!showFilterPanel && currentView === 'filtered-subgraph' && (
          <FilteredSubgraph
            modelIds={filteredModelIds}
            onModelSelect={handleModelSelect}
          />
        )}

        {!showFilterPanel && currentView === 'ego-network' && selectedModelId && (
          <EgoNetwork
            modelId={selectedModelId}
            onModelSelect={handleModelSelect}
          />
        )}

        {!showFilterPanel && currentView === 'tag-cluster' && (
          <TagClusterView
            onModelSelect={handleModelSelect}
          />
        )}

        {!showFilterPanel && currentView === 'learning-path' && (
          <LearningPath
            onModelSelect={handleModelSelect}
          />
        )}
      </main>
    </div>
  );
}

export default App;
