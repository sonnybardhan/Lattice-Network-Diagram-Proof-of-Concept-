# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mental Models Visualization POC - A proof-of-concept React application for visualizing and exploring 121 mental models through interactive graph visualizations. The core feature is a filtering system that narrows models down to actionable clusters of 5-6 through guided L1/L2 questioning.

## Tech Stack

- Vite + React + TypeScript
- Cytoscape.js with react-cytoscapejs for graph rendering
- Tailwind CSS for styling
- All data is static (no backend)

## Commands

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Lint TypeScript/React files
```

## Architecture

### Four Main Views

1. **FilteredSubgraph** - Displays 4-6 filtered models after completing L1/L2 scenario questions
2. **EgoNetwork** - Deep dive on one model with its adjacent connections in concentric layout
3. **TagClusterView** - Browse all 121 models organized by 12 tags
4. **LearningPath** - Guided sequential learning through curated model sequences

### Data Flow

```
App.tsx (State Manager)
├── FilterPanel → L1/L2 Questions → FilteredSubgraph
├── TagClusterView → Click tag → Expand graph → Click model → EgoNetwork
├── EgoNetwork → Click adjacent model → Navigate to new EgoNetwork
└── LearningPath → Progress through curated sequences
```

### Key Hooks

- **useFilterLogic** - Manages L1/L2 answer state and computes filtered model sets (must return ≤6 models)
- **useGraphLayout** - Cytoscape layout configuration (concentric for ego-networks, cose for force-directed)

### L1/L2 Filtering Algorithm

1. User answers 12 L1 yes/no questions (one per tag)
2. System collects models from "yes" tags → L1 Pool
3. If pool ≤6: done, show FilteredSubgraph
4. If pool >6: show L2 questions for top 3 tags by model count
5. User refines with L2 options → Final pool ≤6

## Data Structure

- **121 mental models** in `src/data/models.ts` organized into 21 categories
- **12 tags** in `src/data/tags.ts` with L1/L2 questions
- **Edges** generated from `adjacentModels` arrays (each model has 3-4 adjacent models)
- **Learning paths** in `src/data/learningPaths.ts` (3+ curated sequences)

### Core Types (in `src/types/index.ts`)

```typescript
interface MentalModel {
  id: string;
  name: string;
  tags: string[];
  diagnosticQuestion: string;
  keyInsight: string;
  redFlagPhrases: string[];
  adjacentModels: string[];
  whyAdjacent: Record<string, string>;
}
```

## Graph Layout Requirements

- **Concentric layout**: Use for EgoNetwork (focus node in center, adjacents in ring)
- **Cose layout**: Use for FilteredSubgraph and TagCluster (force-directed physics-based)
- Graph views must be responsive across mobile/tablet/desktop

## Reference Document

The complete specification with all 121 models, type definitions, and component specifications is in `initial prompt.md`.
