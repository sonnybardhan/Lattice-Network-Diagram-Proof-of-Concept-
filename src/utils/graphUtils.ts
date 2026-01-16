import { MentalModel, Edge, Tag } from "../types";
import { edges } from "../data/edges";
import { models } from "../data/models";
import { tags } from "../data/tags";

/**
 * Cytoscape element definition for nodes and edges
 */
export interface CytoscapeElement {
  data: {
    id: string;
    label?: string;
    source?: string;
    target?: string;
    strength?: "strong" | "moderate";
    [key: string]: unknown;
  };
  classes?: string;
  position?: { x: number; y: number };
}

/**
 * Convert an array of model IDs to Cytoscape elements (nodes and edges)
 *
 * @param modelIds - Array of model IDs to include
 * @param allEdges - Array of all edges (defaults to imported edges)
 * @returns Array of Cytoscape-compatible element definitions
 *
 * @example
 * ```ts
 * const elements = modelsToCytoscapeElements(['pareto-principle', 'eisenhower-matrix']);
 * // Returns nodes for both models and any edges connecting them
 * ```
 */
export function modelsToCytoscapeElements(
  modelIds: string[],
  allEdges: Edge[] = edges
): CytoscapeElement[] {
  const nodeSet = new Set(modelIds);
  const modelMap = new Map(models.map((m) => [m.id, m]));

  // Create nodes for each model
  const nodes: CytoscapeElement[] = modelIds.map((id) => {
    const model = modelMap.get(id);
    return {
      data: {
        id,
        label: model?.name || id,
        tags: model?.tags || [],
        diagnosticQuestion: model?.diagnosticQuestion || "",
        keyInsight: model?.keyInsight || "",
      },
    };
  });

  // Only include edges where both endpoints are in the node set
  const relevantEdges = allEdges.filter(
    (e) => nodeSet.has(e.source) && nodeSet.has(e.target)
  );

  // Create edge elements
  const edgeElements: CytoscapeElement[] = relevantEdges.map((e, i) => ({
    data: {
      id: `edge-${e.source}-${e.target}-${i}`,
      source: e.source,
      target: e.target,
      strength: e.strength,
    },
  }));

  return [...nodes, ...edgeElements];
}

/**
 * Get the ego network for a model (the model plus all its adjacent models)
 *
 * @param modelId - The ID of the central model
 * @returns Array of model IDs including the central model and its adjacent models
 *
 * @example
 * ```ts
 * const network = getEgoNetwork('pareto-principle');
 * // Returns ['pareto-principle', 'eisenhower-matrix', 'leverage-points', ...]
 * ```
 */
export function getEgoNetwork(modelId: string): string[] {
  const model = models.find((m) => m.id === modelId);
  if (!model) return [modelId];

  // Return the model ID first, then all adjacent models
  return [modelId, ...model.adjacentModels];
}

/**
 * Get a model by its ID
 *
 * @param id - The model ID to look up
 * @returns The MentalModel object or undefined if not found
 */
export function getModelById(id: string): MentalModel | undefined {
  return models.find((m) => m.id === id);
}

/**
 * Search models by name or diagnostic question
 *
 * @param query - The search query
 * @returns Array of matching MentalModel objects
 *
 * @example
 * ```ts
 * const results = searchModels('priority');
 * // Returns models with 'priority' in name or diagnostic question
 * ```
 */
