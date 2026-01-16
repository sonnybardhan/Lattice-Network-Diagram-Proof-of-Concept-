import React, { useMemo, useRef, useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { MentalModel } from '../../types';

interface EgoNetworkProps {
  modelId: string;
  onModelSelect: (modelId: string) => void;
}

// Graph styles for Cytoscape - concentric layout optimized
const graphStyles: any[] = [
  {
    selector: 'node',
    style: {
      'background-color': '#6366f1',
      'label': 'data(label)',
      'color': '#1f2937',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'font-size': '11px',
      'text-margin-y': 8,
      'width': 45,
      'height': 45,
      'text-wrap': 'wrap',
      'text-max-width': '80px',
    },
  },
  {
    selector: 'node.focus',
    style: {
      'background-color': '#4f46e5',
      'width': 70,
      'height': 70,
      'font-weight': 'bold',
      'font-size': '13px',
      'border-width': 4,
      'border-color': '#312e81',
      'text-margin-y': 12,
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
      'line-color': '#c7d2fe',
      'curve-style': 'bezier',
      'target-arrow-shape': 'none',
    },
  },
  {
    selector: 'edge.highlighted',
    style: {
      'width': 3,
      'line-color': '#818cf8',
    },
  },
];

// Sample models data - comprehensive set for ego network demonstration
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

  // Get the focus model
  const focusModel = useMemo(() => {
    return sampleModels.find((m) => m.id === modelId) || sampleModels[0];
  }, [modelId]);

  // Get ego network - focus model + adjacent models
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

  // Convert to Cytoscape elements
  const elements = useMemo(() => {
    const nodes: cytoscape.ElementDefinition[] = egoModels.map((model) => ({
      data: {
        id: model.id,
        label: model.name,
      },
      classes: model.id === focusModel.id ? 'focus' : '',
    }));

    // Create edges from focus model to adjacent models
    const edges: cytoscape.ElementDefinition[] = focusModel.adjacentModels
      .filter((adjId) => egoModels.some((m) => m.id === adjId))
      .map((adjId, i) => ({
        data: {
          id: `edge-${focusModel.id}-${adjId}`,
          source: focusModel.id,
          target: adjId,
        },
      }));

    return [...nodes, ...edges];
  }, [egoModels, focusModel]);

  // Concentric layout - focus in center
  const layout = useMemo(
    () => ({
      name: 'concentric',
      concentric: (node: any) => {
        return node.id() === focusModel.id ? 2 : 1;
      },
      levelWidth: () => 1,
      minNodeSpacing: 60,
      animate: true,
      animationDuration: 500,
      fit: true,
      padding: 50,
    }),
    [focusModel.id]
  );

  // Handle interactions
  useEffect(() => {
    if (cyRef.current) {
      const cy = cyRef.current;

      // Highlight focus node
      cy.nodes().removeClass('focus');
      cy.$(`#${focusModel.id}`).addClass('focus');

      // Node click handler
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
    <div className="flex h-[calc(100vh-120px)] gap-4">
      {/* Graph Container - Left Side */}
      <div className="w-1/2 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Ego Network</h2>
          <p className="text-sm text-gray-500">
            {focusModel.name} and {egoModels.length - 1} connected models
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

      {/* Model Card Panel - Right Side */}
      <div className="w-1/2 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Model Details</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100%-60px)] p-6">
          {/* Model Name */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{focusModel.name}</h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {focusModel.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md"
              >
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>

          {/* Diagnostic Question */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Diagnostic Question
            </h4>
            <p className="text-lg text-indigo-700 italic">"{focusModel.diagnosticQuestion}"</p>
          </div>

          {/* Key Insight */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Key Insight
            </h4>
            <p className="text-gray-700 leading-relaxed">{focusModel.keyInsight}</p>
          </div>

          {/* Red Flag Phrases */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Red Flag Phrases
            </h4>
            <div className="flex flex-wrap gap-2">
              {focusModel.redFlagPhrases.map((phrase, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-full border border-red-200"
                >
                  "{phrase}"
                </span>
              ))}
            </div>
          </div>

          {/* Adjacent Models */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Connected Models
            </h4>
            <div className="space-y-3">
              {focusModel.adjacentModels.map((adjId) => {
                const adjModel = sampleModels.find((m) => m.id === adjId);
                const whyAdjacent = focusModel.whyAdjacent[adjId];
                return (
                  <div
                    key={adjId}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 cursor-pointer transition-colors"
                    onClick={() => onModelSelect(adjId)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {adjModel?.name || adjId.replace(/-/g, ' ')}
                      </span>
                      <svg
                        className="w-4 h-4 text-gray-400"
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
                    </div>
                    {whyAdjacent && (
                      <p className="mt-1 text-sm text-gray-600">{whyAdjacent}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Practice Button */}
          <div className="pt-4 border-t border-gray-200">
            <button className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
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
