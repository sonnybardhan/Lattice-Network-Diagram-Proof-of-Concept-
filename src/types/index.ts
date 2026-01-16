export interface MentalModel {
  id: string;
  name: string;
  tags: string[];
  diagnosticQuestion: string;
  keyInsight: string;
  redFlagPhrases: string[];
  adjacentModels: string[];
  whyAdjacent: Record<string, string>;
}

export interface Tag {
  id: string;
  name: string;
  l1Question: string;
  l2Question: string;
  l2Options: L2Option[];
  modelIds: string[];
}

export interface L2Option {
  text: string;
  modelIds: string[];
}

export interface Edge {
  source: string;
  target: string;
  strength: "strong" | "moderate";
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  modelSequence: string[];
}

export type ViewType =
  | "filtered-subgraph"
  | "ego-network"
  | "tag-cluster"
  | "learning-path";
