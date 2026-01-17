import { useState } from 'react';
import { tags } from '../../data/tags';
import { useFilterLogic, L3Context } from '../../hooks/useFilterLogic';
import { Tag } from '../../types';

interface FilterPanelProps {
  onComplete: (modelIds: string[]) => void;
  onCancel: () => void;
}

type Stage = 'l1' | 'l2' | 'l3' | 'results';

export function FilterPanel({ onComplete, onCancel }: FilterPanelProps) {
  const [stage, setStage] = useState<Stage>('l1');
  const {
    l1Answers,
    l2Answers,
    l3Answers,
    toggleL1Answer,
    setL2Answer,
    setL3Answer,
    l1Pool,
    l2Pool,
    tagsNeedingL2,
    l2OptionsNeedingL3,
    finalPool,
    filteredModels,
    needsL2,
    needsL3,
    resetFilters,
  } = useFilterLogic();

  const handleL1Submit = () => {
    if (l1Pool.length === 0) {
      return;
    }

    if (needsL2) {
      setStage('l2');
    } else {
      setStage('results');
    }
  };

  const handleL2Submit = () => {
    // Check if L3 is needed (pool still > 5 and there are L3 options available)
    if (needsL3 && l2OptionsNeedingL3.length > 0) {
      setStage('l3');
    } else {
      setStage('results');
    }
  };

  const handleL3Submit = () => {
    setStage('results');
  };

  const handleViewResults = () => {
    onComplete(finalPool);
  };

  const handleBack = () => {
    if (stage === 'l2') {
      setStage('l1');
    } else if (stage === 'l3') {
      setStage('l2');
    } else if (stage === 'results') {
      if (needsL3 && l2OptionsNeedingL3.length > 0) {
        setStage('l3');
      } else if (needsL2) {
        setStage('l2');
      } else {
        setStage('l1');
      }
    }
  };

  const handleReset = () => {
    resetFilters();
    setStage('l1');
  };

  // Determine total steps based on what's needed
  const totalSteps = needsL3 && l2OptionsNeedingL3.length > 0 ? 4 : needsL2 ? 3 : 2;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{
      background: 'rgba(10, 10, 15, 0.9)',
      backdropFilter: 'blur(8px)',
    }}>
      <div className="max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in" style={{
        background: 'linear-gradient(145deg, #12121a 0%, #1a1a2e 100%)',
        borderRadius: '28px',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        boxShadow: '0 0 60px rgba(139, 92, 246, 0.2)',
      }}>
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between" style={{
          background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
        }}>
          <div>
            <h2 className="text-xl font-bold" style={{ color: '#f0f0f5' }}>
              {stage === 'l1' && 'What are you facing?'}
              {stage === 'l2' && "Let's narrow it down"}
              {stage === 'l3' && 'One more question'}
              {stage === 'results' && 'Your mental model matches'}
            </h2>
            <p className="text-sm mt-1" style={{ color: '#a0a0b5' }}>
              {stage === 'l1' && 'Select all situations that apply to you right now.'}
              {stage === 'l2' && 'Help us find the most relevant models for your situation.'}
              {stage === 'l3' && 'Final refinement to get you to ≤5 models.'}
              {stage === 'results' && `We found ${finalPool.length} model${finalPool.length !== 1 ? 's' : ''} that might help.`}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-xl transition-all duration-300"
            style={{
              background: 'rgba(36, 36, 56, 0.8)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}
          >
            <svg className="w-6 h-6" style={{ color: '#a0a0b5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress indicator */}
        <div className="px-6 py-4" style={{
          background: 'rgba(10, 10, 15, 0.5)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
        }}>
          <div className="flex items-center gap-2">
            <StepIndicator step={1} currentStage={stage} label="Situation" totalSteps={totalSteps} />
            <ProgressBar fromStage="l1" toStage="l2" currentStage={stage} />
            <StepIndicator step={2} currentStage={stage} label="Refine" isOptional={!needsL2} totalSteps={totalSteps} />
            {totalSteps >= 3 && (
              <>
                <ProgressBar fromStage="l2" toStage="l3" currentStage={stage} />
                <StepIndicator
                  step={3}
                  currentStage={stage}
                  label={totalSteps === 4 ? "Narrow" : "Results"}
                  isOptional={totalSteps === 3 && !needsL2}
                  totalSteps={totalSteps}
                />
              </>
            )}
            {totalSteps === 4 && (
              <>
                <ProgressBar fromStage="l3" toStage="results" currentStage={stage} />
                <StepIndicator step={4} currentStage={stage} label="Results" totalSteps={totalSteps} />
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {stage === 'l1' && (
            <L1Stage
              l1Answers={l1Answers}
              onToggle={toggleL1Answer}
              poolCount={l1Pool.length}
            />
          )}
          {stage === 'l2' && (
            <L2Stage
              tagsNeedingL2={tagsNeedingL2}
              l2Answers={l2Answers}
              onSelect={setL2Answer}
              currentPoolCount={l2Pool.length}
            />
          )}
          {stage === 'l3' && (
            <L3Stage
              l2OptionsNeedingL3={l2OptionsNeedingL3}
              l3Answers={l3Answers}
              onSelect={setL3Answer}
              currentPoolCount={finalPool.length}
            />
          )}
          {stage === 'results' && (
            <ResultsStage filteredModels={filteredModels} />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex items-center justify-between" style={{
          background: 'rgba(10, 10, 15, 0.5)',
          borderTop: '1px solid rgba(139, 92, 246, 0.2)',
        }}>
          <div className="flex gap-3">
            {stage !== 'l1' && (
              <button
                onClick={handleBack}
                className="px-4 py-2 text-sm font-medium transition-all duration-300"
                style={{ color: '#a0a0b5' }}
              >
                ← Back
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium transition-all duration-300"
              style={{ color: '#6b6b80' }}
            >
              Reset
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 btn-secondary"
            >
              Cancel
            </button>
            {stage === 'l1' && (
              <button
                onClick={handleL1Submit}
                disabled={l1Pool.length === 0}
                className="px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-300"
                style={{
                  background: l1Pool.length === 0 ? 'rgba(36, 36, 56, 0.8)' : '#007AFF',
                  color: l1Pool.length === 0 ? '#6b6b80' : '#ffffff',
                  cursor: l1Pool.length === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                {needsL2 ? 'Continue' : 'Show Results'} ({l1Pool.length} models)
              </button>
            )}
            {stage === 'l2' && (
              <button
                onClick={handleL2Submit}
                className="px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-300"
                style={{ background: '#007AFF', color: '#ffffff' }}
              >
                {needsL3 && l2OptionsNeedingL3.length > 0 ? 'Continue' : 'Show Results'} ({l2Pool.length} models)
              </button>
            )}
            {stage === 'l3' && (
              <button
                onClick={handleL3Submit}
                className="px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-300"
                style={{ background: '#007AFF', color: '#ffffff' }}
              >
                Show Results ({finalPool.length} models)
              </button>
            )}
            {stage === 'results' && (
              <button
                onClick={handleViewResults}
                className="px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-300"
                style={{ background: '#007AFF', color: '#ffffff' }}
              >
                View in Graph →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ fromStage, toStage, currentStage }: { fromStage: Stage; toStage: Stage; currentStage: Stage }) {
  const stageOrder: Record<Stage, number> = { l1: 1, l2: 2, l3: 3, results: 4 };
  const fromOrder = stageOrder[fromStage];
  const toOrder = stageOrder[toStage];
  const current = stageOrder[currentStage];

  const progress = current > fromOrder ? (current >= toOrder ? 100 : 50) : 0;

  return (
    <div className="flex-1 h-0.5 rounded-full" style={{ background: 'rgba(139, 92, 246, 0.2)' }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${progress}%`,
          background: '#007AFF',
        }}
      />
    </div>
  );
}

function StepIndicator({
  step,
  currentStage,
  label,
  isOptional = false,
  totalSteps
}: {
  step: number;
  currentStage: Stage;
  label: string;
  isOptional?: boolean;
  totalSteps: number;
}) {
  const stageOrder: Record<Stage, number> = { l1: 1, l2: 2, l3: 3, results: 4 };
  const currentStep = stageOrder[currentStage];

  // Adjust mapping based on total steps
  let adjustedCurrentStep = currentStep;
  if (totalSteps === 2) {
    adjustedCurrentStep = currentStage === 'results' ? 2 : 1;
  } else if (totalSteps === 3) {
    adjustedCurrentStep = currentStage === 'results' ? 3 : currentStep;
  }

  const isActive = adjustedCurrentStep >= step;
  const isCurrent = adjustedCurrentStep === step;

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300"
        style={{
          background: isActive ? '#007AFF' : 'rgba(36, 36, 56, 0.8)',
          color: isActive ? '#ffffff' : '#6b6b80',
          boxShadow: isCurrent ? '0 0 20px rgba(0, 122, 255, 0.4)' : 'none',
          border: isCurrent ? '2px solid rgba(0, 122, 255, 0.6)' : '2px solid transparent',
        }}
      >
        {step}
      </div>
      <span className="text-xs mt-1" style={{ color: isActive ? '#007AFF' : '#6b6b80' }}>
        {label}
        {isOptional && <span style={{ color: '#6b6b80' }}> (skip)</span>}
      </span>
    </div>
  );
}

function L1Stage({
  l1Answers,
  onToggle,
  poolCount
}: {
  l1Answers: Record<string, boolean>;
  onToggle: (tagId: string) => void;
  poolCount: number;
}) {
  return (
    <div className="space-y-3">
      {tags.map((tag) => (
        <label
          key={tag.id}
          className="flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300"
          style={{
            background: l1Answers[tag.id] ? 'rgba(0, 122, 255, 0.1)' : 'rgba(36, 36, 56, 0.5)',
            border: `1px solid ${l1Answers[tag.id] ? 'rgba(0, 122, 255, 0.4)' : 'rgba(139, 92, 246, 0.2)'}`,
          }}
        >
          <div className="flex-shrink-0 pt-0.5">
            <input
              type="checkbox"
              checked={l1Answers[tag.id] || false}
              onChange={() => onToggle(tag.id)}
              className="w-5 h-5 rounded"
              style={{
                accentColor: '#007AFF',
              }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium" style={{ color: l1Answers[tag.id] ? '#007AFF' : '#f0f0f5' }}>
                {tag.l1Question}
              </span>
            </div>
            <p className="text-sm mt-1" style={{ color: '#6b6b80' }}>
              {tag.name} · {tag.modelIds.length} models
            </p>
          </div>
        </label>
      ))}

      {poolCount > 0 && (
        <div className="mt-4 p-4 rounded-xl" style={{
          background: 'rgba(0, 122, 255, 0.1)',
          border: '1px solid rgba(0, 122, 255, 0.3)',
        }}>
          <p className="text-sm" style={{ color: '#007AFF' }}>
            <span className="font-semibold">{poolCount} models</span> match your selections.
            {poolCount > 6 && " We'll help you narrow it down next."}
          </p>
        </div>
      )}
    </div>
  );
}

function L2Stage({
  tagsNeedingL2,
  l2Answers,
  onSelect,
  currentPoolCount
}: {
  tagsNeedingL2: Tag[];
  l2Answers: Record<string, string>;
  onSelect: (tagId: string, optionText: string) => void;
  currentPoolCount: number;
}) {
  return (
    <div className="space-y-6">
      <p className="text-sm" style={{ color: '#a0a0b5' }}>
        Answer these follow-up questions to find the most relevant models for your specific situation.
      </p>

      {tagsNeedingL2.map((tag) => (
        <div key={tag.id} className="rounded-xl p-5" style={{
          background: 'rgba(36, 36, 56, 0.5)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
        }}>
          <h4 className="font-semibold mb-3" style={{ color: '#f0f0f5' }}>
            {tag.l2Question}
          </h4>
          <p className="text-xs mb-4" style={{ color: '#6b6b80' }}>
            Based on: "{tag.l1Question}"
          </p>
          <div className="space-y-2">
            {tag.l2Options.map((option, index) => (
              <label
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300"
                style={{
                  background: l2Answers[tag.id] === option.text ? 'rgba(0, 122, 255, 0.15)' : 'rgba(26, 26, 46, 0.5)',
                  border: `1px solid ${l2Answers[tag.id] === option.text ? 'rgba(0, 122, 255, 0.5)' : 'rgba(139, 92, 246, 0.15)'}`,
                }}
              >
                <input
                  type="radio"
                  name={`l2-${tag.id}`}
                  checked={l2Answers[tag.id] === option.text}
                  onChange={() => onSelect(tag.id, option.text)}
                  className="mt-0.5 w-4 h-4"
                  style={{ accentColor: '#007AFF' }}
                />
                <div className="flex-1">
                  <span className="text-sm" style={{
                    color: l2Answers[tag.id] === option.text ? '#007AFF' : '#a0a0b5',
                    fontWeight: l2Answers[tag.id] === option.text ? 500 : 400,
                  }}>
                    {option.text}
                  </span>
                  <span className="text-xs ml-2" style={{ color: '#6b6b80' }}>
                    ({option.modelIds.length} model{option.modelIds.length !== 1 ? 's' : ''})
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="p-4 rounded-xl" style={{
        background: currentPoolCount <= 5 ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 149, 0, 0.1)',
        border: `1px solid ${currentPoolCount <= 5 ? 'rgba(52, 199, 89, 0.3)' : 'rgba(255, 149, 0, 0.3)'}`,
      }}>
        <p className="text-sm" style={{ color: currentPoolCount <= 5 ? '#34C759' : '#FF9500' }}>
          Current selection: <span className="font-semibold">{currentPoolCount} models</span>
          {currentPoolCount <= 5 && currentPoolCount > 0 && (
            <span className="ml-2">✓ Ready to view!</span>
          )}
          {currentPoolCount > 5 && (
            <span className="ml-2">→ One more refinement needed</span>
          )}
        </p>
      </div>
    </div>
  );
}

function L3Stage({
  l2OptionsNeedingL3,
  l3Answers,
  onSelect,
  currentPoolCount
}: {
  l2OptionsNeedingL3: L3Context[];
  l3Answers: Record<string, string>;
  onSelect: (key: string, optionText: string) => void;
  currentPoolCount: number;
}) {
  return (
    <div className="space-y-6">
      <p className="text-sm" style={{ color: '#a0a0b5' }}>
        Just one more question to narrow down to the most relevant models (target: ≤5).
      </p>

      {l2OptionsNeedingL3.map((context) => (
        <div key={context.key} className="rounded-xl p-5" style={{
          background: 'rgba(36, 36, 56, 0.5)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
        }}>
          <h4 className="font-semibold mb-3" style={{ color: '#f0f0f5' }}>
            {context.l2Option.l3Question}
          </h4>
          <p className="text-xs mb-4" style={{ color: '#6b6b80' }}>
            Refining: "{context.l2Option.text}"
          </p>
          <div className="space-y-2">
            {context.l2Option.l3Options?.map((option, index) => (
              <label
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300"
                style={{
                  background: l3Answers[context.key] === option.text ? 'rgba(0, 122, 255, 0.15)' : 'rgba(26, 26, 46, 0.5)',
                  border: `1px solid ${l3Answers[context.key] === option.text ? 'rgba(0, 122, 255, 0.5)' : 'rgba(139, 92, 246, 0.15)'}`,
                }}
              >
                <input
                  type="radio"
                  name={`l3-${context.key}`}
                  checked={l3Answers[context.key] === option.text}
                  onChange={() => onSelect(context.key, option.text)}
                  className="mt-0.5 w-4 h-4"
                  style={{ accentColor: '#007AFF' }}
                />
                <span className="text-sm" style={{
                  color: l3Answers[context.key] === option.text ? '#007AFF' : '#a0a0b5',
                  fontWeight: l3Answers[context.key] === option.text ? 500 : 400,
                }}>
                  {option.text}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="p-4 rounded-xl" style={{
        background: currentPoolCount <= 5 ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 149, 0, 0.1)',
        border: `1px solid ${currentPoolCount <= 5 ? 'rgba(52, 199, 89, 0.3)' : 'rgba(255, 149, 0, 0.3)'}`,
      }}>
        <p className="text-sm" style={{ color: currentPoolCount <= 5 ? '#34C759' : '#FF9500' }}>
          Current selection: <span className="font-semibold">{currentPoolCount} models</span>
          {currentPoolCount <= 5 && currentPoolCount > 0 && (
            <span className="ml-2">✓ Ready to view!</span>
          )}
        </p>
      </div>
    </div>
  );
}

function ResultsStage({
  filteredModels
}: {
  filteredModels: Array<{ id: string; name: string; diagnosticQuestion: string; keyInsight: string }>;
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: '#a0a0b5' }}>
        Here are the mental models that might help with your situation:
      </p>

      <div className="grid gap-3">
        {filteredModels.map((model) => (
          <div
            key={model.id}
            className="rounded-xl p-4 transition-all duration-300"
            style={{
              background: 'rgba(36, 36, 56, 0.5)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{
                background: 'rgba(0, 122, 255, 0.15)',
              }}>
                <svg className="w-5 h-5" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold" style={{ color: '#f0f0f5' }}>{model.name}</h4>
                <p className="text-sm italic mt-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>"{model.diagnosticQuestion}"</p>
                <p className="text-sm mt-2 line-clamp-2" style={{ color: '#a0a0b5' }}>{model.keyInsight}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="text-center py-8">
          <svg className="w-12 h-12 mx-auto" style={{ color: '#2d2d44' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-3" style={{ color: '#a0a0b5' }}>No models match your criteria. Try selecting different options.</p>
        </div>
      )}
    </div>
  );
}
