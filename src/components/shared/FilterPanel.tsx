import { useState } from 'react';
import { tags } from '../../data/tags';
import { useFilterLogic } from '../../hooks/useFilterLogic';

interface FilterPanelProps {
  onComplete: (modelIds: string[]) => void;
  onCancel: () => void;
}

type Stage = 'l1' | 'l2' | 'results';

export function FilterPanel({ onComplete, onCancel }: FilterPanelProps) {
  const [stage, setStage] = useState<Stage>('l1');
  const {
    l1Answers,
    l2Answers,
    toggleL1Answer,
    setL2Answer,
    l1Pool,
    tagsNeedingL2,
    finalPool,
    filteredModels,
    needsL2,
    resetFilters,
  } = useFilterLogic();

  const handleL1Submit = () => {
    if (l1Pool.length === 0) {
      return; // Don't proceed if nothing selected
    }

    if (needsL2) {
      setStage('l2');
    } else {
      setStage('results');
    }
  };

  const handleL2Submit = () => {
    setStage('results');
  };

  const handleViewResults = () => {
    onComplete(finalPool);
  };

  const handleBack = () => {
    if (stage === 'l2') {
      setStage('l1');
    } else if (stage === 'results') {
      setStage(needsL2 ? 'l2' : 'l1');
    }
  };

  const handleReset = () => {
    resetFilters();
    setStage('l1');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {stage === 'l1' && 'What are you facing?'}
              {stage === 'l2' && 'Let\'s narrow it down'}
              {stage === 'results' && 'Your mental model matches'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {stage === 'l1' && 'Select all situations that apply to you right now.'}
              {stage === 'l2' && 'Help us find the most relevant models for your situation.'}
              {stage === 'results' && `We found ${finalPool.length} models that might help.`}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress indicator */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <StepIndicator step={1} currentStage={stage} label="Situation" />
            <div className="flex-1 h-0.5 bg-gray-200">
              <div
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: stage === 'l1' ? '0%' : stage === 'l2' ? '50%' : '100%' }}
              />
            </div>
            <StepIndicator step={2} currentStage={stage} label="Refine" isOptional={!needsL2} />
            <div className="flex-1 h-0.5 bg-gray-200">
              <div
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: stage === 'results' ? '100%' : '0%' }}
              />
            </div>
            <StepIndicator step={3} currentStage={stage} label="Results" />
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
              currentPoolCount={finalPool.length}
            />
          )}
          {stage === 'results' && (
            <ResultsStage filteredModels={filteredModels} />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex gap-3">
            {stage !== 'l1' && (
              <button
                onClick={handleBack}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                &larr; Back
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            {stage === 'l1' && (
              <button
                onClick={handleL1Submit}
                disabled={l1Pool.length === 0}
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {needsL2 ? 'Continue' : 'Show Results'} ({l1Pool.length} models)
              </button>
            )}
            {stage === 'l2' && (
              <button
                onClick={handleL2Submit}
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Show Results ({finalPool.length} models)
              </button>
            )}
            {stage === 'results' && (
              <button
                onClick={handleViewResults}
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                View in Graph &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step indicator component
function StepIndicator({
  step,
  currentStage,
  label,
  isOptional = false
}: {
  step: number;
  currentStage: Stage;
  label: string;
  isOptional?: boolean;
}) {
  const stageOrder = { l1: 1, l2: 2, results: 3 };
  const currentStep = stageOrder[currentStage];
  const isActive = currentStep >= step;
  const isCurrent = currentStep === step;

  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
          ${isActive
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200 text-gray-500'
          }
          ${isCurrent ? 'ring-2 ring-indigo-300 ring-offset-2' : ''}
        `}
      >
        {step}
      </div>
      <span className={`text-xs mt-1 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
        {label}
        {isOptional && <span className="text-gray-400"> (skip)</span>}
      </span>
    </div>
  );
}

// L1 Stage - Yes/No questions for each tag
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
          className={`
            flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all
            ${l1Answers[tag.id]
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
            }
          `}
        >
          <div className="flex-shrink-0 pt-0.5">
            <input
              type="checkbox"
              checked={l1Answers[tag.id] || false}
              onChange={() => onToggle(tag.id)}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`font-medium ${l1Answers[tag.id] ? 'text-indigo-700' : 'text-gray-900'}`}>
                {tag.l1Question}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {tag.name} - {tag.modelIds.length} models
            </p>
          </div>
        </label>
      ))}

      {poolCount > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            <span className="font-semibold">{poolCount} models</span> match your selections.
            {poolCount > 6 && " We'll help you narrow it down next."}
          </p>
        </div>
      )}
    </div>
  );
}

// L2 Stage - Specific questions for selected tags
function L2Stage({
  tagsNeedingL2,
  l2Answers,
  onSelect,
  currentPoolCount
}: {
  tagsNeedingL2: typeof tags;
  l2Answers: Record<string, string>;
  onSelect: (tagId: string, optionText: string) => void;
  currentPoolCount: number;
}) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Answer these follow-up questions to find the most relevant models for your specific situation.
      </p>

      {tagsNeedingL2.map((tag) => (
        <div key={tag.id} className="bg-gray-50 rounded-lg p-5">
          <h4 className="font-semibold text-gray-900 mb-3">
            {tag.l2Question}
          </h4>
          <p className="text-xs text-gray-500 mb-4">
            Based on your answer: "{tag.l1Question}"
          </p>
          <div className="space-y-2">
            {tag.l2Options.map((option, index) => (
              <label
                key={index}
                className={`
                  flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all
                  ${l2Answers[tag.id] === option.text
                    ? 'border-indigo-500 bg-white shadow-sm'
                    : 'border-gray-200 bg-white hover:border-indigo-300'
                  }
                `}
              >
                <input
                  type="radio"
                  name={`l2-${tag.id}`}
                  checked={l2Answers[tag.id] === option.text}
                  onChange={() => onSelect(tag.id, option.text)}
                  className="mt-0.5 w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <div className="flex-1">
                  <span className={`text-sm ${l2Answers[tag.id] === option.text ? 'text-indigo-700 font-medium' : 'text-gray-700'}`}>
                    {option.text}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">
                    ({option.modelIds.length} models)
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-700">
          Current selection: <span className="font-semibold">{currentPoolCount} models</span>
          {currentPoolCount <= 6 && currentPoolCount > 0 && (
            <span className="ml-2 text-green-600">Ready to view!</span>
          )}
        </p>
      </div>
    </div>
  );
}

// Results Stage - Preview of filtered models
function ResultsStage({
  filteredModels
}: {
  filteredModels: Array<{ id: string; name: string; diagnosticQuestion: string; keyInsight: string }>;
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Here are the mental models that might help with your situation:
      </p>

      <div className="grid gap-3">
        {filteredModels.map((model) => (
          <div
            key={model.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900">{model.name}</h4>
                <p className="text-sm text-indigo-600 italic mt-1">"{model.diagnosticQuestion}"</p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{model.keyInsight}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="text-center py-8">
          <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 mt-3">No models match your criteria. Try selecting different options.</p>
        </div>
      )}
    </div>
  );
}