export function searchModels(query: string): MentalModel[] {
  const lowerQuery = query.toLowerCase();
  return models.filter(
    (m) =>
      m.name.toLowerCase().includes(lowerQuery) ||
      m.diagnosticQuestion.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get all models for a specific tag
 *
 * @param tagId - The tag ID
 * @returns Array of MentalModel objects belonging to that tag
 */
export function getModelsByTag(tagId: string): MentalModel[] {
  const tag = tags.find((t) => t.id === tagId);
  if (!tag) return [];

  return models.filter((m) => tag.modelIds.includes(m.id));
}

/**
 * Get a tag by its ID
 *
 * @param tagId - The tag ID to look up
 * @returns The Tag object or undefined if not found
 */
export function getTagById(tagId: string): Tag | undefined {
  return tags.find((t) => t.id === tagId);
}

/**
 * Create Cytoscape elements for an ego network view
 *
 * @param modelId - The central model ID
 * @returns Cytoscape elements with the ego model marked with a 'focus' class
 */
export function createEgoNetworkElements(modelId: string): CytoscapeElement[] {
  const networkIds = getEgoNetwork(modelId);
  const elements = modelsToCytoscapeElements(networkIds);

  // Mark the focus node with a class
  return elements.map((el) => {
    if (el.data.id === modelId && !el.data.source) {
      return {
        ...el,
        classes: "focus",
      };
    }
    return el;
  });
}

/**
 * Create Cytoscape elements for a tag cluster view
 *
 * @param tagId - The tag ID to visualize
 * @returns Cytoscape elements for all models in that tag
 */
export function createTagClusterElements(tagId: string): CytoscapeElement[] {
  const tag = tags.find((t) => t.id === tagId);
  if (!tag) return [];

  return modelsToCytoscapeElements(tag.modelIds);
}

/**
 * Generate edges from adjacentModels relationships
 * This creates edges based on the adjacentModels property of each model
 *
 * @param modelIds - Array of model IDs to consider
 * @returns Array of Edge objects derived from adjacentModels
 */
export function generateEdgesFromAdjacent(modelIds: string[]): Edge[] {
  const nodeSet = new Set(modelIds);
  const edgeSet = new Set<string>();
  const generatedEdges: Edge[] = [];

  modelIds.forEach((id) => {
    const model = models.find((m) => m.id === id);
    if (!model) return;

    model.adjacentModels.forEach((adjacentId) => {
      // Only include edges where both nodes are in our set
      if (!nodeSet.has(adjacentId)) return;

      // Create a consistent edge ID to avoid duplicates
      const edgeKey =
        id < adjacentId ? `${id}-${adjacentId}` : `${adjacentId}-${id}`;

      if (!edgeSet.has(edgeKey)) {
        edgeSet.add(edgeKey);
        generatedEdges.push({
          source: id,
          target: adjacentId,
          strength: "moderate", // Default to moderate since we don't have explicit strength
        });
      }
    });
  });

  return generatedEdges;
}

/**
 * Create Cytoscape elements using adjacentModels relationships
 * This is useful when the edges.ts file is empty but you want to visualize connections
 *
 * @param modelIds - Array of model IDs to include
 * @returns Cytoscape elements with edges derived from adjacentModels
 */
export function modelsToCytoscapeElementsWithAdjacent(
  modelIds: string[]
): CytoscapeElement[] {
  const generatedEdges = generateEdgesFromAdjacent(modelIds);
  return modelsToCytoscapeElements(modelIds, generatedEdges);
}

/**
 * Get the degree (number of connections) for each model in a set
 *
 * @param modelIds - Array of model IDs
 * @returns Map of model ID to degree count
 */
export function getModelDegrees(modelIds: string[]): Map<string, number> {
  const nodeSet = new Set(modelIds);
  const degrees = new Map<string, number>();

  // Initialize all degrees to 0
  modelIds.forEach((id) => degrees.set(id, 0));

  // Count connections from adjacentModels
  modelIds.forEach((id) => {
    const model = models.find((m) => m.id === id);
    if (!model) return;

    model.adjacentModels.forEach((adjacentId) => {
      if (nodeSet.has(adjacentId)) {
        degrees.set(id, (degrees.get(id) || 0) + 1);
      }
    });
  });

  return degrees;
}

/**
 * Find the most connected models in a set
 *
 * @param modelIds - Array of model IDs to analyze
 * @param topN - Number of top models to return (default 5)
 * @returns Array of model IDs sorted by degree (most connected first)
 */
export function getMostConnectedModels(
  modelIds: string[],
  topN: number = 5
): string[] {
  const degrees = getModelDegrees(modelIds);

  return [...degrees.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([id]) => id);
}

/**
 * Get all unique tags from a set of models
 *
 * @param modelIds - Array of model IDs
 * @returns Array of unique tag IDs
 */
export function getTagsFromModels(modelIds: string[]): string[] {
  const tagSet = new Set<string>();

  modelIds.forEach((id) => {
    const model = models.find((m) => m.id === id);
    if (model) {
      model.tags.forEach((tag) => tagSet.add(tag));
    }
  });

  return Array.from(tagSet);
}

/**
 * Get the "why adjacent" explanation between two models
 *
 * @param fromModelId - The source model ID
 * @param toModelId - The target model ID
 * @returns The explanation string or undefined if not found
 */
export function getWhyAdjacent(
  fromModelId: string,
  toModelId: string
): string | undefined {
  const model = models.find((m) => m.id === fromModelId);
  if (!model) return undefined;

  return model.whyAdjacent[toModelId];
}

/**
 * Create a learning path visualization
 *
 * @param modelSequence - Ordered array of model IDs in the learning path
 * @returns Cytoscape elements with sequential edges
 */
export function createLearningPathElements(
  modelSequence: string[]
): CytoscapeElement[] {
  const modelMap = new Map(models.map((m) => [m.id, m]));

  // Create nodes
  const nodes: CytoscapeElement[] = modelSequence.map((id, index) => {
    const model = modelMap.get(id);
    return {
      data: {
        id,
        label: model?.name || id,
        order: index + 1, // 1-indexed order
      },
      classes: index === 0 ? "start" : index === modelSequence.length - 1 ? "end" : "",
    };
  });

  // Create sequential edges
  const sequentialEdges: CytoscapeElement[] = [];
  for (let i = 0; i < modelSequence.length - 1; i++) {
    sequentialEdges.push({
      data: {
        id: `path-edge-${i}`,
        source: modelSequence[i],
        target: modelSequence[i + 1],
        strength: "strong" as const,
      },
    });
  }

  return [...nodes, ...sequentialEdges];
}

/**
 * Get all models (useful for full graph visualization)
 *
 * @returns Array of all model IDs
 */
export function getAllModelIds(): string[] {
  return models.map((m) => m.id);
}

/**
 * Get all tags
 *
 * @returns Array of all Tag objects
 */
export function getAllTags(): Tag[] {
  return tags;
}
