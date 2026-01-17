import React, { useMemo, useRef, useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { MentalModel } from '../../types';

interface EgoNetworkProps {
  modelId: string;
  onModelSelect: (modelId: string) => void;
}

// Apple-inspired minimal graph styles - Ego Network
const graphStyles: cytoscape.StylesheetStyle[] = [
  // Adjacent nodes - clean white circles
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
      'width': 40,
      'height': 40,
      'text-wrap': 'wrap',
      'text-max-width': '85px',
      'text-outline-color': 'rgba(0, 0, 0, 0.8)',
      'text-outline-width': 1.5,
      'border-width': 0,
      'shadow-blur': 16,
      'shadow-color': 'rgba(0, 0, 0, 0.2)',
      'shadow-opacity': 1,
      'shadow-offset-x': 0,
      'shadow-offset-y': 3,
      'transition-property': 'background-color, width, height, shadow-blur, shadow-offset-y',
      'transition-duration': 250,
      'transition-timing-function': 'ease-out',
    } as any,
  },
  // Focus node - prominent blue center
  {
    selector: 'node.focus',
    style: {
      'background-color': '#007AFF',
      'width': 64,
      'height': 64,
      'font-weight': 600,
      'font-size': '13px',
      'color': '#ffffff',
      'text-margin-y': 14,
      'shadow-blur': 32,
      'shadow-color': 'rgba(0, 122, 255, 0.35)',
      'shadow-offset-y': 6,
      'z-index': 999,
    } as any,
  },
  // Hover state - gentle lift
  {
    selector: 'node:hover',
    style: {
      'background-color': '#ffffff',
      'cursor': 'pointer',
      'width': 46,
      'height': 46,
      'shadow-blur': 24,
      'shadow-color': 'rgba(0, 0, 0, 0.18)',
      'shadow-offset-y': 8,
    } as any,
  },
  // Edge styles - subtle lines
  {
    selector: 'edge',
    style: {
      'width': 1,
      'line-color': 'rgba(255, 255, 255, 0.25)',
      'curve-style': 'bezier',
      'target-arrow-shape': 'none',
      'line-cap': 'round',
      'transition-property': 'line-color, width',
      'transition-duration': 250,
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
    adjacentModels: ['inversion', 'pre-mortem', 'via-negativa', 'second-order-thinking'],
    whyAdjacent: {
      'inversion': 'Both reframe problems fundamentally',
      'pre-mortem': 'First principles helps identify fundamental failure modes',
      'via-negativa': 'Both question assumptions by stripping away unnecessary elements',
      'second-order-thinking': 'First principles enables deeper analysis of consequences',
    },
  },
  {
    id: 'inversion',
    name: 'Inversion',
    tags: ['decision-prioritization'],
    diagnosticQuestion: 'What would guarantee failure? How do I avoid that?',
    keyInsight: 'Instead of seeking success, systematically avoid failure. Often easier and more reliable.',
    redFlagPhrases: ['Flip it around', 'What is the opposite?', 'Avoid the worst'],
    adjacentModels: ['pre-mortem', 'via-negativa', 'first-principles', 'second-order-thinking'],
    whyAdjacent: {
      'pre-mortem': 'Both approach problems from the failure direction',
      'via-negativa': 'Inversion applied to action - remove vs. add',
      'first-principles': 'Both reframe problems fundamentally',
      'second-order-thinking': 'Inversion reveals hidden second-order consequences',
    },
  },
  {
    id: 'pre-mortem',
    name: 'Pre-mortem',
    tags: ['decision-prioritization'],
    diagnosticQuestion: 'If this fails, why will it have failed?',
    keyInsight: 'Imagine future failure and work backward. It surfaces risks that optimism obscures.',
    redFlagPhrases: ['What could go wrong?', 'Devil\'s advocate', 'Stress test'],
    adjacentModels: ['inversion', 'second-order-thinking', 'unintended-consequences', 'hindsight-bias'],
    whyAdjacent: {
      'inversion': 'Both approach problems from the failure direction',
      'second-order-thinking': 'Pre-mortems force downstream thinking',
      'unintended-consequences': 'Surfaces unintended risks before they happen',
      'hindsight-bias': 'Pre-mortems prevent I knew it all along thinking',
    },
  },
  {
    id: 'via-negativa',
    name: 'Via Negativa',
    tags: ['decision-prioritization'],
    diagnosticQuestion: 'What should I stop doing or remove?',
    keyInsight: 'Improvement often comes from subtraction, not addition. Remove the negative before adding positive.',
    redFlagPhrases: ['Less is more', 'What to eliminate', 'Simplify'],
    adjacentModels: ['first-principles', 'inversion', 'occams-razor'],
    whyAdjacent: {
      'first-principles': 'Both strip away to find essence',
      'inversion': 'Both focus on what to avoid or remove',
      'occams-razor': 'Both favor simplicity and removal of unnecessary elements',
    },
  },
  {
    id: 'second-order-thinking',
    name: 'Second-Order Thinking',
    tags: ['change-disruption'],
    diagnosticQuestion: 'What happens after that happens?',
    keyInsight: 'Consider the consequences of the consequences. First-order thinking is immediate; second-order is strategic.',
    redFlagPhrases: ['And then what?', 'Downstream effects', 'Ripple effects'],
    adjacentModels: ['pre-mortem', 'unintended-consequences', 'first-principles', 'inversion'],
    whyAdjacent: {
      'pre-mortem': 'Both force thinking about future consequences',
      'unintended-consequences': 'Second-order effects are often unintended',
      'first-principles': 'Deep analysis enables better second-order thinking',
      'inversion': 'Reveals hidden second-order consequences',
    },
  },
  {
    id: 'unintended-consequences',
    name: 'Unintended Consequences',
    tags: ['change-disruption'],
    diagnosticQuestion: 'What might happen that I am not planning for?',
    keyInsight: 'Actions have effects beyond their intended purpose. Complex systems produce unexpected outcomes.',
    redFlagPhrases: ['Side effects', 'Unexpected results', 'Backfired'],
    adjacentModels: ['second-order-thinking', 'pre-mortem', 'chestertons-fence'],
    whyAdjacent: {
      'second-order-thinking': 'Unintended consequences are often second-order effects',
      'pre-mortem': 'Helps identify unintended consequences before they occur',
      'chestertons-fence': 'Removing things without understanding causes unintended consequences',
    },
  },
  {
    id: 'occams-razor',
    name: 'Occam\'s Razor',
    tags: ['thinking-clearly'],
    diagnosticQuestion: 'What is the simplest explanation that fits the facts?',
    keyInsight: 'Among competing hypotheses, the one with the fewest assumptions should be selected.',
    redFlagPhrases: ['Keep it simple', 'Most likely explanation', 'Don\'t overcomplicate'],
    adjacentModels: ['via-negativa', 'first-principles', 'abstraction-ladders'],
    whyAdjacent: {
      'via-negativa': 'Both favor removal and simplicity',
      'first-principles': 'Both seek fundamental truths without excess',
      'abstraction-ladders': 'Helps find the right level of simplification',
    },
  },
  {
    id: 'hindsight-bias',
    name: 'Hindsight Bias',
    tags: ['thinking-clearly'],
    diagnosticQuestion: 'Am I judging past decisions with information I did not have then?',
    keyInsight: 'Once we know an outcome, we believe we knew it all along. This distorts learning from the past.',
    redFlagPhrases: ['I knew it', 'Obviously', 'Should have seen it coming'],
    adjacentModels: ['pre-mortem', 'narrative-fallacy', 'survivorship-bias'],
    whyAdjacent: {
      'pre-mortem': 'Pre-mortems create a record that prevents hindsight bias',
      'narrative-fallacy': 'Both distort our understanding of the past',
      'survivorship-bias': 'Both create false patterns from incomplete information',
    },
  },
  {
    id: 'chestertons-fence',
    name: 'Chesterton\'s Fence',
    tags: ['change-disruption'],
    diagnosticQuestion: 'Do I understand why this exists before I change it?',
    keyInsight: 'Don\'t remove something until you understand why it was put there in the first place.',
    redFlagPhrases: ['Why is this here?', 'Seems unnecessary', 'Legacy reasons'],
    adjacentModels: ['unintended-consequences', 'second-order-thinking', 'lindy-effect'],
    whyAdjacent: {
      'unintended-consequences': 'Removing without understanding causes unintended consequences',
      'second-order-thinking': 'Understanding the fence requires second-order thinking',
      'lindy-effect': 'Things that have survived have often done so for good reasons',
    },
  },
  {
    id: 'abstraction-ladders',
    name: 'Abstraction Ladders',
    tags: ['thinking-clearly'],
    diagnosticQuestion: 'Am I at the right level of abstraction for this problem?',
    keyInsight: 'Move up for strategy and patterns, down for specifics and action. Match abstraction to the task.',
    redFlagPhrases: ['Too abstract', 'Too detailed', 'Big picture vs. details'],
    adjacentModels: ['occams-razor', 'first-principles', 'multicausal'],
    whyAdjacent: {
      'occams-razor': 'Helps find the right level of detail',
      'first-principles': 'Moving down the abstraction ladder to fundamentals',
      'multicausal': 'Different abstraction levels reveal different causes',
    },
  },
];

