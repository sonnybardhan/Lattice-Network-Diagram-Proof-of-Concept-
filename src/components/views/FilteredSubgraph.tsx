import React, { useMemo, useRef, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { MentalModel } from '../../types';

interface FilteredSubgraphProps {
  modelIds: string[];
  onModelSelect: (modelId: string) => void;
}

// Inline model data lookup - will be replaced with import from data/models.ts
const getModelById = (id: string, modelsData: MentalModel[]): MentalModel | undefined => {
  return modelsData.find((m) => m.id === id);
};

// Graph styles for Cytoscape
const graphStyles: any[] = [
  {
    selector: 'node',
    style: {
      'background-color': '#6366f1',
      'label': 'data(label)',
      'color': '#1f2937',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'font-size': '12px',
      'text-margin-y': 8,
      'width': 40,
      'height': 40,
    },
  },
  {
    selector: 'node.best-fit',
    style: {
      'background-color': '#4f46e5',
      'width': 55,
      'height': 55,
      'font-weight': 'bold',
      'font-size': '13px',
      'border-width': 3,
      'border-color': '#312e81',
    },
  },
  {
    selector: 'node:hover',
    style: {
      'background-color': '#4338ca',
      'cursor': 'pointer',
    },
  },
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#d1d5db',
      'curve-style': 'bezier',
    },
  },
  {
    selector: 'edge[strength = "strong"]',
    style: {
      'width': 4,
      'line-color': '#9ca3af',
    },
  },
  {
    selector: 'edge[strength = "moderate"]',
    style: {
      'width': 2,
      'line-color': '#d1d5db',
    },
  },
];

// Sample models data - will be replaced with import from data/models.ts
const sampleModels: MentalModel[] = [
  {
    id: 'first-principles',
    name: 'First Principles',
    tags: ['decision-prioritization'],
    diagnosticQuestion: 'What do I know to be fundamentally true here?',
    keyInsight: 'Break problems down to basic truths and reason up. Escapes inherited assumptions.',
    redFlagPhrases: ['Everyone does it this way', 'That is just how it is', 'Start from scratch'],
    adjacentModels: ['inversion', 'pre-mortem', 'via-negativa'],
    whyAdjacent: {
      'inversion': 'Both reframe problems fundamentally',
      'pre-mortem': 'First principles helps identify fundamental failure modes',
      'via-negativa': 'Both question assumptions',
    },
  },
  {
    id: 'inversion',
    name: 'Inversion',
    tags: ['decision-prioritization'],
    diagnosticQuestion: 'What would guarantee failure? How do I avoid that?',
    keyInsight: 'Instead of seeking success, systematically avoid failure. Often easier and more reliable.',
    redFlagPhrases: ['Flip it around', 'What is the opposite?', 'Avoid the worst'],
    adjacentModels: ['pre-mortem', 'via-negativa', 'first-principles'],
    whyAdjacent: {
      'pre-mortem': 'Both approach from the failure direction',
      'via-negativa': 'Inversion applied to action - remove vs. add',
      'first-principles': 'Both reframe problems fundamentally',
    },
  },
  {
    id: 'pre-mortem',
    name: 'Pre-mortem',
    tags: ['decision-prioritization'],
    diagnosticQuestion: 'If this fails, why will it have failed?',
    keyInsight: 'Imagine future failure and work backward. It surfaces risks that optimism obscures.',
    redFlagPhrases: ['What could go wrong?', 'Devil\'s advocate', 'Stress test'],
    adjacentModels: ['inversion', 'second-order-thinking', 'unintended-consequences'],
    whyAdjacent: {
      'inversion': 'Both approach problems from the failure direction',
      'second-order-thinking': 'Pre-mortems force downstream thinking',
      'unintended-consequences': 'Surfaces unintended risks',
    },
  },
  {
    id: 'opportunity-cost',
    name: 'Opportunity Cost',
    tags: ['decision-prioritization'],
    diagnosticQuestion: 'What am I giving up by choosing this?',
    keyInsight: 'The true cost of anything is what you sacrifice to get it. Every yes is a no to something else.',
    redFlagPhrases: ['What else could I do with this?', 'Is this the best use of...', 'Trade-offs'],
    adjacentModels: ['comparative-advantage', 'batna', 'expected-value'],
    whyAdjacent: {
      'comparative-advantage': 'Opportunity cost applied to strengths',
      'batna': 'Your alternative defines opportunity cost',
      'expected-value': 'Compare expected values of alternatives',
    },
  },
  {
    id: 'regret-minimization',
    name: 'Regret Minimization',
    tags: ['decision-prioritization'],
    diagnosticQuestion: 'Which choice will I regret least when I am 80?',
    keyInsight: 'Project yourself to the end of life. Regret for inaction often exceeds regret for action.',
    redFlagPhrases: ['Will I regret not trying?', 'What would future me think?', 'Playing it safe'],
    adjacentModels: ['reversibility', 'asymmetric-risk', 'loss-aversion'],
    whyAdjacent: {
      'reversibility': 'Irreversible choices carry more regret risk',
      'asymmetric-risk': 'Regret is often asymmetric',
      'loss-aversion': 'Explains why regret weighs heavily',
    },
  },
  {
    id: 'expected-value',
    name: 'Expected Value',
    tags: ['decision-prioritization'],
    diagnosticQuestion: 'What is the probability-weighted outcome?',
    keyInsight: 'Multiply probability by payoff for each outcome. Choose the highest expected value - but watch for ruin.',
    redFlagPhrases: ['What are the odds?', 'Risk vs. reward', 'Probability times impact'],
    adjacentModels: ['base-rates', 'bayes-theorem', 'asymmetric-risk'],
    whyAdjacent: {
      'base-rates': 'Feeds probability estimates',
      'bayes-theorem': 'Updates probability with new information',
      'asymmetric-risk': 'Adjusts for non-linear payoffs',
    },
  },
];

