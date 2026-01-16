import React, { useState, useMemo, useRef, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { Tag, MentalModel } from '../../types';

interface TagClusterViewProps {
  onModelSelect: (modelId: string) => void;
}

// Graph styles for expanded tag view
const graphStyles: any[] = [
  {
    selector: 'node',
    style: {
      'background-color': '#6366f1',
      'label': 'data(label)',
      'color': '#1f2937',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'font-size': '10px',
      'text-margin-y': 6,
      'width': 35,
      'height': 35,
      'text-wrap': 'wrap',
      'text-max-width': '70px',
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
      'width': 1.5,
      'line-color': '#d1d5db',
      'curve-style': 'bezier',
    },
  },
];

// Sample tags data - representing all 12 tags from specification
const sampleTags: Tag[] = [
  {
    id: 'decision-prioritization',
    name: 'Decision & Prioritization',
    l1Question: 'Are you weighing options or deciding what to do?',
    l2Question: "What's the core decision challenge?",
    l2Options: [
      { text: 'I have too many options and need to prioritize', modelIds: ['eisenhower-matrix', 'pareto-principle', 'satisficing'] },
      { text: 'I need to evaluate trade-offs between choices', modelIds: ['opportunity-cost', 'comparative-advantage', 'expected-value', 'diminishing-returns'] },
    ],
    modelIds: ['eisenhower-matrix', 'pareto-principle', 'reversibility', 'implementation-intentions', 'diminishing-returns', 'opportunity-cost', 'forcing-function', 'batna', 'satisficing', 'pre-mortem', 'inversion', 'regret-minimization', 'expected-value', 'first-principles', 'optionality', 'comparative-advantage', 'via-negativa', 'via-positiva-vs-via-negativa', 'barbell-strategy', 'zero-risk-bias', 'mental-accounting'],
  },
  {
    id: 'unexpected-behavior',
    name: 'Unexpected Behavior',
    l1Question: "Is someone acting in a way that doesn't make sense?",
    l2Question: 'What might explain the behavior?',
    l2Options: [
      { text: "They're responding to rewards or penalties I haven't considered", modelIds: ['incentives', 'moral-hazard', 'principal-agent-problem'] },
      { text: 'A metric or rule is creating perverse outcomes', modelIds: ['goodharts-law', 'cobra-effect'] },
    ],
    modelIds: ['incentives', 'hanlons-razor', 'revealed-preference', 'empathy-gap', 'goodharts-law', 'cobra-effect', 'principal-agent-problem', 'hyperbolic-discounting', 'moral-hazard', 'fundamental-attribution-error', 'mimetic-desire'],
  },
  {
    id: 'incomplete-information',
    name: 'Incomplete Information',
    l1Question: "Does someone know something important that others don't?",
    l2Question: "What's the nature of the information gap?",
    l2Options: [
      { text: 'Someone knows more than I do (or vice versa)', modelIds: ['information-asymmetry', 'adverse-selection', 'curse-of-knowledge'] },
      { text: "I'm working with probabilities or incomplete data", modelIds: ['base-rates', 'bayes-theorem', 'regression-to-the-mean'] },
    ],
    modelIds: ['information-asymmetry', 'circle-of-competence', 'curse-of-knowledge', 'base-rates', 'regression-to-the-mean', 'map-vs-territory', 'bayes-theorem', 'adverse-selection', 'black-swan', 'knightian-uncertainty'],
  },
  {
    id: 'change-disruption',
    name: 'Change & Disruption',
    l1Question: 'Is something ending, shifting, or being replaced?',
    l2Question: "What's the nature of the change?",
    l2Options: [
      { text: 'Something new is replacing something old', modelIds: ['creative-destruction', 'lindy-effect'] },
      { text: 'Past investments are clouding current judgment', modelIds: ['sunk-cost-fallacy', 'commitment-bias', 'status-quo-bias'] },
    ],
    modelIds: ['sunk-cost-fallacy', 'status-quo-bias', 'unintended-consequences', 'chestertons-fence', 'second-order-thinking', 'second-order-effects', 'path-dependence', 'lindy-effect', 'antifragile', 'phase-transitions', 'commitment-bias', 'creative-destruction'],
  },
  {
    id: 'social-dynamics',
    name: 'Social Dynamics',
    l1Question: "Are other people's perceptions, actions, or cooperation part of this?",
    l2Question: "What's the social dynamic at play?",
    l2Options: [
      { text: 'Actions are about perception or status, not just outcomes', modelIds: ['signaling', 'mimetic-desire'] },
      { text: 'People are following others or deferring to authority', modelIds: ['social-proof', 'authority-bias'] },
    ],
    modelIds: ['reciprocation', 'social-proof', 'liking-bias', 'authority-bias', 'signaling', 'prisoners-dilemma', 'tragedy-of-the-commons', 'nash-equilibrium', 'mimetic-desire', 'commitment-bias'],
  },
  {
    id: 'risk-uncertainty',
    name: 'Risk & Uncertainty',
    l1Question: 'Is there a downside that matters, or real uncertainty about outcomes?',
    l2Question: "What's the risk profile?",
    l2Options: [
      { text: "Upside and downside aren't balanced", modelIds: ['asymmetric-risk'] },
      { text: 'The downside is catastrophic or irreversible', modelIds: ['precautionary-principle', 'extinction-events', 'black-swan'] },
    ],
    modelIds: ['skin-in-the-game', 'margin-of-safety', 'asymmetric-risk', 'precautionary-principle', 'ergodicity', 'extinction-events', 'black-swan'],
  },
  {
    id: 'resource-management',
    name: 'Resource Management',
    l1Question: 'Is there friction around time, energy, or getting started?',
    l2Question: "What's the resource problem?",
    l2Options: [
      { text: 'Work is expanding to fill available time', modelIds: ['parkinsons-law'] },
      { text: 'My estimates were too optimistic', modelIds: ['planning-fallacy'] },
    ],
    modelIds: ['cognitive-load', 'parkinsons-law', 'activation-energy', 'planning-fallacy'],
  },
  {
    id: 'systems-growth',
    name: 'Systems & Growth',
    l1Question: 'Does this involve something growing, compounding, or feeding back on itself?',
    l2Question: 'What system dynamic are you thinking about?',
    l2Options: [
      { text: 'Small inputs compounding into big outputs over time', modelIds: ['compound-interest', 'multiplicative-systems'] },
      { text: 'Loops that amplify or dampen themselves', modelIds: ['feedback-loops', 'tight-feedback-loops'] },
    ],
    modelIds: ['tight-feedback-loops', 'feedback-loops', 'redundancy', 'compound-interest', 'diversification', 'leverage-points', 'local-vs-global-maxima', 'power-law', 'economies-of-scale', 'network-effects', 'arbitrage', 'winner-take-most', 'critical-mass', 'economic-moats', 'multiplicative-systems', 'emergence', 'scale-free-networks', 'carrying-capacity', 'mr-market'],
  },
  {
    id: 'experience-perception',
    name: 'Experience & Perception',
    l1Question: 'Does how this feels, looks, or will be remembered matter?',
    l2Question: 'What aspect of perception or experience is at play?',
    l2Options: [
      { text: 'How something is remembered vs. how it actually was', modelIds: ['peak-end-rule', 'recency-bias'] },
      { text: 'How context or comparison shapes perception', modelIds: ['contrast-effect', 'anchoring', 'framing-effect'] },
    ],
    modelIds: ['default-effect', 'switching-costs', 'recency-bias', 'contrast-effect', 'anchoring', 'peak-end-rule', 'mere-exposure-effect', 'loss-aversion', 'framing-effect', 'endowment-effect', 'hedonic-adaptation', 'scarcity-vs-abundance'],
  },
  {
    id: 'competition-strategy',
    name: 'Competition & Strategy',
    l1Question: 'Are you competing with others or trying to maintain a position?',
    l2Question: "What's the competitive dynamic?",
    l2Options: [
      { text: 'I have to keep running just to stay in place', modelIds: ['red-queen-effect'] },
      { text: 'I should focus where I have relative advantage', modelIds: ['comparative-advantage'] },
    ],
    modelIds: ['red-queen-effect', 'sexual-selection', 'easterbrooks-paradox', 'comparative-advantage'],
  },
  {
    id: 'personal-performance',
    name: 'Personal Performance',
    l1Question: 'Is this about your own skill, growth, or motivation?',
    l2Question: "What's the performance challenge?",
    l2Options: [
      { text: 'My beliefs about ability are limiting me', modelIds: ['growth-vs-fixed-mindset'] },
      { text: 'I need to improve faster or more effectively', modelIds: ['deliberate-practice', 'desirable-difficulty'] },
    ],
    modelIds: ['growth-vs-fixed-mindset', 'deliberate-practice', 'desirable-difficulty', 'impostor-syndrome', 'scarcity-vs-abundance'],
  },
  {
    id: 'thinking-clearly',
    name: 'Thinking Clearly',
    l1Question: 'Could your own thinking be part of the problem here?',
    l2Question: 'What thinking trap or technique applies?',
    l2Options: [
      { text: 'I might be seeing what I want to see', modelIds: ['confirmation-bias'] },
      { text: "I'm overweighting what's easy to recall or vivid", modelIds: ['availability-bias', 'survivorship-bias'] },
    ],
    modelIds: ['occams-razor', 'multicausal', 'steelmanning', 'confirmation-bias', 'availability-bias', 'survivorship-bias', 'narrative-fallacy', 'hindsight-bias', 'abstraction-ladders', 'lollapalooza-effect', 'dunning-kruger-effect'],
  },
];

// Sample models for the expanded view
const sampleModels: MentalModel[] = [
  { id: 'eisenhower-matrix', name: 'Eisenhower Matrix', tags: ['decision-prioritization'], diagnosticQuestion: 'What should I focus on first?', keyInsight: 'Separate urgent from important.', redFlagPhrases: [], adjacentModels: ['pareto-principle', 'opportunity-cost'], whyAdjacent: {} },
  { id: 'pareto-principle', name: 'Pareto Principle', tags: ['decision-prioritization'], diagnosticQuestion: 'Which 20% drives 80% of results?', keyInsight: 'Outcomes are rarely evenly distributed.', redFlagPhrases: [], adjacentModels: ['eisenhower-matrix', 'leverage-points'], whyAdjacent: {} },
  { id: 'first-principles', name: 'First Principles', tags: ['decision-prioritization'], diagnosticQuestion: 'What do I know to be true here?', keyInsight: 'Break problems down to basic truths.', redFlagPhrases: [], adjacentModels: ['inversion', 'via-negativa'], whyAdjacent: {} },
  { id: 'inversion', name: 'Inversion', tags: ['decision-prioritization'], diagnosticQuestion: 'What would guarantee failure?', keyInsight: 'Systematically avoid failure.', redFlagPhrases: [], adjacentModels: ['first-principles', 'pre-mortem'], whyAdjacent: {} },
  { id: 'pre-mortem', name: 'Pre-mortem', tags: ['decision-prioritization'], diagnosticQuestion: 'If this fails, why?', keyInsight: 'Imagine future failure and work backward.', redFlagPhrases: [], adjacentModels: ['inversion', 'second-order-thinking'], whyAdjacent: {} },
  { id: 'opportunity-cost', name: 'Opportunity Cost', tags: ['decision-prioritization'], diagnosticQuestion: 'What am I giving up?', keyInsight: 'Every yes is a no to something else.', redFlagPhrases: [], adjacentModels: ['batna', 'expected-value'], whyAdjacent: {} },
  { id: 'incentives', name: 'Incentives', tags: ['unexpected-behavior'], diagnosticQuestion: 'What rewards this behavior?', keyInsight: 'Never think about what people say, think about what they do.', redFlagPhrases: [], adjacentModels: ['principal-agent-problem', 'moral-hazard'], whyAdjacent: {} },
  { id: 'hanlons-razor', name: "Hanlon's Razor", tags: ['unexpected-behavior'], diagnosticQuestion: 'Is this malice or incompetence?', keyInsight: 'Never attribute to malice what stupidity explains.', redFlagPhrases: [], adjacentModels: ['fundamental-attribution-error', 'empathy-gap'], whyAdjacent: {} },
  { id: 'feedback-loops', name: 'Feedback Loops', tags: ['systems-growth'], diagnosticQuestion: 'Is something amplifying itself?', keyInsight: 'Positive loops amplify, negative loops stabilize.', redFlagPhrases: [], adjacentModels: ['compound-interest', 'leverage-points'], whyAdjacent: {} },
  { id: 'compound-interest', name: 'Compound Interest', tags: ['systems-growth'], diagnosticQuestion: 'Does this compound over time?', keyInsight: 'Small consistent inputs produce outsized results.', redFlagPhrases: [], adjacentModels: ['feedback-loops', 'multiplicative-systems'], whyAdjacent: {} },
  { id: 'confirmation-bias', name: 'Confirmation Bias', tags: ['thinking-clearly'], diagnosticQuestion: 'Am I seeking disconfirming evidence?', keyInsight: 'We seek information that confirms what we already believe.', redFlagPhrases: [], adjacentModels: ['availability-bias', 'narrative-fallacy'], whyAdjacent: {} },
  { id: 'loss-aversion', name: 'Loss Aversion', tags: ['experience-perception'], diagnosticQuestion: 'Am I overweighting potential losses?', keyInsight: 'Losses loom larger than equivalent gains.', redFlagPhrases: [], adjacentModels: ['endowment-effect', 'sunk-cost-fallacy'], whyAdjacent: {} },
];

// Tag color mapping
const tagColors: Record<string, { bg: string; text: string; border: string; light: string }> = {
  'decision-prioritization': { bg: 'bg-indigo-500', text: 'text-indigo-700', border: 'border-indigo-200', light: 'bg-indigo-50' },
  'unexpected-behavior': { bg: 'bg-amber-500', text: 'text-amber-700', border: 'border-amber-200', light: 'bg-amber-50' },
  'incomplete-information': { bg: 'bg-blue-500', text: 'text-blue-700', border: 'border-blue-200', light: 'bg-blue-50' },
  'change-disruption': { bg: 'bg-orange-500', text: 'text-orange-700', border: 'border-orange-200', light: 'bg-orange-50' },
  'social-dynamics': { bg: 'bg-pink-500', text: 'text-pink-700', border: 'border-pink-200', light: 'bg-pink-50' },
  'risk-uncertainty': { bg: 'bg-red-500', text: 'text-red-700', border: 'border-red-200', light: 'bg-red-50' },
  'resource-management': { bg: 'bg-green-500', text: 'text-green-700', border: 'border-green-200', light: 'bg-green-50' },
  'systems-growth': { bg: 'bg-purple-500', text: 'text-purple-700', border: 'border-purple-200', light: 'bg-purple-50' },
  'experience-perception': { bg: 'bg-cyan-500', text: 'text-cyan-700', border: 'border-cyan-200', light: 'bg-cyan-50' },
  'competition-strategy': { bg: 'bg-rose-500', text: 'text-rose-700', border: 'border-rose-200', light: 'bg-rose-50' },
  'personal-performance': { bg: 'bg-teal-500', text: 'text-teal-700', border: 'border-teal-200', light: 'bg-teal-50' },
  'thinking-clearly': { bg: 'bg-violet-500', text: 'text-violet-700', border: 'border-violet-200', light: 'bg-violet-50' },
};

export function TagClusterView({ onModelSelect }: TagClusterViewProps) {
  const [expandedTag, setExpandedTag] = useState<Tag | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const cyRef = useRef<cytoscape.Core | null>(null);

  // Filter tags based on search
  const filteredTags = useMemo(() => {
    if (!searchQuery.trim()) return sampleTags;
    const query = searchQuery.toLowerCase();
    return sampleTags.filter(
      (tag) =>
        tag.name.toLowerCase().includes(query) ||
        tag.l1Question.toLowerCase().includes(query) ||
        tag.modelIds.some((id) => id.replace(/-/g, ' ').includes(query))
    );
  }, [searchQuery]);

  // Get models for expanded tag
  const expandedModels = useMemo(() => {
    if (!expandedTag) return [];
    return sampleModels.filter((m) => expandedTag.modelIds.includes(m.id));
  }, [expandedTag]);

  // Create Cytoscape elements for expanded view
  const expandedElements = useMemo(() => {
    if (!expandedTag) return [];

    const nodes: cytoscape.ElementDefinition[] = expandedModels.map((model) => ({
      data: {
        id: model.id,
        label: model.name,
      },
    }));

    // Create a set of model IDs that actually have nodes in the graph
    const nodeIds = new Set(expandedModels.map((m) => m.id));

    // Create edges based on adjacentModels
    const edges: cytoscape.ElementDefinition[] = [];
    const addedEdges = new Set<string>();

    expandedModels.forEach((model) => {
      model.adjacentModels.forEach((adjId) => {
        // Only create edge if target node actually exists in the graph
        if (nodeIds.has(adjId)) {
          const edgeKey = [model.id, adjId].sort().join('-');
          if (!addedEdges.has(edgeKey)) {
            addedEdges.add(edgeKey);
            edges.push({
              data: {
                id: `edge-${edgeKey}`,
                source: model.id,
                target: adjId,
              },
            });
          }
        }
      });
    });

    return [...nodes, ...edges];
  }, [expandedTag, expandedModels]);

  // Layout for expanded view
  const expandedLayout = useMemo(
    () => ({
      name: 'cose',
      idealEdgeLength: 80,
      nodeOverlap: 20,
      fit: true,
      padding: 30,
      randomize: false,
      componentSpacing: 80,
      nodeRepulsion: 400000,
      edgeElasticity: 100,
      animate: true,
      animationDuration: 400,
    }),
    []
  );

  // Handle model click in expanded view
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
  }, [onModelSelect, expandedTag]);

  const getTagColor = (tagId: string) => {
    return tagColors[tagId] || { bg: 'bg-gray-500', text: 'text-gray-700', border: 'border-gray-200', light: 'bg-gray-50' };
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search tags or models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Tag Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTags.map((tag) => {
          const colors = getTagColor(tag.id);
          return (
            <div
              key={tag.id}
              className={`bg-white rounded-lg shadow-md border ${colors.border} hover:shadow-lg transition-shadow cursor-pointer overflow-hidden`}
              onClick={() => setExpandedTag(tag)}
            >
              <div className={`h-2 ${colors.bg}`} />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-semibold ${colors.text}`}>{tag.name}</h3>
                  <span className={`px-2 py-0.5 text-xs font-medium ${colors.light} ${colors.text} rounded-full`}>
                    {tag.modelIds.length}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{tag.l1Question}</p>
                <div className="mt-3 flex items-center text-xs text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Click to explore
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Tag Modal */}
      {expandedTag && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className={`p-4 ${getTagColor(expandedTag.id).light} border-b`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-xl font-bold ${getTagColor(expandedTag.id).text}`}>
                    {expandedTag.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{expandedTag.l1Question}</p>
                </div>
                <button
                  onClick={() => setExpandedTag(null)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex h-[60vh]">
              {/* Graph View */}
              <div className="w-1/2 border-r border-gray-200">
                {expandedElements.length > 0 ? (
                  <CytoscapeComponent
                    elements={expandedElements}
                    style={{ width: '100%', height: '100%' }}
                    stylesheet={graphStyles}
                    layout={expandedLayout}
                    cy={(cy) => {
                      cyRef.current = cy;
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <p>No models available for visualization</p>
                  </div>
                )}
              </div>

              {/* Model List */}
              <div className="w-1/2 overflow-y-auto">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Models in this category ({expandedTag.modelIds.length})
                  </h3>
                  <div className="space-y-2">
                    {expandedTag.modelIds.map((modelId) => {
                      const model = sampleModels.find((m) => m.id === modelId);
                      return (
                        <div
                          key={modelId}
                          className="p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 cursor-pointer transition-colors border border-gray-100 hover:border-indigo-200"
                          onClick={() => {
                            setExpandedTag(null);
                            onModelSelect(modelId);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">
                              {model?.name || modelId.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                            </span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                          {model?.diagnosticQuestion && (
                            <p className="text-sm text-gray-500 mt-1 italic">"{model.diagnosticQuestion}"</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Click on any model to explore its network
                </p>
                <button
                  onClick={() => setExpandedTag(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TagClusterView;
