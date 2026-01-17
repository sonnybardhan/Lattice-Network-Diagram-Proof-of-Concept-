import { useRef, useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';

interface GraphContainerProps {
  elements: cytoscape.ElementDefinition[];
  layout: cytoscape.LayoutOptions;
  onNodeClick?: (nodeId: string) => void;
  focusNodeId?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'ego' | 'filtered' | 'cluster';
}

// Neural Constellation graph styles
const graphStyles: cytoscape.StylesheetStyle[] = [
  // Base node style - luminous orbs
  {
    selector: 'node',
    style: {
      'background-color': '#8b5cf6',
      'background-opacity': 0.9,
      'label': 'data(label)',
      'color': '#f0f0f5',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'font-size': '11px',
      'font-family': 'Sora, sans-serif',
      'font-weight': 500,
      'text-margin-y': 10,
      'width': 44,
      'height': 44,
      'text-wrap': 'wrap',
      'text-max-width': '90px',
      'text-outline-color': '#0a0a0f',
      'text-outline-width': 2,
      'border-width': 2,
      'border-color': '#00f5ff',
      'border-opacity': 0.6,
      // Glow effect via overlay
      'overlay-padding': 8,
      'overlay-opacity': 0,
      'transition-property': 'background-color, border-color, width, height, border-width',
      'transition-duration': 300,
    } as any,
  },
  // Focus node - central glowing neuron
  {
    selector: 'node.focus',
    style: {
      'background-color': '#00f5ff',
      'background-opacity': 1,
      'width': 70,
      'height': 70,
      'font-weight': 600,
      'font-size': '13px',
      'border-width': 4,
      'border-color': '#ffffff',
      'border-opacity': 0.9,
      'text-margin-y': 14,
      'z-index': 999,
    } as any,
  },
  // Hover state - pulse effect
  {
    selector: 'node:hover',
    style: {
      'background-color': '#00f5ff',
      'border-color': '#ffffff',
      'border-width': 3,
      'cursor': 'pointer',
      'width': 52,
      'height': 52,
    } as any,
  },
  // Adjacent nodes in ego view
  {
    selector: 'node.adjacent',
    style: {
      'background-color': '#ff00aa',
      'border-color': '#ff00aa',
      'width': 40,
      'height': 40,
    } as any,
  },
  // Highlighted nodes
  {
    selector: 'node.highlighted',
    style: {
      'background-color': '#10b981',
      'border-color': '#10b981',
      'border-width': 3,
    } as any,
  },
  // Best fit node in filtered view
  {
    selector: 'node.best-fit',
    style: {
      'background-color': '#ffd700',
      'border-color': '#ffffff',
      'border-width': 4,
      'width': 60,
      'height': 60,
      'font-weight': 600,
      'font-size': '12px',
    } as any,
  },
  // Edge styles - synaptic connections
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#8b5cf640',
      'curve-style': 'bezier',
      'target-arrow-shape': 'none',
      'line-opacity': 0.6,
      'transition-property': 'line-color, width, line-opacity',
      'transition-duration': 300,
    } as any,
  },
  // Strong connection
  {
    selector: 'edge[strength = "strong"]',
    style: {
      'width': 3,
      'line-color': '#00f5ff60',
      'line-opacity': 0.8,
    } as any,
  },
  // Moderate connection
  {
    selector: 'edge[strength = "moderate"]',
    style: {
      'width': 2,
      'line-color': '#8b5cf650',
    } as any,
  },
  // Highlighted edge - glowing synapse
  {
    selector: 'edge.highlighted',
    style: {
      'line-color': '#00f5ff',
      'width': 4,
      'line-opacity': 1,
      'z-index': 999,
    } as any,
  },
  // Selected state
  {
    selector: ':selected',
    style: {
      'background-color': '#00f5ff',
      'border-color': '#ffffff',
      'line-color': '#00f5ff',
    } as any,
  },
];

export function GraphContainer({
  elements,
  layout,
  onNodeClick,
  focusNodeId,
  style,
  variant = 'default'
}: GraphContainerProps) {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (cyRef.current && focusNodeId) {
      cyRef.current.nodes().removeClass('focus');
      cyRef.current.$(`#${focusNodeId}`).addClass('focus');

      const focusNode = cyRef.current.$(`#${focusNodeId}`);
      if (focusNode.length > 0) {
        cyRef.current.animate({
          center: { eles: focusNode },
          duration: 500,
          easing: 'ease-out-cubic',
        });
      }
    }
  }, [focusNodeId]);

  useEffect(() => {
    if (cyRef.current && elements.length > 0) {
      cyRef.current.layout(layout).run();
    }
  }, [elements, layout]);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #12121a 0%, #1a1a2e 50%, #12121a 100%)',
        borderRadius: '20px',
        border: '1px solid rgba(139, 92, 246, 0.3)',
      }}
    >
      {/* Ambient glow effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 20% 30%, rgba(0, 245, 255, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 50% 50%, rgba(255, 0, 170, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Cytoscape graph */}
      <CytoscapeComponent
        elements={elements}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '400px',
          ...style
        }}
        stylesheet={graphStyles}
        layout={layout}
        cy={(cy) => {
          cyRef.current = cy;

          cy.on('tap', 'node', (evt) => {
            const nodeId = evt.target.id();
            onNodeClick?.(nodeId);
          });

          cy.on('mouseover', 'node', (evt) => {
            const node = evt.target;
            node.style('cursor', 'pointer');
            node.connectedEdges().addClass('highlighted');
            setIsHovering(true);
          });

          cy.on('mouseout', 'node', (evt) => {
            const node = evt.target;
            node.connectedEdges().removeClass('highlighted');
            setIsHovering(false);
          });

          if (focusNodeId) {
            cy.$(`#${focusNodeId}`).addClass('focus');
          }
        }}
        boxSelectionEnabled={false}
        autounselectify={true}
        userZoomingEnabled={true}
        userPanningEnabled={true}
        minZoom={0.3}
        maxZoom={2.5}
      />

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 1.3)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-medium transition-all duration-300"
          style={{
            background: 'rgba(26, 26, 46, 0.9)',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            color: '#f0f0f5',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#00f5ff';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          title="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => cyRef.current?.zoom(cyRef.current.zoom() / 1.3)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-medium transition-all duration-300"
          style={{
            background: 'rgba(26, 26, 46, 0.9)',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            color: '#f0f0f5',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#00f5ff';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          title="Zoom out"
        >
          −
        </button>
        <button
          onClick={() => cyRef.current?.fit(undefined, 50)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-semibold transition-all duration-300"
          style={{
            background: 'rgba(26, 26, 46, 0.9)',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            color: '#f0f0f5',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#00f5ff';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          title="Fit to screen"
        >
          FIT
        </button>
      </div>

      {/* Hover indicator */}
      {isHovering && (
        <div
          className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium animate-fade-in-up"
          style={{
            background: 'rgba(0, 245, 255, 0.15)',
            border: '1px solid rgba(0, 245, 255, 0.4)',
            color: '#00f5ff',
          }}
        >
          Click to explore
        </div>
      )}
    </div>
  );
}
