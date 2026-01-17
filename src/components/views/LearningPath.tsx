import React, { useState, useMemo, useRef, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { LearningPath as LearningPathType, MentalModel } from '../../types';

interface LearningPathProps {
  onModelSelect: (modelId: string) => void;
}

// Neural Constellation graph styles - Learning Path variant
const graphStyles: cytoscape.StylesheetStyle[] = [
  {
    selector: 'node',
    style: {
      'background-color': '#8b5cf6',
      'background-opacity': 0.9,
      'label': 'data(label)',
      'color': '#f0f0f5',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'font-size': '10px',
      'font-family': 'Sora, sans-serif',
      'font-weight': 500,
      'text-margin-y': 10,
      'width': 42,
      'height': 42,
      'text-wrap': 'wrap',
      'text-max-width': '80px',
      'text-outline-color': '#0a0a0f',
      'text-outline-width': 2,
      'border-width': 2,
      'border-color': '#00f5ff',
      'border-opacity': 0.5,
      'transition-property': 'background-color, border-color, width, height',
      'transition-duration': 300,
    } as any,
  },
  {
    selector: 'node.focus',
    style: {
      'background-color': '#00f5ff',
      'background-opacity': 1,
      'width': 65,
      'height': 65,
      'font-weight': 700,
      'font-size': '12px',
      'border-width': 4,
      'border-color': '#ffffff',
      'border-opacity': 1,
      'text-margin-y': 14,
    } as any,
  },
  {
    selector: 'node:hover',
    style: {
      'background-color': '#ff00aa',
      'border-color': '#ffffff',
      'border-width': 2,
      'cursor': 'pointer',
      'width': 48,
      'height': 48,
    } as any,
  },
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#8b5cf650',
      'curve-style': 'bezier',
      'line-opacity': 0.6,
    } as any,
  },
  {
    selector: 'edge.highlighted',
    style: {
      'width': 3,
      'line-color': '#00f5ff',
      'line-opacity': 1,
    } as any,
  },
];

// Sample learning paths from specification
const sampleLearningPaths: LearningPathType[] = [
  {
    id: 'decision-making-fundamentals',
    name: 'Decision-Making Fundamentals',
    description: 'Core models for making better choices',
    modelSequence: [
      'opportunity-cost',
      'expected-value',
      'reversibility',
      'regret-minimization',
      'batna',
      'pre-mortem',
      'inversion',
      'first-principles',
    ],
  },
  {
    id: 'understanding-behavior',
    name: 'Why People Do What They Do',
    description: 'Models for understanding human behavior',
    modelSequence: [
      'incentives',
      'principal-agent-problem',
      'revealed-preference',
      'hanlons-razor',
      'fundamental-attribution-error',
      'empathy-gap',
      'hyperbolic-discounting',
      'mimetic-desire',
    ],
  },
  {
    id: 'thinking-traps',
    name: 'Thinking Traps to Avoid',
    description: 'Common cognitive biases and how to counter them',
    modelSequence: [
      'confirmation-bias',
      'availability-bias',
      'survivorship-bias',
      'narrative-fallacy',
      'hindsight-bias',
      'dunning-kruger-effect',
      'sunk-cost-fallacy',
      'loss-aversion',
    ],
  },
  {
    id: 'systems-and-scale',
    name: 'How Systems Grow and Compound',
    description: 'Understanding growth, feedback, and network dynamics',
    modelSequence: [
      'feedback-loops',
      'compound-interest',
      'network-effects',
      'critical-mass',
      'power-law',
      'winner-take-most',
      'leverage-points',
      'emergence',
    ],
  },
  {
    id: 'risk-and-uncertainty',
    name: 'Navigating Risk and Uncertainty',
    description: 'Models for dealing with the unknown',
    modelSequence: [
      'asymmetric-risk',
      'margin-of-safety',
      'precautionary-principle',
      'black-swan',
      'antifragile',
      'barbell-strategy',
      'optionality',
      'ergodicity',
    ],
  },
  {
    id: 'influence-and-persuasion',
    name: 'Influence and Social Dynamics',
    description: 'Understanding how people influence each other',
    modelSequence: [
      'social-proof',
      'authority-bias',
      'reciprocation',
      'liking-bias',
      'signaling',
      'commitment-bias',
      'framing-effect',
      'anchoring',
    ],
  },
];

