import { MentalModel } from '../../types';

interface ModelCardProps {
  model: MentalModel;
  onAdjacentClick?: (modelId: string) => void;
  onPracticeClick?: () => void;
  compact?: boolean;
}

export function ModelCard({
  model,
  onAdjacentClick,
  onPracticeClick,
  compact = false
}: ModelCardProps) {
  if (compact) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{model.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{model.diagnosticQuestion}</p>
        <button
          onClick={() => onAdjacentClick?.(model.id)}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Learn more &rarr;
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
        <h2 className="text-xl font-bold text-gray-900">{model.name}</h2>
        <p className="text-sm text-indigo-600 mt-1">
          {model.tags.map(tag => tag.replace(/-/g, ' ')).join(' / ')}
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Diagnostic Question */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Diagnostic Question
          </h3>
          <p className="text-lg text-gray-800 italic">"{model.diagnosticQuestion}"</p>
        </div>

        {/* Key Insight */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Key Insight
          </h3>
          <p className="text-gray-700 leading-relaxed">{model.keyInsight}</p>
        </div>

        {/* Red Flag Phrases */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Red Flag Phrases
          </h3>
          <div className="flex flex-wrap gap-2">
            {model.redFlagPhrases.map((phrase, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-50 text-red-700 border border-red-200"
              >
                <svg
                  className="w-3 h-3 mr-1.5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {phrase}
              </span>
            ))}
          </div>
        </div>

        {/* Adjacent Models */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Related Models
          </h3>
          <div className="space-y-3">
            {model.adjacentModels.map((adjacentId) => {
              const whyText = model.whyAdjacent[adjacentId];
              return (
                <div
                  key={adjacentId}
                  className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onAdjacentClick?.(adjacentId)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {adjacentId.split('-').map(word =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </p>
                    {whyText && (
                      <p className="text-sm text-gray-500 mt-0.5">{whyText}</p>
                    )}
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors"
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
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Action */}
      {onPracticeClick && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onPracticeClick}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
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
      )}
    </div>
  );
}

// Mini card variant for list views
export function ModelCardMini({
  model,
  onClick,
  isSelected = false
}: {
  model: MentalModel;
  onClick?: () => void;
  isSelected?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-lg border cursor-pointer transition-all
        ${isSelected
          ? 'border-indigo-500 bg-indigo-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm'
        }
      `}
    >
      <h4 className={`font-medium mb-1 ${isSelected ? 'text-indigo-700' : 'text-gray-900'}`}>
        {model.name}
      </h4>
      <p className="text-sm text-gray-500 line-clamp-2">{model.keyInsight}</p>
    </div>
  );
}
