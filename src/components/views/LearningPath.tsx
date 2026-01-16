import React, { useState, useMemo, useRef, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import { LearningPath as LearningPathType, MentalModel } from '../../types';

interface LearningPathProps {
  onModelSelect: (modelId: string) => void;
}

// Graph styles for ego network in learning path
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
      'width': 40,
      'height': 40,
      'text-wrap': 'wrap',
      'text-max-width': '80px',
    },
  },
  {
    selector: 'node.focus',
    style: {
      'background-color': '#4f46e5',
      'width': 60,
      'height': 60,
      'font-weight': 'bold',
      'font-size': '13px',
      'border-width': 4,
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
      'line-color': '#c7d2fe',
      'curve-style': 'bezier',
    },
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

  // Get current model
  const currentModelId = selectedPath.modelSequence[currentIndex];
  const currentModel = useMemo(() => {
    return sampleModels.find((m) => m.id === currentModelId) || null;
  }, [currentModelId]);

  // Get ego network models for current model
  const egoModels = useMemo(() => {
    if (!currentModel) return [];
    const adjacentIds = currentModel.adjacentModels.slice(0, 4); // Limit to 4 adjacent models
    const networkModels = [currentModel];

    adjacentIds.forEach((adjId) => {
      const adjModel = sampleModels.find((m) => m.id === adjId);
      if (adjModel) {
        networkModels.push(adjModel);
      }
    });

    return networkModels;
  }, [currentModel]);

  // Create Cytoscape elements
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

  // Layout
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

  // Handle path change
  const handlePathChange = (pathId: string) => {
    const path = sampleLearningPaths.find((p) => p.id === pathId);
    if (path) {
      setSelectedPath(path);
      setCurrentIndex(0);
      setCompletedModels(new Set());
    }
  };

  // Navigation
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

  // Handle node click in graph
  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.on('tap', 'node', (evt) => {
        const nodeId = evt.target.id();
        if (nodeId !== currentModelId) {
          onModelSelect(nodeId);
        }
      });
    }

    return () => {
      if (cyRef.current) {
        cyRef.current.removeListener('tap');
      }
    };
  }, [currentModelId, onModelSelect]);

  // Progress percentage
  const progressPercentage = ((currentIndex + 1) / selectedPath.modelSequence.length) * 100;

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* Path Selector */}
      <div className="mb-4 flex items-center gap-4">
        <label className="font-medium text-gray-700">Learning Path:</label>
        <select
          value={selectedPath.id}
          onChange={(e) => handlePathChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        >
          {sampleLearningPaths.map((path) => (
            <option key={path.id} value={path.id}>
              {path.name}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-500">{selectedPath.description}</p>
      </div>

      {/* Progress Bar with Model Nodes */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Progress: {currentIndex + 1} of {selectedPath.modelSequence.length}
          </span>
          <span className="text-sm text-gray-500">
            {completedModels.size} completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 rounded-full mb-4">
          <div
            className="h-2 bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
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
                  className={`
                    relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-200 cursor-pointer
                    ${isCurrent
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-200'
                      : isCompleted
                        ? 'bg-green-500 text-white'
                        : isPast
                          ? 'bg-indigo-200 text-indigo-700'
                          : 'bg-gray-200 text-gray-500'
                    }
                  `}
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
                    className={`w-6 h-0.5 ${
                      index < currentIndex ? 'bg-indigo-400' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Current Model Label */}
        <div className="mt-2 text-center">
          <span className="text-sm font-medium text-indigo-600">
            {currentModel?.name || 'Unknown Model'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4">
        {/* Ego Network Graph */}
        <div className="w-1/2 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Related Models</h2>
            <p className="text-sm text-gray-500">
              {currentModel?.name} and its connections
            </p>
          </div>
          <div className="h-[calc(100%-60px)]">
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
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>No model data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Model Card */}
        <div className="w-1/2 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Model Details</h2>
          </div>

          {currentModel ? (
            <div className="flex-1 overflow-y-auto p-6">
              {/* Model Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentModel.name}</h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {currentModel.tags.map((tag) => (
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
                <p className="text-lg text-indigo-700 italic">"{currentModel.diagnosticQuestion}"</p>
              </div>

              {/* Key Insight */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Key Insight
                </h4>
                <p className="text-gray-700 leading-relaxed">{currentModel.keyInsight}</p>
              </div>

              {/* Red Flag Phrases */}
              {currentModel.redFlagPhrases.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Red Flag Phrases
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentModel.redFlagPhrases.map((phrase, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-full border border-red-200"
                      >
                        "{phrase}"
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Adjacent Models Summary */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Related Models
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentModel.adjacentModels.slice(0, 4).map((adjId) => {
                    const adjModel = sampleModels.find((m) => m.id === adjId);
                    return (
                      <button
                        key={adjId}
                        onClick={() => onModelSelect(adjId)}
                        className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200 hover:bg-indigo-100 transition-colors"
                      >
                        {adjModel?.name || adjId.replace(/-/g, ' ')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Select a model to view details</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className={`
                  px-4 py-2 rounded-lg font-medium flex items-center gap-2
                  ${currentIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <button
                onClick={markComplete}
                className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mark Complete
              </button>

              <button
                onClick={goToNext}
                disabled={currentIndex === selectedPath.modelSequence.length - 1}
                className={`
                  px-4 py-2 rounded-lg font-medium flex items-center gap-2
                  ${currentIndex === selectedPath.modelSequence.length - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }
                `}
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
