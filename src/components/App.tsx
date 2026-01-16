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
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        onStartScenario={() => setShowFilterPanel(true)}
      />

      <main className="container mx-auto p-4">
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
