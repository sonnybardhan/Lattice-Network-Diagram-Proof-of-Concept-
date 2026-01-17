import React, { useMemo, useRef, useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { MentalModel } from '../../types';

interface FilteredSubgraphProps {
  modelIds: string[];
  onModelSelect: (modelId: string) => void;
}

// Apple-inspired minimal graph styles - Filtered View
const graphStyles: cytoscape.StylesheetStyle[] = [
  // Base nodes - clean white
  {
    selector: 'node',
    style: {
      'background-color': '#ffffff',
      'background-opacity': 0.9,
      'label': 'data(label)',
      'color': 'rgba(255, 255, 255, 0.9)',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'font-size': '11px',
      'font-family': '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
      'font-weight': 500,
      'text-margin-y': 10,
      'width': 42,
      'height': 42,
      'text-wrap': 'wrap',
      'text-max-width': '85px',
      'text-outline-color': 'rgba(0, 0, 0, 0.8)',
      'text-outline-width': 1.5,
      'border-width': 0,
      'shadow-blur': 18,
      'shadow-color': 'rgba(0, 0, 0, 0.2)',
      'shadow-opacity': 1,
      'shadow-offset-x': 0,
      'shadow-offset-y': 4,
      'transition-property': 'background-color, width, height, shadow-blur, shadow-offset-y',
      'transition-duration': 250,
      'transition-timing-function': 'ease-out',
    } as any,
  },
  // Best fit node - Apple orange
  {
    selector: 'node.best-fit',
    style: {
      'background-color': '#FF9500',
      'width': 56,
      'height': 56,
      'font-weight': 600,
      'font-size': '12px',
      'color': '#ffffff',
      'text-margin-y': 12,
      'shadow-blur': 28,
      'shadow-color': 'rgba(255, 149, 0, 0.35)',
      'shadow-offset-y': 6,
      'z-index': 999,
    } as any,
  },
  // Hover state - subtle lift
  {
    selector: 'node:hover',
    style: {
      'background-color': '#ffffff',
      'cursor': 'pointer',
      'width': 48,
      'height': 48,
      'shadow-blur': 26,
      'shadow-color': 'rgba(0, 0, 0, 0.18)',
      'shadow-offset-y': 8,
    } as any,
  },
  // Edge styles - hairline
  {
    selector: 'edge',
    style: {
      'width': 1,
      'line-color': 'rgba(255, 255, 255, 0.2)',
      'curve-style': 'bezier',
      'target-arrow-shape': 'none',
      'line-cap': 'round',
      'transition-property': 'line-color, width',
      'transition-duration': 250,
    } as any,
  },
  // Strong connection
  {
    selector: 'edge[strength = "strong"]',
    style: {
      'width': 1.5,
      'line-color': 'rgba(255, 255, 255, 0.3)',
    } as any,
  },
  // Moderate connection
  {
    selector: 'edge[strength = "moderate"]',
    style: {
      'width': 1,
      'line-color': 'rgba(255, 255, 255, 0.2)',
    } as any,
  },
  // Highlighted edge
  {
    selector: 'edge.highlighted',
    style: {
      'width': 2,
      'line-color': 'rgba(0, 122, 255, 0.5)',
      'z-index': 999,
    } as any,
  },
];

// Sample models data
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
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  const modelsData = sampleModels;
  const edgesData = sampleEdges;

  const filteredModels = useMemo(() => {
    if (modelIds.length === 0) {
      return modelsData;
    }
    return modelsData.filter((m) => modelIds.includes(m.id));
  }, [modelIds, modelsData]);

  const bestFitId = filteredModels.length > 0 ? filteredModels[0].id : null;

  const elements = useMemo(() => {
    const nodeSet = new Set(filteredModels.map((m) => m.id));

    const nodes: cytoscape.ElementDefinition[] = filteredModels.map((model) => ({
      data: {
        id: model.id,
        label: model.name,
      },
      classes: model.id === bestFitId ? 'best-fit' : '',
    }));

    const relevantEdges = edgesData.filter(
      (e) => nodeSet.has(e.source) && nodeSet.has(e.target)
    );

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

  const layout = useMemo(
    () => ({
      name: 'cose',
      idealEdgeLength: 140,
      nodeOverlap: 30,
      refresh: 20,
      fit: true,
      padding: 50,
      randomize: false,
      componentSpacing: 140,
      nodeRepulsion: 600000,
      edgeElasticity: 100,
      nestingFactor: 5,
      gravity: 80,
      numIter: 1000,
      animate: true,
      animationDuration: 600,
      animationEasing: 'ease-out-cubic',
    }),
    []
  );

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
    <div className="flex h-[calc(100vh-120px)] gap-6">
      {/* Graph Container */}
      <div className="w-3/5 relative overflow-hidden" style={{
        background: 'linear-gradient(145deg, #0a0a0f 0%, #12121a 50%, #1a1a2e 100%)',
        borderRadius: '24px',
        border: '1px solid rgba(139, 92, 246, 0.25)',
      }}>
        {/* Ambient glow effects */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            radial-gradient(ellipse 70% 50% at 30% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 70% 70%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0, 245, 255, 0.08) 0%, transparent 50%)
          `,
        }} />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-5 z-10" style={{
          background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.95) 0%, transparent 100%)',
        }}>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{
              background: '#ffd700',
              boxShadow: '0 0 12px #ffd700, 0 0 24px rgba(255, 215, 0, 0.5)',
            }} />
            <h2 className="text-lg font-semibold" style={{ color: '#f0f0f5' }}>
              Filtered Mental Models
            </h2>
          </div>
          <p className="text-sm mt-1" style={{ color: '#a0a0b5' }}>
            <span className="font-medium" style={{ color: '#ffd700' }}>{filteredModels.length}</span>
            {' '}models matching your scenario
          </p>
        </div>

        {/* Graph */}
        <div className="h-full pt-16">
          <CytoscapeComponent
            elements={elements}
            style={{ width: '100%', height: '100%' }}
            stylesheet={graphStyles}
            layout={layout}
            cy={(cy) => {
              cyRef.current = cy;

              cy.on('mouseover', 'node', (evt) => {
                const node = evt.target;
                setHoveredModel(node.id());
                node.connectedEdges().addClass('highlighted');
              });

              cy.on('mouseout', 'node', () => {
                setHoveredModel(null);
                cy.edges().removeClass('highlighted');
              });
            }}
            minZoom={0.5}
            maxZoom={2}
            boxSelectionEnabled={false}
            autounselectify={true}
            {...{ wheelSensitivity: 0.2 } as any}
          />
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
          <button
            onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 1.2)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-medium transition-all duration-300"
            style={{
              background: 'rgba(26, 26, 46, 0.9)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              color: '#f0f0f5',
              backdropFilter: 'blur(10px)',
            }}
            title="Zoom in"
          >
            +
          </button>
          <button
            onClick={() => cyRef.current?.zoom(cyRef.current.zoom() / 1.2)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-medium transition-all duration-300"
            style={{
              background: 'rgba(26, 26, 46, 0.9)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              color: '#f0f0f5',
              backdropFilter: 'blur(10px)',
            }}
            title="Zoom out"
          >
            −
          </button>
          <button
            onClick={() => cyRef.current?.fit(undefined, 50)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-semibold transition-all duration-300"
            style={{
              background: 'rgba(26, 26, 46, 0.9)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              color: '#f0f0f5',
              backdropFilter: 'blur(10px)',
            }}
            title="Fit to screen"
          >
            FIT
          </button>
        </div>

        {/* Floating interaction hint */}
        {hoveredModel && (
          <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl text-sm font-medium animate-fade-in-up" style={{
            background: 'rgba(0, 245, 255, 0.15)',
            border: '1px solid rgba(0, 245, 255, 0.4)',
            color: '#00f5ff',
            backdropFilter: 'blur(10px)',
          }}>
            Click to explore {sampleModels.find(m => m.id === hoveredModel)?.name}
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-20 right-4 px-4 py-3 rounded-xl" style={{
          background: 'rgba(10, 10, 15, 0.9)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          backdropFilter: 'blur(10px)',
        }}>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#FF9500' }} />
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Best Fit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ffffff' }} />
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Related</span>
            </div>
          </div>
        </div>
      </div>

      {/* Model List Panel */}
      <div className="w-2/5 overflow-hidden" style={{
        background: 'linear-gradient(145deg, #12121a 0%, #1a1a2e 100%)',
        borderRadius: '24px',
        border: '1px solid rgba(139, 92, 246, 0.25)',
      }}>
        {/* Panel Header */}
        <div className="p-5 border-b" style={{ borderColor: 'rgba(139, 92, 246, 0.2)' }}>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" style={{ color: '#8b5cf6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <h2 className="text-lg font-semibold" style={{ color: '#f0f0f5' }}>Model List</h2>
          </div>
          <p className="text-sm mt-1" style={{ color: '#a0a0b5' }}>Click a model to explore its network</p>
        </div>

        <div className="overflow-y-auto h-[calc(100%-90px)]">
          {filteredModels.map((model, index) => {
            const isBestFit = model.id === bestFitId;
            const isHovered = hoveredModel === model.id;

            return (
              <div
                key={model.id}
                className="p-4 border-b cursor-pointer transition-all duration-300"
                style={{
                  borderColor: 'rgba(139, 92, 246, 0.1)',
                  background: isHovered
                    ? 'rgba(0, 245, 255, 0.08)'
                    : isBestFit
                      ? 'rgba(255, 215, 0, 0.08)'
                      : 'transparent',
                  borderLeft: isBestFit ? '3px solid #ffd700' : '3px solid transparent',
                }}
                onClick={() => onModelSelect(model.id)}
                onMouseEnter={() => setHoveredModel(model.id)}
                onMouseLeave={() => setHoveredModel(null)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold" style={{ color: isHovered ? '#007AFF' : '#f0f0f5' }}>
                        {model.name}
                      </h3>
                      {isBestFit && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full" style={{
                          background: 'rgba(255, 149, 0, 0.15)',
                          color: '#FF9500',
                        }}>
                          Best Fit
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm italic" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      "{model.diagnosticQuestion}"
                    </p>
                    <p className="mt-2 text-sm line-clamp-2" style={{ color: '#a0a0b5' }}>
                      {model.keyInsight}
                    </p>
                  </div>
                </div>
                <button
                  className="mt-3 text-sm font-medium flex items-center gap-1 transition-all duration-300"
                  style={{ color: isHovered ? '#007AFF' : 'rgba(255, 255, 255, 0.5)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onModelSelect(model.id);
                  }}
                >
                  Explore network
                  <svg
                    className="w-4 h-4 transition-transform duration-300"
                    style={{ transform: isHovered ? 'translateX(4px)' : 'none' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            );
          })}

          {filteredModels.length === 0 && (
            <div className="p-8 text-center" style={{ color: '#6b6b80' }}>
              <svg
                className="mx-auto h-16 w-16 mb-4"
                style={{ color: '#2d2d44' }}
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
              <p className="font-medium" style={{ color: '#a0a0b5' }}>No models found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilteredSubgraph;