export function EgoNetwork({ modelId, onModelSelect }: EgoNetworkProps) {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  const focusModel = useMemo(() => {
    return sampleModels.find((m) => m.id === modelId) || sampleModels[0];
  }, [modelId]);

  const egoModels = useMemo(() => {
    const adjacentIds = focusModel.adjacentModels;
    const networkModels = [focusModel];

    adjacentIds.forEach((adjId) => {
      const adjModel = sampleModels.find((m) => m.id === adjId);
      if (adjModel) {
        networkModels.push(adjModel);
      }
    });

    return networkModels;
  }, [focusModel]);

  const elements = useMemo(() => {
    const nodes: cytoscape.ElementDefinition[] = egoModels.map((model) => ({
      data: {
        id: model.id,
        label: model.name,
      },
      classes: model.id === focusModel.id ? 'focus' : '',
    }));

    const edges: cytoscape.ElementDefinition[] = focusModel.adjacentModels
      .filter((adjId) => egoModels.some((m) => m.id === adjId))
      .map((adjId) => ({
        data: {
          id: `edge-${focusModel.id}-${adjId}`,
          source: focusModel.id,
          target: adjId,
        },
      }));

    return [...nodes, ...edges];
  }, [egoModels, focusModel]);

  const layout = useMemo(
    () => ({
      name: 'concentric',
      concentric: (node: any) => {
        return node.id() === focusModel.id ? 2 : 1;
      },
      levelWidth: () => 1,
      minNodeSpacing: 70,
      animate: true,
      animationDuration: 600,
      animationEasing: 'ease-out-cubic',
      fit: true,
      padding: 60,
    }),
    [focusModel.id]
  );

  useEffect(() => {
    if (cyRef.current) {
      const cy = cyRef.current;
      cy.nodes().removeClass('focus');
      cy.$(`#${focusModel.id}`).addClass('focus');

      cy.on('tap', 'node', (evt) => {
        const nodeId = evt.target.id();
        if (nodeId !== focusModel.id) {
          onModelSelect(nodeId);
        }
      });
    }

    return () => {
      if (cyRef.current) {
        cyRef.current.removeListener('tap');
      }
    };
  }, [focusModel.id, onModelSelect]);

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6">
      {/* Graph Container */}
      <div className="w-1/2 relative overflow-hidden" style={{
        background: 'linear-gradient(145deg, #0a0a0f 0%, #12121a 50%, #1a1a2e 100%)',
        borderRadius: '24px',
        border: '1px solid rgba(139, 92, 246, 0.25)',
      }}>
        {/* Ambient glow effects */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0, 245, 255, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 80% 20%, rgba(255, 0, 170, 0.08) 0%, transparent 50%)
          `,
        }} />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-5 z-10" style={{
          background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.95) 0%, transparent 100%)',
        }}>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{
              background: '#00f5ff',
              boxShadow: '0 0 12px #00f5ff, 0 0 24px rgba(0, 245, 255, 0.5)',
            }} />
            <h2 className="text-lg font-semibold" style={{ color: '#f0f0f5' }}>
              Ego Network
            </h2>
          </div>
          <p className="text-sm mt-1" style={{ color: '#a0a0b5' }}>
            <span className="font-medium" style={{ color: '#00f5ff' }}>{focusModel.name}</span>
            {' '}and {egoModels.length - 1} connected models
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
        {hoveredModel && hoveredModel !== focusModel.id && (
          <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl text-sm font-medium animate-fade-in-up" style={{
            background: 'rgba(0, 245, 255, 0.15)',
            border: '1px solid rgba(0, 245, 255, 0.4)',
            color: '#00f5ff',
            backdropFilter: 'blur(10px)',
          }}>
            Click to explore {sampleModels.find(m => m.id === hoveredModel)?.name}
          </div>
        )}
      </div>

      {/* Model Details Panel */}
      <div className="w-1/2 overflow-hidden" style={{
        background: 'linear-gradient(145deg, #12121a 0%, #1a1a2e 100%)',
        borderRadius: '24px',
        border: '1px solid rgba(139, 92, 246, 0.25)',
      }}>
        {/* Panel Header */}
        <div className="p-5 border-b" style={{ borderColor: 'rgba(139, 92, 246, 0.2)' }}>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" style={{ color: '#8b5cf6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h2 className="text-lg font-semibold" style={{ color: '#f0f0f5' }}>Model Details</h2>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-70px)] p-6">
          {/* Model Name */}
          <h3 className="text-2xl font-bold mb-3 gradient-text">{focusModel.name}</h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {focusModel.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{
                  background: 'rgba(139, 92, 246, 0.2)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  color: '#a78bfa',
                }}
              >
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>

          {/* Diagnostic Question */}
          <div className="mb-6 p-4 rounded-xl" style={{
            background: 'rgba(0, 245, 255, 0.08)',
            border: '1px solid rgba(0, 245, 255, 0.2)',
          }}>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6b6b80' }}>
              Diagnostic Question
            </h4>
            <p className="text-lg font-medium italic" style={{ color: '#00f5ff' }}>
              "{focusModel.diagnosticQuestion}"
            </p>
          </div>

          {/* Key Insight */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6b6b80' }}>
              Key Insight
            </h4>
            <p className="leading-relaxed" style={{ color: '#a0a0b5' }}>{focusModel.keyInsight}</p>
          </div>

          {/* Red Flag Phrases */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#6b6b80' }}>
              Red Flag Phrases
            </h4>
            <div className="flex flex-wrap gap-2">
              {focusModel.redFlagPhrases.map((phrase, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-sm rounded-lg"
                  style={{
                    background: 'rgba(255, 0, 170, 0.12)',
                    border: '1px solid rgba(255, 0, 170, 0.3)',
                    color: '#ff6bcb',
                  }}
                >
                  "{phrase}"
                </span>
              ))}
            </div>
          </div>

          {/* Connected Models */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#6b6b80' }}>
              Connected Models
            </h4>
            <div className="space-y-3">
              {focusModel.adjacentModels.map((adjId) => {
                const adjModel = sampleModels.find((m) => m.id === adjId);
                const whyAdjacent = focusModel.whyAdjacent[adjId];
                const isHovered = hoveredModel === adjId;

                return (
                  <div
                    key={adjId}
                    className="p-4 rounded-xl cursor-pointer transition-all duration-300"
                    style={{
                      background: isHovered ? 'rgba(0, 245, 255, 0.1)' : 'rgba(36, 36, 56, 0.5)',
                      border: `1px solid ${isHovered ? 'rgba(0, 245, 255, 0.5)' : 'rgba(139, 92, 246, 0.2)'}`,
                      transform: isHovered ? 'translateX(4px)' : 'none',
                    }}
                    onClick={() => onModelSelect(adjId)}
                    onMouseEnter={() => setHoveredModel(adjId)}
                    onMouseLeave={() => setHoveredModel(null)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium" style={{ color: isHovered ? '#00f5ff' : '#f0f0f5' }}>
                        {adjModel?.name || adjId.replace(/-/g, ' ')}
                      </span>
                      <svg
                        className="w-4 h-4 transition-transform duration-300"
                        style={{
                          color: isHovered ? '#00f5ff' : '#6b6b80',
                          transform: isHovered ? 'translateX(4px)' : 'none',
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    {whyAdjacent && (
                      <p className="mt-1.5 text-sm" style={{ color: '#a0a0b5' }}>{whyAdjacent}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t" style={{ borderColor: 'rgba(139, 92, 246, 0.2)' }}>
            <button className="w-full py-3.5 px-4 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 btn-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Practice with Scenario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgoNetwork;
