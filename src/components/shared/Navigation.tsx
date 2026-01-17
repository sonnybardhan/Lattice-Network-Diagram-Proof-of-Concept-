import { ViewType } from '../../types';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onStartScenario: () => void;
}

const viewOptions: { id: ViewType; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: 'tag-cluster',
    label: 'Browse All',
    description: 'Explore all 121 models by category',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    id: 'filtered-subgraph',
    label: 'Filtered',
    description: 'View your scenario matches',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
    ),
  },
  {
    id: 'ego-network',
    label: 'Deep Dive',
    description: 'Explore model connections',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    id: 'learning-path',
    label: 'Learn',
    description: 'Follow guided paths',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
];

export function Navigation({ currentView, onViewChange, onStartScenario }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-40" style={{
      background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.98) 0%, rgba(18, 18, 26, 0.95) 100%)',
      borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
      backdropFilter: 'blur(12px)',
    }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden" style={{
              background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)',
            }}>
              {/* Animated glow */}
              <div className="absolute inset-0 animate-pulse opacity-50" style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.3), transparent)',
              }} />
              <svg className="w-6 h-6 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">Mental Models</h1>
              <p className="text-xs hidden sm:block" style={{ color: '#6b6b80' }}>Lattice POC</p>
            </div>
          </div>

          {/* View Navigation */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-xl" style={{
            background: 'rgba(26, 26, 46, 0.6)',
            border: '1px solid rgba(139, 92, 246, 0.15)',
          }}>
            {viewOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onViewChange(option.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                style={{
                  background: currentView === option.id ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(139, 92, 246, 0.15))' : 'transparent',
                  color: currentView === option.id ? '#00f5ff' : '#a0a0b5',
                  border: currentView === option.id ? '1px solid rgba(0, 245, 255, 0.3)' : '1px solid transparent',
                }}
                title={option.description}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <select
              value={currentView}
              onChange={(e) => onViewChange(e.target.value as ViewType)}
              className="block w-full pl-3 pr-10 py-2 text-sm rounded-lg"
              style={{
                background: 'rgba(26, 26, 46, 0.8)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                color: '#f0f0f5',
              }}
            >
              {viewOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Action Button */}
          <button
            onClick={onStartScenario}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 btn-primary"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="hidden sm:inline">New Scenario</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      {/* Breadcrumb / Context Bar */}
      <div className="px-4 py-2.5" style={{
        background: 'rgba(10, 10, 15, 0.5)',
        borderTop: '1px solid rgba(139, 92, 246, 0.1)',
      }}>
        <div className="container mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{
              background: '#00f5ff',
              boxShadow: '0 0 8px #00f5ff',
            }} />
            <span style={{ color: '#6b6b80' }}>Current view:</span>
            <span className="font-medium" style={{ color: '#00f5ff' }}>
              {viewOptions.find((v) => v.id === currentView)?.label}
            </span>
            <span style={{ color: '#2d2d44' }} className="mx-2">|</span>
            <span style={{ color: '#6b6b80' }}>
              {viewOptions.find((v) => v.id === currentView)?.description}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Tab navigation variant for use within views
export function ViewTabs({
  currentView,
  onViewChange,
  views = viewOptions
}: {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  views?: typeof viewOptions;
}) {
  return (
    <div style={{ borderBottom: '1px solid rgba(139, 92, 246, 0.2)' }}>
      <nav className="-mb-px flex gap-4" aria-label="Tabs">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className="group inline-flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300"
            style={{
              borderColor: currentView === view.id ? '#00f5ff' : 'transparent',
              color: currentView === view.id ? '#00f5ff' : '#6b6b80',
            }}
          >
            <span style={{ color: currentView === view.id ? '#00f5ff' : '#6b6b80' }}>
              {view.icon}
            </span>
            {view.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

// Back button for nested navigation
export function BackButton({
  onClick,
  label = 'Back'
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 text-sm transition-all duration-300"
      style={{ color: '#a0a0b5' }}
      onMouseEnter={(e) => { e.currentTarget.style.color = '#00f5ff'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = '#a0a0b5'; }}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      {label}
    </button>
  );
}