// Sample edges data - will be replaced with import from data/edges.ts
const sampleEdges = [
  { source: 'first-principles', target: 'inversion', strength: 'strong' as const },
  { source: 'inversion', target: 'pre-mortem', strength: 'strong' as const },
  { source: 'first-principles', target: 'pre-mortem', strength: 'moderate' as const },
  { source: 'opportunity-cost', target: 'expected-value', strength: 'strong' as const },
  { source: 'regret-minimization', target: 'expected-value', strength: 'moderate' as const },
  { source: 'opportunity-cost', target: 'regret-minimization', strength: 'moderate' as const },
];

export function FilteredSubgraph({ modelIds, onModelSelect }: FilteredSubgraphProps) {
  const cyRef = useRef<cytoscape.Core | null>(null);

  // Use sample data or try to import from data files
  const modelsData = sampleModels;
  const edgesData = sampleEdges;

  // Get the filtered models
  const filteredModels = useMemo(() => {
    if (modelIds.length === 0) {
      // Show sample data if no filter applied
      return modelsData;
    }
    return modelsData.filter((m) => modelIds.includes(m.id));
  }, [modelIds, modelsData]);

  // Determine best fit (first model in list for now - can be enhanced with scoring)
  const bestFitId = filteredModels.length > 0 ? filteredModels[0].id : null;

  // Convert to Cytoscape elements
  const elements = useMemo(() => {
    const nodeSet = new Set(filteredModels.map((m) => m.id));

    const nodes: cytoscape.ElementDefinition[] = filteredModels.map((model) => ({
      data: {
        id: model.id,
        label: model.name,
      },
      classes: model.id === bestFitId ? 'best-fit' : '',
    }));

    // Only include edges where both endpoints are in the filtered set
    const relevantEdges = edgesData.filter(
      (e) => nodeSet.has(e.source) && nodeSet.has(e.target)
    );

    // Also add edges from adjacentModels data
    const additionalEdges: typeof sampleEdges = [];
    filteredModels.forEach((model) => {
      model.adjacentModels.forEach((adjId) => {
        if (nodeSet.has(adjId)) {
          const edgeExists = relevantEdges.some(
            (e) =>
              (e.source === model.id && e.target === adjId) ||
              (e.source === adjId && e.target === model.id)
          ) || additionalEdges.some(
            (e) =>
              (e.source === model.id && e.target === adjId) ||
              (e.source === adjId && e.target === model.id)
          );
          if (!edgeExists) {
            additionalEdges.push({
              source: model.id,
              target: adjId,
              strength: 'moderate' as const,
            });
          }
        }
      });
    });

    const allEdges = [...relevantEdges, ...additionalEdges];

    const edgeElements: cytoscape.ElementDefinition[] = allEdges.map((e, i) => ({
      data: {
        id: `edge-${i}`,
        source: e.source,
        target: e.target,
        strength: e.strength,
      },
    }));

    return [...nodes, ...edgeElements];
  }, [filteredModels, edgesData, bestFitId]);

  // Layout configuration
  const layout = useMemo(
    () => ({
      name: 'cose',
      idealEdgeLength: 120,
      nodeOverlap: 20,
      refresh: 20,
      fit: true,
      padding: 40,
      randomize: false,
      componentSpacing: 120,
      nodeRepulsion: 500000,
      edgeElasticity: 100,
      nestingFactor: 5,
      gravity: 80,
      numIter: 1000,
      animate: true,
      animationDuration: 500,
    }),
    []
  );

  // Handle node click
  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.on('tap', 'node', (evt) => {
        const nodeId = evt.target.id();
        onModelSelect(nodeId);
      });
    }

    return () => {
      if (cyRef.current) {
        cyRef.current.removeListener('tap');
      }
    };
  }, [onModelSelect]);

  return (
    <div className="flex h-[calc(100vh-120px)] gap-4">
      {/* Graph Container - Left Side */}
      <div className="w-3/5 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Filtered Mental Models</h2>
          <p className="text-sm text-gray-500">
            {filteredModels.length} models matching your scenario
          </p>
        </div>
        <div className="h-[calc(100%-60px)]">
          <CytoscapeComponent
            elements={elements}
            style={{ width: '100%', height: '100%' }}
            stylesheet={graphStyles}
            layout={layout}
            cy={(cy) => {
              cyRef.current = cy;
            }}
          />
        </div>
      </div>

      {/* Model List Panel - Right Side */}
      <div className="w-2/5 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Model List</h2>
          <p className="text-sm text-gray-500">Click a model to explore its network</p>
        </div>
        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {filteredModels.map((model, index) => (
            <div
              key={model.id}
              className={`p-4 border-b border-gray-100 hover:bg-indigo-50 cursor-pointer transition-colors ${
                model.id === bestFitId ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : ''
              }`}
              onClick={() => onModelSelect(model.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{model.name}</h3>
                    {model.id === bestFitId && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                        Best Fit
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600 italic">
                    "{model.diagnosticQuestion}"
                  </p>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                    {model.keyInsight}
                  </p>
                </div>
              </div>
              <button
                className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onModelSelect(model.id);
                }}
              >
                Learn more
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          ))}

          {filteredModels.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="mt-2">No models found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilteredSubgraph;
