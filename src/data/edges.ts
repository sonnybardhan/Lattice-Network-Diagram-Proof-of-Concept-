import { Edge } from "../types";
import { models } from "./models";

// Generate edges from adjacentModels relationships
export const edges: Edge[] = [];

const addedPairs = new Set<string>();

models.forEach((model) => {
  model.adjacentModels.forEach((adjacentId) => {
    // Create a consistent key for the pair (alphabetically ordered)
    const pairKey = [model.id, adjacentId].sort().join("|");

    // Only add if we haven't seen this pair before
    if (!addedPairs.has(pairKey)) {
      addedPairs.add(pairKey);
      edges.push({
        source: model.id,
        target: adjacentId,
        strength: "strong", // Default to strong since they're explicitly listed
      });
    }
  });
});
