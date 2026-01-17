import { useState, useMemo, useCallback } from "react";
import { models } from "../data/models";
import { tags } from "../data/tags";
import { MentalModel, Tag, L2Option } from "../types";

export interface FilterState {
  l1Answers: Record<string, boolean>;
  l2Answers: Record<string, string>;
  l3Answers: Record<string, string>; // keyed by "tagId:l2OptionText"
}

export interface L3Context {
  tag: Tag;
  l2Option: L2Option;
  key: string; // "tagId:l2OptionText"
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
  /** Current L3 (refinement) answers keyed by "tagId:l2OptionText" */
  l3Answers: Record<string, string>;
  /** Set L3 answers */
  setL3Answers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  /** Model IDs from all tags answered "yes" at L1 level */
  l1Pool: string[];
  /** Tags that need L2 questions (top 3 by model count from "yes" answers) */
  tagsNeedingL2: Tag[];
  /** Pool after L2 filtering */
  l2Pool: string[];
  /** L2 options that need L3 refinement (have L3 questions and pool still > 5) */
  l2OptionsNeedingL3: L3Context[];
  /** Final filtered pool of model IDs after L2/L3 filtering */
  finalPool: string[];
  /** Actual MentalModel objects for the final pool */
  filteredModels: MentalModel[];
  /** Whether L2 filtering is needed (L1 pool > 6) */
  needsL2: boolean;
  /** Whether L3 filtering is needed (L2 pool > 5) */
  needsL3: boolean;
  /** Reset all filter state */
  resetFilters: () => void;
  /** Toggle a single L1 answer */
  toggleL1Answer: (tagId: string) => void;
  /** Set a single L2 answer */
  setL2Answer: (tagId: string, optionText: string) => void;
  /** Set a single L3 answer */
  setL3Answer: (key: string, optionText: string) => void;
  /** Get the count of models that would be selected for a given L1 state */
  getL1PoolCount: () => number;
  /** Check if filtering is complete (has selections and final pool ≤ 5) */
  isFilteringComplete: boolean;
}

