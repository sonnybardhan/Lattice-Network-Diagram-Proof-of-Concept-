import { useMemo } from "react";

export type LayoutType =
  | "concentric"
  | "cose"
  | "grid"
  | "breadthfirst"
  | "circle"
  | "preset";

export interface LayoutOptions {
  name: string;
  [key: string]: unknown;
}

export interface ConcentricLayoutOptions extends LayoutOptions {
  name: "concentric";
  concentric: (node: { id: () => string }) => number;
  levelWidth: () => number;
  minNodeSpacing: number;
  animate: boolean;
  animationDuration: number;
}

export interface CoseLayoutOptions extends LayoutOptions {
  name: "cose";
  idealEdgeLength: number;
  nodeOverlap: number;
  refresh: number;
  fit: boolean;
  padding: number;
  randomize: boolean;
  componentSpacing: number;
  nodeRepulsion: number;
  edgeElasticity: number;
  nestingFactor: number;
  gravity: number;
  numIter: number;
  animate: boolean;
  animationDuration: number;
}

export interface GridLayoutOptions extends LayoutOptions {
  name: "grid";
  fit: boolean;
  padding: number;
  avoidOverlap: boolean;
  avoidOverlapPadding: number;
  condense: boolean;
  animate: boolean;
  animationDuration: number;
  rows?: number;
  cols?: number;
}

export interface BreadthfirstLayoutOptions extends LayoutOptions {
  name: "breadthfirst";
  fit: boolean;
  directed: boolean;
  padding: number;
  circle: boolean;
  spacingFactor: number;
  avoidOverlap: boolean;
  roots?: string;
  animate: boolean;
  animationDuration: number;
}

export interface CircleLayoutOptions extends LayoutOptions {
  name: "circle";
  fit: boolean;
  padding: number;
  avoidOverlap: boolean;
  startAngle: number;
  sweep?: number;
  clockwise: boolean;
  animate: boolean;
  animationDuration: number;
}

export interface PresetLayoutOptions extends LayoutOptions {
  name: "preset";
  fit: boolean;
  padding: number;
  animate: boolean;
  animationDuration: number;
}

export type AllLayoutOptions =
  | ConcentricLayoutOptions
  | CoseLayoutOptions
  | GridLayoutOptions
  | BreadthfirstLayoutOptions
  | CircleLayoutOptions
  | PresetLayoutOptions
  | LayoutOptions;

/**
 * Hook for generating Cytoscape layout configurations
 *
 * @param layoutType - The type of layout to use
 * @param focusNodeId - Optional node ID to focus on (used for concentric and breadthfirst layouts)
 * @returns A Cytoscape-compatible layout configuration object
 *
 * @example
 * ```tsx
 * const layout = useGraphLayout('concentric', 'eisenhower-matrix');
 * // Use layout in CytoscapeComponent
 * <CytoscapeComponent elements={elements} layout={layout} />
 * ```
 */
export function useGraphLayout(
  layoutType: LayoutType,
  focusNodeId?: string
): AllLayoutOptions {
  const layout = useMemo(() => {
    switch (layoutType) {
      case "concentric":
        return {
          name: "concentric" as const,
          concentric: (node: { id: () => string }) => {
            // Focus node gets highest priority (center)
            return node.id() === focusNodeId ? 2 : 1;
          },
          levelWidth: () => 1,
          minNodeSpacing: 50,
          animate: true,
          animationDuration: 500,
        };

      case "cose":
        return {
          name: "cose" as const,
          idealEdgeLength: 100,
          nodeOverlap: 20,
          refresh: 20,
          fit: true,
          padding: 30,
          randomize: false,
          componentSpacing: 100,
          nodeRepulsion: 400000,
          edgeElasticity: 100,
          nestingFactor: 5,
          gravity: 80,
          numIter: 1000,
          animate: true,
          animationDuration: 500,
        };

      case "grid":
        return {
          name: "grid" as const,
          fit: true,
          padding: 30,
          avoidOverlap: true,
          avoidOverlapPadding: 10,
          condense: false,
          animate: true,
          animationDuration: 500,
        };

      case "breadthfirst":
        return {
          name: "breadthfirst" as const,
          fit: true,
          directed: false,
          padding: 30,
          circle: false,
          spacingFactor: 1.5,
          avoidOverlap: true,
          roots: focusNodeId ? `#${focusNodeId}` : undefined,
          animate: true,
          animationDuration: 500,
        };

      case "circle":
        return {
          name: "circle" as const,
          fit: true,
          padding: 30,
          avoidOverlap: true,
          startAngle: (3 / 2) * Math.PI, // Start from top
          clockwise: true,
          animate: true,
          animationDuration: 500,
        };

      case "preset":
        return {
          name: "preset" as const,
          fit: true,
          padding: 30,
          animate: true,
          animationDuration: 500,
        };

      default:
        // Default to cose layout
        return {
          name: "cose" as const,
          idealEdgeLength: 100,
          nodeOverlap: 20,
          refresh: 20,
          fit: true,
          padding: 30,
          randomize: false,
          componentSpacing: 100,
          nodeRepulsion: 400000,
          edgeElasticity: 100,
          nestingFactor: 5,
          gravity: 80,
          numIter: 1000,
          animate: true,
          animationDuration: 500,
        };
    }
  }, [layoutType, focusNodeId]);

  return layout;
}

/**
 * Get a layout optimized for a specific number of nodes
 *
 * @param nodeCount - The number of nodes in the graph
 * @param focusNodeId - Optional focus node ID
 * @returns The recommended layout type for the given node count
 */
export function getRecommendedLayout(
  nodeCount: number,
  focusNodeId?: string
): LayoutType {
  if (nodeCount <= 3) {
    return "circle";
  }
  if (nodeCount <= 6) {
    return focusNodeId ? "concentric" : "cose";
  }
  if (nodeCount <= 12) {
    return focusNodeId ? "concentric" : "cose";
  }
  if (nodeCount <= 20) {
    return "cose";
  }
  // For large graphs, grid provides predictable layout
  return "grid";
}

/**
 * Hook that automatically selects an appropriate layout based on node count
 *
 * @param nodeCount - The number of nodes in the graph
 * @param focusNodeId - Optional node ID to focus on
 * @returns A Cytoscape-compatible layout configuration object
 */
export function useAutoGraphLayout(
  nodeCount: number,
  focusNodeId?: string
): AllLayoutOptions {
  const layoutType = useMemo(
    () => getRecommendedLayout(nodeCount, focusNodeId),
    [nodeCount, focusNodeId]
  );

  return useGraphLayout(layoutType, focusNodeId);
}
