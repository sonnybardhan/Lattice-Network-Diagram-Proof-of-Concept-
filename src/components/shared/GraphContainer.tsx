import { useRef, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';

interface GraphContainerProps {
  elements: cytoscape.ElementDefinition[];
  layout: cytoscape.LayoutOptions;
  onNodeClick?: (nodeId: string) => void;
  focusNodeId?: string;
  style?: React.CSSProperties;
}

const graphStyles: any[] = [
  {
    selector: 'node',
    style: {
      'background-color': '#6366f1',
      'label': 'data(label)',
      'color': '#1f2937',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'font-size': '12px',
      'text-margin-y': 8,
      'width': 40,
      'height': 40,
      'text-wrap': 'wrap',
      'text-max-width': '100px',
    }
  },
  {
    selector: 'node.focus',
    style: {
      'background-color': '#4f46e5',
      'width': 60,
      'height': 60,
      'font-weight': 'bold',
      'font-size': '14px',
      'border-width': 3,
      'border-color': '#312e81',
    }
  },
  {
    selector: 'node:hover',
    style: {
      'background-color': '#4338ca',
      'cursor': 'pointer',
    }
  },
  {
    selector: 'node.adjacent',
    style: {
      'background-color': '#818cf8',
      'width': 36,
      'height': 36,
    }
  },
  {
    selector: 'node.highlighted',
    style: {
      'background-color': '#10b981',
      'border-width': 2,
      'border-color': '#059669',
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#d1d5db',
      'curve-style': 'bezier',
      'target-arrow-shape': 'none',
    }
  },
  {
    selector: 'edge[strength = "strong"]',
    style: {
      'width': 3,
      'line-color': '#9ca3af',
    }
  },
  {
    selector: 'edge[strength = "moderate"]',
    style: {
      'width': 2,
      'line-color': '#d1d5db',
    }
  },
  {
    selector: 'edge.highlighted',
    style: {
      'line-color': '#6366f1',
      'width': 3,
    }
  }
];

export function GraphContainer({
  elements,
  layout,
  onNodeClick,
  focusNodeId,
  style
}: GraphContainerProps) {
  const cyRef = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    if (cyRef.current && focusNodeId) {
      // Reset all node classes
      cyRef.current.nodes().removeClass('focus');
      // Add focus class to the specified node
      cyRef.current.$(`#${focusNodeId}`).addClass('focus');

      // Optionally center the view on the focus node
      const focusNode = cyRef.current.$(`#${focusNodeId}`);
      if (focusNode.length > 0) {
        cyRef.current.animate({
          center: { eles: focusNode },
          duration: 300,
        });
      }
    }
  }, [focusNodeId]);

  // Rerun layout when elements change
  useEffect(() => {
    if (cyRef.current && elements.length > 0) {
      cyRef.current.layout(layout).run();
    }
  }, [elements, layout]);

  return (
    <div className="relative w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <CytoscapeComponent
        elements={elements}
        style={{ width: '100%', height: '100%', minHeight: '400px', ...style }}
        stylesheet={graphStyles}
        layout={layout}
        cy={(cy) => {
          cyRef.current = cy;

          // Handle node click events
          cy.on('tap', 'node', (evt) => {
            const nodeId = evt.target.id();
            onNodeClick?.(nodeId);
          });

          // Add hover effects
          cy.on('mouseover', 'node', (evt) => {
            const node = evt.target;
            node.style('cursor', 'pointer');

            // Highlight connected edges
            node.connectedEdges().addClass('highlighted');
          });

          cy.on('mouseout', 'node', (evt) => {
            const node = evt.target;
            node.connectedEdges().removeClass('highlighted');
          });

          // Apply focus class if focusNodeId is provided
          if (focusNodeId) {
            cy.$(`#${focusNodeId}`).addClass('focus');
          }
        }}
        boxSelectionEnabled={false}
        autounselectify={true}
        userZoomingEnabled={true}
        userPanningEnabled={true}
        minZoom={0.3}
        maxZoom={2}
      />

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 1.2)}
          className="w-8 h-8 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 flex items-center justify-center text-gray-600"
          title="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => cyRef.current?.zoom(cyRef.current.zoom() / 1.2)}
          className="w-8 h-8 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 flex items-center justify-center text-gray-600"
          title="Zoom out"
        >
          -
        </button>
        <button
          onClick={() => cyRef.current?.fit(undefined, 50)}
          className="w-8 h-8 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 flex items-center justify-center text-gray-600 text-xs"
          title="Fit to screen"
        >
          Fit
        </button>
      </div>
    </div>
  );
}