export function useFilterLogic(): FilterLogicReturn {
  const [l1Answers, setL1Answers] = useState<Record<string, boolean>>({});
  const [l2Answers, setL2Answers] = useState<Record<string, string>>({});
  const [l3Answers, setL3Answers] = useState<Record<string, string>>({});

  // Get all model IDs from "yes" tags (deduplicated)
  const l1Pool = useMemo(() => {
    const modelIds = new Set<string>();

    tags.forEach((tag) => {
      if (l1Answers[tag.id]) {
        tag.modelIds.forEach((id) => modelIds.add(id));
      }
    });

    return Array.from(modelIds);
  }, [l1Answers]);

  // Get tags that need L2 questions (top 3 by model count from "yes" answers)
  const tagsNeedingL2 = useMemo(() => {
    return tags
      .filter((tag) => l1Answers[tag.id])
      .sort((a, b) => b.modelIds.length - a.modelIds.length)
      .slice(0, 3);
  }, [l1Answers]);

  // Whether L2 filtering is needed (L1 pool > 6)
  const needsL2 = l1Pool.length > 6;

  // Calculate L2 pool (after L2 filtering, before L3)
  const l2Pool = useMemo(() => {
    // If L1 pool is already small enough, no need for L2 filtering
    if (l1Pool.length <= 6) {
      return l1Pool;
    }

    const modelIds = new Set<string>();

    tagsNeedingL2.forEach((tag) => {
      const selectedOption = l2Answers[tag.id];
      if (selectedOption) {
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

  // Whether L3 filtering is needed (L2 pool > 5)
  const needsL3 = l2Pool.length > 5;

  // Find L2 options that need L3 refinement
  const l2OptionsNeedingL3 = useMemo((): L3Context[] => {
    if (!needsL3) return [];

    const contexts: L3Context[] = [];

    tagsNeedingL2.forEach((tag) => {
      const selectedL2Text = l2Answers[tag.id];
      if (selectedL2Text) {
        const l2Option = tag.l2Options.find((o) => o.text === selectedL2Text);
        // Only include if this L2 option has L3 questions defined
        if (l2Option?.l3Question && l2Option.l3Options && l2Option.modelIds.length >= 2) {
          contexts.push({
            tag,
            l2Option,
            key: `${tag.id}:${selectedL2Text}`,
          });
        }
      }
    });

    // Sort by model count (largest first) and take top 2
    return contexts
      .sort((a, b) => b.l2Option.modelIds.length - a.l2Option.modelIds.length)
      .slice(0, 2);
  }, [needsL3, tagsNeedingL2, l2Answers]);

  // Apply L3 filtering to get final pool
  const finalPool = useMemo(() => {
    // If L2 pool is small enough, no L3 needed
    if (l2Pool.length <= 5) {
      return l2Pool;
    }

    // Start with L2 pool and apply L3 refinements
    const modelIds = new Set<string>();

    tagsNeedingL2.forEach((tag) => {
      const selectedL2Text = l2Answers[tag.id];
      if (selectedL2Text) {
        const l2Option = tag.l2Options.find((o) => o.text === selectedL2Text);
        if (l2Option) {
          const l3Key = `${tag.id}:${selectedL2Text}`;
          const selectedL3Text = l3Answers[l3Key];

          // Check if this L2 option has L3 and we have an answer
          if (l2Option.l3Options && selectedL3Text) {
            const l3Option = l2Option.l3Options.find((o) => o.text === selectedL3Text);
            if (l3Option) {
              modelIds.add(l3Option.modelId);
            }
          } else {
            // No L3 answer, include all models from L2 option
            l2Option.modelIds.forEach((id) => modelIds.add(id));
          }
        }
      } else {
        // No L2 answer, include all models from tag
        tag.modelIds.forEach((id) => modelIds.add(id));
      }
    });

    return Array.from(modelIds);
  }, [l2Pool, l2Answers, l3Answers, tagsNeedingL2]);

  // Get the actual model objects
  const filteredModels = useMemo(() => {
    return models.filter((m) => finalPool.includes(m.id));
  }, [finalPool]);

  // Check if filtering is complete (final pool ≤ 5)
  const isFilteringComplete = useMemo(() => {
    const hasL1Selections = Object.values(l1Answers).some((v) => v);
    if (!hasL1Selections) return false;

    // Target is ≤5 models
    return finalPool.length <= 5 && finalPool.length > 0;
  }, [l1Answers, finalPool]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setL1Answers({});
    setL2Answers({});
    setL3Answers({});
  }, []);

  // Toggle a single L1 answer
  const toggleL1Answer = useCallback((tagId: string) => {
    setL1Answers((prev) => ({
      ...prev,
      [tagId]: !prev[tagId],
    }));
    // Clear L2 and L3 answers when L1 changes
    setL2Answers({});
    setL3Answers({});
  }, []);

  // Set a single L2 answer
  const setL2Answer = useCallback((tagId: string, optionText: string) => {
    setL2Answers((prev) => ({
      ...prev,
      [tagId]: optionText,
    }));
    // Clear L3 answers for this tag when L2 changes
    setL3Answers((prev) => {
      const newAnswers = { ...prev };
      Object.keys(newAnswers).forEach((key) => {
        if (key.startsWith(`${tagId}:`)) {
          delete newAnswers[key];
        }
      });
      return newAnswers;
    });
  }, []);

  // Set a single L3 answer
  const setL3Answer = useCallback((key: string, optionText: string) => {
    setL3Answers((prev) => ({
      ...prev,
      [key]: optionText,
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
    l3Answers,
    setL3Answers,
    l1Pool,
    tagsNeedingL2,
    l2Pool,
    l2OptionsNeedingL3,
    finalPool,
    filteredModels,
    needsL2,
    needsL3,
    resetFilters,
    toggleL1Answer,
    setL2Answer,
    setL3Answer,
    getL1PoolCount,
    isFilteringComplete,
  };
}
