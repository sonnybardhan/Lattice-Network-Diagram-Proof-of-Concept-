import { useState, useMemo, useCallback } from "react";
import { models } from "../data/models";
import { tags } from "../data/tags";
import { MentalModel, Tag } from "../types";

export interface FilterState {
  l1Answers: Record<string, boolean>;
  l2Answers: Record<string, string>;
}

export interface FilterLogicReturn {
  /** Current L1 (yes/no) answers keyed by tag ID */
  l1Answers: Record<string, boolean>;
  /** Set L1 answers */
  setL1Answers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  /** Current L2 (option selection) answers keyed by tag ID */
  l2Answers: Record<string, string>;
  /** Set L2 answers */
  setL2Answers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  /** Model IDs from all tags answered "yes" at L1 level */
  l1Pool: string[];
  /** Tags that need L2 questions (top 3 by model count from "yes" answers) */
  tagsNeedingL2: Tag[];
  /** Final filtered pool of model IDs after L2 filtering */
  finalPool: string[];
  /** Actual MentalModel objects for the final pool */
  filteredModels: MentalModel[];
  /** Whether L2 filtering is needed (L1 pool > 6) */
  needsL2: boolean;
  /** Reset all filter state */
  resetFilters: () => void;
  /** Toggle a single L1 answer */
  toggleL1Answer: (tagId: string) => void;
  /** Set a single L2 answer */
  setL2Answer: (tagId: string, optionText: string) => void;
  /** Get the count of models that would be selected for a given L1 state */
  getL1PoolCount: () => number;
  /** Check if filtering is complete (has selections and final pool is manageable) */
  isFilteringComplete: boolean;
}

export function useFilterLogic(): FilterLogicReturn {
  const [l1Answers, setL1Answers] = useState<Record<string, boolean>>({});
  const [l2Answers, setL2Answers] = useState<Record<string, string>>({});

  // Get all model IDs from "yes" tags
  const l1Pool = useMemo(() => {
    const modelIds = new Set<string>();

    tags.forEach((tag) => {
      if (l1Answers[tag.id]) {
        tag.modelIds.forEach((id) => modelIds.add(id));
      }
    });

    return Array.from(modelIds);
  }, [l1Answers]);

  // Get tags that need L2 questions (those with "yes" answers)
  const tagsNeedingL2 = useMemo(() => {
    return tags
      .filter((tag) => l1Answers[tag.id])
      .sort((a, b) => b.modelIds.length - a.modelIds.length)
      .slice(0, 3); // Top 3 by model count
  }, [l1Answers]);

  // Apply L2 filtering
  const finalPool = useMemo(() => {
    // If L1 pool is already small enough, no need for L2 filtering
    if (l1Pool.length <= 6) {
      return l1Pool;
    }

    const modelIds = new Set<string>();

    tagsNeedingL2.forEach((tag) => {
      const selectedOption = l2Answers[tag.id];
      if (selectedOption) {
        // Find the selected L2 option and get its models
        const option = tag.l2Options.find((o) => o.text === selectedOption);
        if (option) {
          option.modelIds.forEach((id) => modelIds.add(id));
        }
      } else {
        // If no L2 answer yet, include all models from this tag
        tag.modelIds.forEach((id) => modelIds.add(id));
      }
    });

    return Array.from(modelIds);
  }, [l1Pool, l2Answers, tagsNeedingL2]);

  // Get the actual model objects
  const filteredModels = useMemo(() => {
    return models.filter((m) => finalPool.includes(m.id));
  }, [finalPool]);

  // Whether L2 filtering is needed
  const needsL2 = l1Pool.length > 6;

  // Check if filtering is complete
  const isFilteringComplete = useMemo(() => {
    // Must have at least one L1 selection
    const hasL1Selections = Object.values(l1Answers).some((v) => v);
    if (!hasL1Selections) return false;

    // If we don't need L2, we're done
    if (!needsL2) return true;

    // If we need L2, check if we have enough answers to narrow down
    // We consider it complete if the final pool is 6 or less
    return finalPool.length <= 6;
  }, [l1Answers, needsL2, finalPool]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setL1Answers({});
    setL2Answers({});
  }, []);

  // Toggle a single L1 answer
  const toggleL1Answer = useCallback((tagId: string) => {
    setL1Answers((prev) => ({
      ...prev,
      [tagId]: !prev[tagId],
    }));
    // Clear L2 answers when L1 changes since the context may be different
    setL2Answers({});
  }, []);

  // Set a single L2 answer
  const setL2Answer = useCallback((tagId: string, optionText: string) => {
    setL2Answers((prev) => ({
      ...prev,
      [tagId]: optionText,
    }));
  }, []);

  // Get the count of models in L1 pool
  const getL1PoolCount = useCallback(() => {
    return l1Pool.length;
  }, [l1Pool]);

  return {
    l1Answers,
    setL1Answers,
    l2Answers,
    setL2Answers,
    l1Pool,
    tagsNeedingL2,
    finalPool,
    filteredModels,
    needsL2,
    resetFilters,
    toggleL1Answer,
    setL2Answer,
    getL1PoolCount,
    isFilteringComplete,
  };
}