// Sample models data
const sampleModels: MentalModel[] = [
  { id: 'opportunity-cost', name: 'Opportunity Cost', tags: ['decision-prioritization'], diagnosticQuestion: 'What am I giving up by choosing this?', keyInsight: 'The true cost of anything is what you sacrifice to get it. Every yes is a no to something else.', redFlagPhrases: ['What else could I do with this?', 'Is this the best use of...', 'Trade-offs'], adjacentModels: ['comparative-advantage', 'batna', 'expected-value', 'sunk-cost-fallacy'], whyAdjacent: { 'comparative-advantage': 'Opportunity cost applied to strengths', 'batna': 'Your alternative defines opportunity cost', 'expected-value': 'Compare expected values of alternatives', 'sunk-cost-fallacy': 'Ignores opportunity cost by focusing on past investment' } },
  { id: 'expected-value', name: 'Expected Value', tags: ['decision-prioritization'], diagnosticQuestion: 'What is the probability-weighted outcome?', keyInsight: 'Multiply probability by payoff for each outcome. Choose the highest expected value - but watch for ruin.', redFlagPhrases: ['What are the odds?', 'Risk vs. reward', 'Probability times impact'], adjacentModels: ['base-rates', 'bayes-theorem', 'asymmetric-risk', 'regret-minimization'], whyAdjacent: { 'base-rates': 'Feeds probability estimates', 'bayes-theorem': 'Updates probability with new information', 'asymmetric-risk': 'Adjusts for non-linear payoffs', 'regret-minimization': 'EV does not capture emotional weight' } },
  { id: 'reversibility', name: 'Reversibility', tags: ['decision-prioritization'], diagnosticQuestion: 'Can this decision be undone?', keyInsight: 'Reversible decisions deserve less deliberation. Irreversible ones deserve more.', redFlagPhrases: ['Can we undo this?', 'Point of no return', 'One-way door'], adjacentModels: ['optionality', 'asymmetric-risk', 'precautionary-principle', 'regret-minimization'], whyAdjacent: { 'optionality': 'Both address preserving future flexibility', 'asymmetric-risk': 'Frames why reversibility matters', 'precautionary-principle': 'Avoid irreversible downside', 'regret-minimization': 'Irreversible choices carry more regret risk' } },
  { id: 'regret-minimization', name: 'Regret Minimization', tags: ['decision-prioritization'], diagnosticQuestion: 'Which choice will I regret least when I am 80?', keyInsight: 'Project yourself to the end of life. Regret for inaction often exceeds regret for action.', redFlagPhrases: ['Will I regret not trying?', 'What would future me think?', 'Playing it safe'], adjacentModels: ['reversibility', 'asymmetric-risk', 'loss-aversion', 'expected-value'], whyAdjacent: { 'reversibility': 'Irreversible choices carry more regret risk', 'asymmetric-risk': 'Regret is often asymmetric', 'loss-aversion': 'Explains why regret weighs heavily', 'expected-value': 'Regret minimization adjusts for emotional outcomes' } },
  { id: 'batna', name: 'BATNA', tags: ['decision-prioritization'], diagnosticQuestion: 'What is my best alternative if this does not work out?', keyInsight: 'Your negotiating power comes from your alternatives. A strong BATNA lets you walk away.', redFlagPhrases: ['What is plan B?', 'We have no other options', 'They need us more than we need them'], adjacentModels: ['opportunity-cost', 'asymmetric-risk', 'information-asymmetry', 'leverage-points'], whyAdjacent: { 'opportunity-cost': 'Your BATNA defines your opportunity cost', 'asymmetric-risk': 'Weak BATNA creates asymmetric vulnerability', 'information-asymmetry': 'Others may not know your true BATNA', 'leverage-points': 'BATNA is a key leverage point in negotiation' } },
  { id: 'pre-mortem', name: 'Pre-mortem', tags: ['decision-prioritization'], diagnosticQuestion: 'If this fails, why will it have failed?', keyInsight: 'Imagine future failure and work backward. It surfaces risks that optimism obscures.', redFlagPhrases: ['What could go wrong?', 'Devil\'s advocate', 'Stress test'], adjacentModels: ['inversion', 'second-order-thinking', 'unintended-consequences', 'hindsight-bias'], whyAdjacent: { 'inversion': 'Both approach problems from the failure direction', 'second-order-thinking': 'Pre-mortems force downstream thinking', 'unintended-consequences': 'Surfaces unintended risks', 'hindsight-bias': 'Pre-mortems prevent I knew it all along' } },
  { id: 'inversion', name: 'Inversion', tags: ['decision-prioritization'], diagnosticQuestion: 'What would guarantee failure? How do I avoid that?', keyInsight: 'Instead of seeking success, systematically avoid failure. Often easier and more reliable.', redFlagPhrases: ['Flip it around', 'What is the opposite?', 'Avoid the worst'], adjacentModels: ['pre-mortem', 'via-negativa', 'second-order-thinking', 'first-principles'], whyAdjacent: { 'pre-mortem': 'Both approach from the failure direction', 'via-negativa': 'Inversion applied to action - remove vs. add', 'second-order-thinking': 'Inverted thinking reveals hidden consequences', 'first-principles': 'Both reframe problems fundamentally' } },
  { id: 'first-principles', name: 'First Principles', tags: ['decision-prioritization'], diagnosticQuestion: 'What do I know to be fundamentally true here?', keyInsight: 'Break problems down to basic truths and reason up. Escapes inherited assumptions.', redFlagPhrases: ['Everyone does it this way', 'That is just how it is', 'Start from scratch'], adjacentModels: ['inversion', 'via-negativa', 'second-order-thinking', 'abstraction-ladders'], whyAdjacent: { 'inversion': 'Both reframe problems fundamentally', 'via-negativa': 'Both question assumptions by stripping away', 'second-order-thinking': 'First principles enables deeper analysis', 'abstraction-ladders': 'Moving down the ladder to fundamentals' } },
  { id: 'incentives', name: 'Incentives', tags: ['unexpected-behavior'], diagnosticQuestion: 'What behavior is this system actually rewarding?', keyInsight: 'Never, ever, think about something else when you should be thinking about the power of incentives.', redFlagPhrases: ['Why would they do that?', 'Follow the money', 'Skin in the game'], adjacentModels: ['principal-agent-problem', 'moral-hazard', 'revealed-preference', 'goodharts-law'], whyAdjacent: { 'principal-agent-problem': 'Misaligned incentives between parties', 'moral-hazard': 'Incentives to take risks when insulated', 'revealed-preference': 'Actions reveal true incentives', 'goodharts-law': 'Measure becomes the target, distorting incentives' } },
  { id: 'feedback-loops', name: 'Feedback Loops', tags: ['systems-growth'], diagnosticQuestion: 'Is there a cycle that amplifies or dampens itself?', keyInsight: 'Positive loops amplify change. Negative loops restore equilibrium. Identify which is operating.', redFlagPhrases: ['Vicious cycle', 'Virtuous cycle', 'Snowball effect', 'Self-correcting'], adjacentModels: ['compound-interest', 'leverage-points', 'tight-feedback-loops', 'emergence'], whyAdjacent: { 'compound-interest': 'Compound interest is a positive feedback loop', 'leverage-points': 'Feedback loops are key leverage points', 'tight-feedback-loops': 'Speed of feedback affects system behavior', 'emergence': 'Feedback loops drive emergent behavior' } },
  { id: 'compound-interest', name: 'Compound Interest', tags: ['systems-growth'], diagnosticQuestion: 'Does this benefit from compounding over time?', keyInsight: 'Small, consistent inputs compound into outsized results. Time is the key variable.', redFlagPhrases: ['Exponential growth', 'Gets better over time', 'Snowball', 'Eighth wonder'], adjacentModels: ['feedback-loops', 'multiplicative-systems', 'power-law', 'leverage-points'], whyAdjacent: { 'feedback-loops': 'Compound interest is a positive feedback loop', 'multiplicative-systems': 'Compounding is multiplicative growth', 'power-law': 'Compounding produces power-law distributions', 'leverage-points': 'Early investments leverage time' } },
  { id: 'confirmation-bias', name: 'Confirmation Bias', tags: ['thinking-clearly'], diagnosticQuestion: 'Am I actively seeking disconfirming evidence?', keyInsight: 'We naturally seek information that confirms what we already believe and dismiss contradictions.', redFlagPhrases: ['See? I was right', 'That proves my point', 'Ignore the outliers'], adjacentModels: ['availability-bias', 'narrative-fallacy', 'steelmanning', 'first-principles'], whyAdjacent: { 'availability-bias': 'Both filter information selectively', 'narrative-fallacy': 'Both reinforce existing beliefs', 'steelmanning': 'Counters confirmation bias by strengthening opposing views', 'first-principles': 'Bypasses existing beliefs entirely' } },
  { id: 'asymmetric-risk', name: 'Asymmetric Risk', tags: ['risk-uncertainty'], diagnosticQuestion: 'Is the upside proportional to the downside?', keyInsight: 'Seek asymmetry where the potential upside far exceeds the potential downside.', redFlagPhrases: ['Huge upside, limited downside', 'Risk/reward ratio', 'Asymmetric bet'], adjacentModels: ['expected-value', 'margin-of-safety', 'optionality', 'barbell-strategy'], whyAdjacent: { 'expected-value': 'Asymmetry distorts expected value calculations', 'margin-of-safety': 'Creates asymmetric downside protection', 'optionality': 'Options are asymmetric by design', 'barbell-strategy': 'Exploits asymmetric risk profiles' } },
  { id: 'social-proof', name: 'Social Proof', tags: ['social-dynamics'], diagnosticQuestion: 'Am I doing this because others are doing it?', keyInsight: 'We determine correct behavior by observing what others do. Powerful but dangerous.', redFlagPhrases: ['Everyone is doing it', 'Popular opinion', 'Trending', 'Best seller'], adjacentModels: ['authority-bias', 'mimetic-desire', 'bandwagon-effect', 'herd-behavior'], whyAdjacent: { 'authority-bias': 'Both involve deferring to others', 'mimetic-desire': 'We want what others want', 'bandwagon-effect': 'Social proof drives bandwagons', 'herd-behavior': 'Social proof creates herds' } },
];

