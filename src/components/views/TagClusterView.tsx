import React, { useState, useMemo, useRef, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { Tag, MentalModel } from '../../types';

interface TagClusterViewProps {
  onModelSelect: (modelId: string) => void;
}

// Apple-inspired minimal graph styles - Tag Cluster
const graphStyles: cytoscape.StylesheetStyle[] = [
  // Compact nodes - clean circles
  {
    selector: 'node',
    style: {
      'background-color': '#ffffff',
      'background-opacity': 0.85,
      'label': 'data(label)',
      'color': 'rgba(255, 255, 255, 0.85)',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'font-size': '10px',
      'font-family': '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
      'font-weight': 500,
      'text-margin-y': 8,
      'width': 36,
      'height': 36,
      'text-wrap': 'wrap',
      'text-max-width': '75px',
      'text-outline-color': 'rgba(0, 0, 0, 0.75)',
      'text-outline-width': 1.5,
      'border-width': 0,
      'shadow-blur': 14,
      'shadow-color': 'rgba(0, 0, 0, 0.18)',
      'shadow-opacity': 1,
      'shadow-offset-x': 0,
      'shadow-offset-y': 3,
      'transition-property': 'background-color, width, height, shadow-blur, shadow-offset-y',
      'transition-duration': 250,
      'transition-timing-function': 'ease-out',
    } as any,
  },
  // Hover state - gentle lift
  {
    selector: 'node:hover',
    style: {
      'background-color': '#ffffff',
      'cursor': 'pointer',
      'width': 42,
      'height': 42,
      'shadow-blur': 20,
      'shadow-color': 'rgba(0, 0, 0, 0.15)',
      'shadow-offset-y': 6,
    } as any,
  },
  // Edge styles - fine lines
  {
    selector: 'edge',
    style: {
      'width': 1,
      'line-color': 'rgba(255, 255, 255, 0.18)',
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
      'width': 1.5,
      'line-color': 'rgba(0, 122, 255, 0.45)',
      'z-index': 999,
    } as any,
  },
];

// Sample tags data
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

// Sample models for expanded view
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

// Tag color mapping - vibrant cosmic colors
const tagColors: Record<string, { accent: string; glow: string; bg: string }> = {
  'decision-prioritization': { accent: '#00f5ff', glow: 'rgba(0, 245, 255, 0.3)', bg: 'rgba(0, 245, 255, 0.1)' },
  'unexpected-behavior': { accent: '#ffa500', glow: 'rgba(255, 165, 0, 0.3)', bg: 'rgba(255, 165, 0, 0.1)' },
  'incomplete-information': { accent: '#4da6ff', glow: 'rgba(77, 166, 255, 0.3)', bg: 'rgba(77, 166, 255, 0.1)' },
  'change-disruption': { accent: '#ff6b35', glow: 'rgba(255, 107, 53, 0.3)', bg: 'rgba(255, 107, 53, 0.1)' },
  'social-dynamics': { accent: '#ff00aa', glow: 'rgba(255, 0, 170, 0.3)', bg: 'rgba(255, 0, 170, 0.1)' },
  'risk-uncertainty': { accent: '#ff4757', glow: 'rgba(255, 71, 87, 0.3)', bg: 'rgba(255, 71, 87, 0.1)' },
  'resource-management': { accent: '#10b981', glow: 'rgba(16, 185, 129, 0.3)', bg: 'rgba(16, 185, 129, 0.1)' },
  'systems-growth': { accent: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.3)', bg: 'rgba(139, 92, 246, 0.1)' },
  'experience-perception': { accent: '#06b6d4', glow: 'rgba(6, 182, 212, 0.3)', bg: 'rgba(6, 182, 212, 0.1)' },
  'competition-strategy': { accent: '#f43f5e', glow: 'rgba(244, 63, 94, 0.3)', bg: 'rgba(244, 63, 94, 0.1)' },
  'personal-performance': { accent: '#14b8a6', glow: 'rgba(20, 184, 166, 0.3)', bg: 'rgba(20, 184, 166, 0.1)' },
  'thinking-clearly': { accent: '#a78bfa', glow: 'rgba(167, 139, 250, 0.3)', bg: 'rgba(167, 139, 250, 0.1)' },
};

export function TagClusterView({ onModelSelect }: TagClusterViewProps) {
  const [expandedTag, setExpandedTag] = useState<Tag | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

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

  const expandedModels = useMemo(() => {
    if (!expandedTag) return [];
    return sampleModels.filter((m) => expandedTag.modelIds.includes(m.id));
  }, [expandedTag]);

  const expandedElements = useMemo(() => {
    if (!expandedTag) return [];

    const nodes: cytoscape.ElementDefinition[] = expandedModels.map((model) => ({
      data: {
        id: model.id,
        label: model.name,
      },
    }));

    const nodeIds = new Set(expandedModels.map((m) => m.id));
    const edges: cytoscape.ElementDefinition[] = [];
    const addedEdges = new Set<string>();

    expandedModels.forEach((model) => {
      model.adjacentModels.forEach((adjId) => {
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

  const expandedLayout = useMemo(
    () => ({
      name: 'cose',
      idealEdgeLength: 90,
      nodeOverlap: 20,
      fit: true,
      padding: 35,
      randomize: false,
      componentSpacing: 90,
      nodeRepulsion: 450000,
      edgeElasticity: 100,
      animate: true,
      animationDuration: 500,
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
  }, [onModelSelect, expandedTag]);

  const getTagColor = (tagId: string) => {
    return tagColors[tagId] || { accent: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.3)', bg: 'rgba(139, 92, 246, 0.1)' };
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search tags or models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl text-sm"
            style={{
              background: 'rgba(26, 26, 46, 0.8)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#f0f0f5',
            }}
          />
          <svg
            className="absolute left-4 top-3.5 h-5 w-5"
            style={{ color: '#6b6b80' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Tag Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredTags.map((tag, index) => {
          const colors = getTagColor(tag.id);
          const isHovered = hoveredTag === tag.id;

          return (
            <div
              key={tag.id}
              className="relative overflow-hidden cursor-pointer transition-all duration-300 animate-fade-in-up"
              style={{
                background: isHovered
                  ? `linear-gradient(145deg, ${colors.bg}, rgba(26, 26, 46, 0.9))`
                  : 'linear-gradient(145deg, rgba(18, 18, 26, 0.9), rgba(26, 26, 46, 0.7))',
                borderRadius: '20px',
                border: `1px solid ${isHovered ? colors.accent : 'rgba(139, 92, 246, 0.2)'}`,
                boxShadow: isHovered ? `0 0 30px ${colors.glow}` : 'none',
                transform: isHovered ? 'translateY(-4px)' : 'none',
                animationDelay: `${index * 0.05}s`,
              }}
              onClick={() => setExpandedTag(tag)}
              onMouseEnter={() => setHoveredTag(tag.id)}
              onMouseLeave={() => setHoveredTag(null)}
            >
              {/* Accent bar */}
              <div className="h-1 transition-all duration-300" style={{
                background: isHovered ? colors.accent : `linear-gradient(90deg, ${colors.accent}50, transparent)`,
                boxShadow: isHovered ? `0 0 20px ${colors.accent}` : 'none',
              }} />

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-base transition-colors duration-300" style={{
                    color: isHovered ? colors.accent : '#f0f0f5',
                  }}>
                    {tag.name}
                  </h3>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full" style={{
                    background: colors.bg,
                    color: colors.accent,
                    border: `1px solid ${colors.accent}40`,
                  }}>
                    {tag.modelIds.length}
                  </span>
                </div>

                <p className="text-sm leading-relaxed line-clamp-2" style={{ color: '#a0a0b5' }}>
                  {tag.l1Question}
                </p>

                <div className="mt-4 flex items-center text-xs font-medium transition-colors duration-300" style={{
                  color: isHovered ? colors.accent : '#6b6b80',
                }}>
                  <span>Explore models</span>
                  <svg
                    className="w-4 h-4 ml-1 transition-transform duration-300"
                    style={{ transform: isHovered ? 'translateX(4px)' : 'none' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Ambient glow */}
              {isHovered && (
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: `radial-gradient(circle at 50% 0%, ${colors.glow}, transparent 70%)`,
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Expanded Tag Modal */}
      {expandedTag && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{
          background: 'rgba(10, 10, 15, 0.9)',
          backdropFilter: 'blur(8px)',
        }}>
          <div className="w-full max-w-5xl max-h-[90vh] overflow-hidden animate-scale-in" style={{
            background: 'linear-gradient(145deg, #12121a, #1a1a2e)',
            borderRadius: '28px',
            border: `1px solid ${getTagColor(expandedTag.id).accent}40`,
            boxShadow: `0 0 60px ${getTagColor(expandedTag.id).glow}`,
          }}>
            {/* Modal Header */}
            <div className="p-6 border-b" style={{
              borderColor: 'rgba(139, 92, 246, 0.2)',
              background: getTagColor(expandedTag.id).bg,
            }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: getTagColor(expandedTag.id).accent }}>
                    {expandedTag.name}
                  </h2>
                  <p className="text-sm mt-1" style={{ color: '#a0a0b5' }}>{expandedTag.l1Question}</p>
                </div>
                <button
                  onClick={() => setExpandedTag(null)}
                  className="p-2 rounded-xl transition-all duration-300"
                  style={{
                    background: 'rgba(36, 36, 56, 0.8)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ff4757';
                    e.currentTarget.style.background = 'rgba(255, 71, 87, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.background = 'rgba(36, 36, 56, 0.8)';
                  }}
                >
                  <svg className="w-6 h-6" style={{ color: '#a0a0b5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex h-[60vh]">
              {/* Graph View */}
              <div className="w-1/2 relative" style={{ borderRight: '1px solid rgba(139, 92, 246, 0.2)' }}>
                {/* Ambient glow */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: `
                    radial-gradient(ellipse 60% 40% at 50% 50%, ${getTagColor(expandedTag.id).glow}, transparent 60%)
                  `,
                }} />

                {expandedElements.length > 0 ? (
                  <CytoscapeComponent
                    elements={expandedElements}
                    style={{ width: '100%', height: '100%' }}
                    stylesheet={graphStyles}
                    layout={expandedLayout}
                    cy={(cy) => {
                      cyRef.current = cy;

                      cy.on('mouseover', 'node', (evt) => {
                        evt.target.connectedEdges().addClass('highlighted');
                      });

                      cy.on('mouseout', 'node', (evt) => {
                        evt.target.connectedEdges().removeClass('highlighted');
                      });
                    }}
                    minZoom={0.5}
                    maxZoom={2}
                    boxSelectionEnabled={false}
                    autounselectify={true}
                    {...{ wheelSensitivity: 0.2 } as any}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full" style={{ color: '#6b6b80' }}>
                    <p>No models available for visualization</p>
                  </div>
                )}
              </div>

              {/* Model List */}
              <div className="w-1/2 overflow-y-auto">
                <div className="p-5">
                  <h3 className="font-semibold mb-4" style={{ color: '#a0a0b5' }}>
                    Models in this category ({expandedTag.modelIds.length})
                  </h3>
                  <div className="space-y-2">
                    {expandedTag.modelIds.map((modelId) => {
                      const model = sampleModels.find((m) => m.id === modelId);
                      return (
                        <div
                          key={modelId}
                          className="p-4 rounded-xl cursor-pointer transition-all duration-300"
                          style={{
                            background: 'rgba(36, 36, 56, 0.5)',
                            border: '1px solid rgba(139, 92, 246, 0.15)',
                          }}
                          onClick={() => {
                            setExpandedTag(null);
                            onModelSelect(modelId);
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = getTagColor(expandedTag.id).bg;
                            e.currentTarget.style.borderColor = getTagColor(expandedTag.id).accent;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(36, 36, 56, 0.5)';
                            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.15)';
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium" style={{ color: '#f0f0f5' }}>
                              {model?.name || modelId.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                            </span>
                            <svg className="w-4 h-4" style={{ color: '#6b6b80' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                          {model?.diagnosticQuestion && (
                            <p className="text-sm mt-1 italic" style={{ color: getTagColor(expandedTag.id).accent }}>
                              "{model.diagnosticQuestion}"
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t" style={{
              borderColor: 'rgba(139, 92, 246, 0.2)',
              background: 'rgba(10, 10, 15, 0.5)',
            }}>
              <div className="flex justify-between items-center">
                <p className="text-sm" style={{ color: '#6b6b80' }}>
                  Click on any model to explore its network
                </p>
                <button
                  onClick={() => setExpandedTag(null)}
                  className="px-5 py-2.5 rounded-xl font-medium transition-all duration-300 btn-secondary"
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
