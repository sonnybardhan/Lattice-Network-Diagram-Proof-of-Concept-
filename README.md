# Mental Models Visualization POC

A proof-of-concept React application for visualizing and exploring 121 mental models through interactive graph visualizations. The core feature is a filtering system that narrows models down to actionable clusters of 5-6 through guided questioning.

## Features

- **Interactive Graph Visualizations** - Explore mental models as connected networks using Cytoscape.js
- **Smart Filtering** - L1/L2 question flow narrows 121 models down to 5-6 relevant ones
- **Four Exploration Views**:
  - **Tag Cluster View** - Browse all models organized by 12 category tags
  - **Filtered Subgraph** - View filtered results after completing scenario questions
  - **Ego Network** - Deep dive on a single model with its adjacent connections
  - **Learning Path** - Guided sequential learning through curated model sequences
- **121 Mental Models** - Comprehensive collection across decision-making, systems thinking, biases, and more
- **Model Connections** - Each model links to 3-4 adjacent models with explanations of why they're related

## Tech Stack

- [Vite](https://vitejs.dev/) - Build tool and dev server
- [React 19](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Cytoscape.js](https://js.cytoscape.org/) - Graph visualization
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/sonnybardhan/Lattice-Network-Diagram-Proof-of-Concept-.git
cd Lattice-Network-Diagram-Proof-of-Concept-

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:5173

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── App.tsx              # Main app with routing and state
│   ├── shared/              # Reusable components
│   │   ├── FilterPanel.tsx  # L1/L2 question interface
│   │   ├── GraphContainer.tsx
│   │   ├── ModelCard.tsx
│   │   └── Navigation.tsx
│   └── views/               # Main view components
│       ├── FilteredSubgraph.tsx
│       ├── EgoNetwork.tsx
│       ├── TagClusterView.tsx
│       └── LearningPath.tsx
├── data/
│   ├── models.ts            # 121 mental models
│   ├── tags.ts              # 12 category tags with L1/L2 questions
│   ├── edges.ts             # Model connections
│   └── learningPaths.ts     # Curated learning sequences
├── hooks/
│   ├── useFilterLogic.ts    # L1/L2 filtering state
│   └── useGraphLayout.ts    # Cytoscape layout configs
├── types/
│   └── index.ts             # TypeScript interfaces
└── utils/
    └── graphUtils.ts        # Graph manipulation helpers
```

## How It Works

### L1/L2 Filtering Algorithm

1. User answers 12 L1 yes/no questions (one per tag category)
2. System collects models from "yes" tags into L1 Pool
3. If pool ≤ 6 models: show results in Filtered Subgraph view
4. If pool > 6 models: show L2 refinement questions for top 3 tags
5. User refines selection → Final pool of ≤ 6 actionable models

### Graph Layouts

- **Concentric Layout** - Used for Ego Network (focus node in center, connections in outer ring)
- **Cose Layout** - Force-directed physics simulation for Filtered Subgraph and Tag Clusters

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

MIT