export function LearningPath({ onModelSelect }: LearningPathProps) {
  const [selectedPath, setSelectedPath] = useState<LearningPathType>(sampleLearningPaths[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedModels, setCompletedModels] = useState<Set<string>>(new Set());
  const cyRef = useRef<cytoscape.Core | null>(null);

  const currentModelId = selectedPath.modelSequence[currentIndex];
  const currentModel = useMemo(() => {
    return sampleModels.find((m) => m.id === currentModelId) || null;
  }, [currentModelId]);

  const egoModels = useMemo(() => {
    if (!currentModel) return [];
    const adjacentIds = currentModel.adjacentModels.slice(0, 4);
    const networkModels = [currentModel];

    adjacentIds.forEach((adjId) => {
      const adjModel = sampleModels.find((m) => m.id === adjId);
      if (adjModel) {
        networkModels.push(adjModel);
      }
    });

    return networkModels;
  }, [currentModel]);

  const elements = useMemo(() => {
    if (!currentModel) return [];

    const nodes: cytoscape.ElementDefinition[] = egoModels.map((model) => ({
      data: {
        id: model.id,
        label: model.name,
      },
      classes: model.id === currentModel.id ? 'focus' : '',
    }));

    const edges: cytoscape.ElementDefinition[] = currentModel.adjacentModels
      .filter((adjId) => egoModels.some((m) => m.id === adjId))
      .map((adjId) => ({
        data: {
          id: `edge-${currentModel.id}-${adjId}`,
          source: currentModel.id,
          target: adjId,
        },
      }));

    return [...nodes, ...edges];
  }, [egoModels, currentModel]);

  const layout = useMemo(
    () => ({
      name: 'concentric',
      concentric: (node: any) => {
        return node.id() === currentModelId ? 2 : 1;
      },
      levelWidth: () => 1,
      minNodeSpacing: 50,
      animate: true,
      animationDuration: 400,
      fit: true,
      padding: 40,
    }),
    [currentModelId]
  );

  const handlePathChange = (pathId: string) => {
    const path = sampleLearningPaths.find((p) => p.id === pathId);
    if (path) {
      setSelectedPath(path);
      setCurrentIndex(0);
      setCompletedModels(new Set());
    }
  };

  const goToNext = () => {
    if (currentIndex < selectedPath.modelSequence.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const markComplete = () => {
    setCompletedModels((prev) => new Set([...prev, currentModelId]));
    goToNext();
  };

  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.on('tap', 'node', (evt) => {
        const nodeId = evt.target.id();
        if (nodeId !== currentModelId) {
          onModelSelect(nodeId);
        }
      });

      cyRef.current.on('mouseover', 'node', (evt) => {
        evt.target.connectedEdges().addClass('highlighted');
      });

      cyRef.current.on('mouseout', 'node', (evt) => {
        evt.target.connectedEdges().removeClass('highlighted');
      });
    }

    return () => {
      if (cyRef.current) {
        cyRef.current.removeListener('tap');
        cyRef.current.removeListener('mouseover');
        cyRef.current.removeListener('mouseout');
      }
    };
  }, [currentModelId, onModelSelect]);

  const progressPercentage = ((currentIndex + 1) / selectedPath.modelSequence.length) * 100;

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-4">
      {/* Path Selector */}
      <div className="flex items-center gap-4 flex-wrap">
        <label className="font-medium" style={{ color: '#a0a0b5' }}>Learning Path:</label>
        <select
          value={selectedPath.id}
          onChange={(e) => handlePathChange(e.target.value)}
          className="px-4 py-2 rounded-xl text-sm"
          style={{
            background: 'rgba(26, 26, 46, 0.8)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: '#f0f0f5',
          }}
        >
          {sampleLearningPaths.map((path) => (
            <option key={path.id} value={path.id}>
              {path.name}
            </option>
          ))}
        </select>
        <p className="text-sm" style={{ color: '#6b6b80' }}>{selectedPath.description}</p>
      </div>

      {/* Progress Bar with Model Nodes */}
      <div className="rounded-xl p-5" style={{
        background: 'linear-gradient(145deg, rgba(18, 18, 26, 0.9), rgba(26, 26, 46, 0.7))',
        border: '1px solid rgba(139, 92, 246, 0.25)',
      }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium" style={{ color: '#a0a0b5' }}>
            Progress: <span style={{ color: '#00f5ff' }}>{currentIndex + 1}</span> of {selectedPath.modelSequence.length}
          </span>
          <span className="text-sm" style={{ color: '#6b6b80' }}>
            {completedModels.size} completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 rounded-full mb-4" style={{ background: 'rgba(139, 92, 246, 0.2)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPercentage}%`,
              background: 'linear-gradient(90deg, #00f5ff, #8b5cf6)',
              boxShadow: '0 0 10px rgba(0, 245, 255, 0.4)',
            }}
          />
        </div>

        {/* Model Sequence */}
        <div className="flex items-center overflow-x-auto pb-2 gap-1">
          {selectedPath.modelSequence.map((modelId, index) => {
            const model = sampleModels.find((m) => m.id === modelId);
            const isCompleted = completedModels.has(modelId);
            const isCurrent = index === currentIndex;
            const isPast = index < currentIndex;

            return (
              <div key={modelId} className="flex items-center">
                <button
                  onClick={() => setCurrentIndex(index)}
                  className="relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
                  style={{
                    background: isCurrent
                      ? 'linear-gradient(135deg, #00f5ff, #8b5cf6)'
                      : isCompleted
                        ? '#10b981'
                        : isPast
                          ? 'rgba(139, 92, 246, 0.4)'
                          : 'rgba(36, 36, 56, 0.8)',
                    color: isCurrent || isCompleted ? '#0a0a0f' : isPast ? '#f0f0f5' : '#6b6b80',
                    boxShadow: isCurrent ? '0 0 20px rgba(0, 245, 255, 0.5)' : 'none',
                    border: isCurrent ? '2px solid rgba(255, 255, 255, 0.4)' : '2px solid transparent',
                  }}
                  title={model?.name || modelId}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </button>
                {index < selectedPath.modelSequence.length - 1 && (
                  <div
                    className="w-6 h-0.5 rounded-full"
                    style={{
                      background: index < currentIndex
                        ? 'linear-gradient(90deg, #00f5ff, #8b5cf6)'
                        : 'rgba(139, 92, 246, 0.2)',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Current Model Label */}
        <div className="mt-3 text-center">
          <span className="text-sm font-semibold" style={{ color: '#00f5ff' }}>
            {currentModel?.name || 'Unknown Model'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-5">
        {/* Ego Network Graph */}
        <div className="w-1/2 relative overflow-hidden" style={{
          background: 'linear-gradient(145deg, #0a0a0f 0%, #12121a 50%, #1a1a2e 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(139, 92, 246, 0.25)',
        }}>
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `
              radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0, 245, 255, 0.1) 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 20% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
            `,
          }} />

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-4 z-10" style={{
            background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.95) 0%, transparent 100%)',
          }}>
            <h2 className="text-base font-semibold" style={{ color: '#f0f0f5' }}>Related Models</h2>
            <p className="text-sm" style={{ color: '#6b6b80' }}>
              {currentModel?.name} and its connections
            </p>
          </div>

          <div className="h-full pt-14">
            {elements.length > 0 ? (
              <CytoscapeComponent
                elements={elements}
                style={{ width: '100%', height: '100%' }}
                stylesheet={graphStyles}
                layout={layout}
                cy={(cy) => {
                  cyRef.current = cy;
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full" style={{ color: '#6b6b80' }}>
                <p>No model data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Model Card */}
        <div className="w-1/2 flex flex-col overflow-hidden" style={{
          background: 'linear-gradient(145deg, #12121a 0%, #1a1a2e 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(139, 92, 246, 0.25)',
        }}>
          <div className="p-4 border-b" style={{
            borderColor: 'rgba(139, 92, 246, 0.2)',
            background: 'rgba(10, 10, 15, 0.5)',
          }}>
            <h2 className="text-base font-semibold" style={{ color: '#f0f0f5' }}>Model Details</h2>
          </div>

          {currentModel ? (
            <div className="flex-1 overflow-y-auto p-5">
              {/* Model Name */}
              <h3 className="text-xl font-bold mb-2 gradient-text">{currentModel.name}</h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {currentModel.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium rounded-full"
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
              <div className="mb-5 p-4 rounded-xl" style={{
                background: 'rgba(0, 245, 255, 0.08)',
                border: '1px solid rgba(0, 245, 255, 0.2)',
              }}>
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6b6b80' }}>
                  Diagnostic Question
                </h4>
                <p className="text-base font-medium italic" style={{ color: '#00f5ff' }}>
                  "{currentModel.diagnosticQuestion}"
                </p>
              </div>

              {/* Key Insight */}
              <div className="mb-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6b6b80' }}>
                  Key Insight
                </h4>
                <p className="leading-relaxed" style={{ color: '#a0a0b5' }}>{currentModel.keyInsight}</p>
              </div>

              {/* Red Flag Phrases */}
              {currentModel.redFlagPhrases.length > 0 && (
                <div className="mb-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6b6b80' }}>
                    Red Flag Phrases
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentModel.redFlagPhrases.map((phrase, index) => (
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
              )}

              {/* Adjacent Models */}
              <div className="mb-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6b6b80' }}>
                  Related Models
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentModel.adjacentModels.slice(0, 4).map((adjId) => {
                    const adjModel = sampleModels.find((m) => m.id === adjId);
                    return (
                      <button
                        key={adjId}
                        onClick={() => onModelSelect(adjId)}
                        className="px-3 py-1.5 text-sm rounded-lg transition-all duration-300"
                        style={{
                          background: 'rgba(139, 92, 246, 0.15)',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                          color: '#a78bfa',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 245, 255, 0.15)';
                          e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.4)';
                          e.currentTarget.style.color = '#00f5ff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                          e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                          e.currentTarget.style.color = '#a78bfa';
                        }}
                      >
                        {adjModel?.name || adjId.replace(/-/g, ' ')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center" style={{ color: '#6b6b80' }}>
              <p>Select a model to view details</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="p-4 border-t" style={{
            borderColor: 'rgba(139, 92, 246, 0.2)',
            background: 'rgba(10, 10, 15, 0.5)',
          }}>
            <div className="flex items-center justify-between">
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all duration-300"
                style={{
                  background: currentIndex === 0 ? 'rgba(36, 36, 56, 0.5)' : 'rgba(36, 36, 56, 0.8)',
                  color: currentIndex === 0 ? '#3d3d52' : '#a0a0b5',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <button
                onClick={markComplete}
                className="px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300"
                style={{
                  background: '#10b981',
                  color: '#0a0a0f',
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mark Complete
              </button>

              <button
                onClick={goToNext}
                disabled={currentIndex === selectedPath.modelSequence.length - 1}
                className="px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300"
                style={{
                  background: currentIndex === selectedPath.modelSequence.length - 1
                    ? 'rgba(36, 36, 56, 0.5)'
                    : 'linear-gradient(135deg, #00f5ff, #8b5cf6)',
                  color: currentIndex === selectedPath.modelSequence.length - 1 ? '#3d3d52' : '#0a0a0f',
                  cursor: currentIndex === selectedPath.modelSequence.length - 1 ? 'not-allowed' : 'pointer',
                }}
              >
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningPath;
