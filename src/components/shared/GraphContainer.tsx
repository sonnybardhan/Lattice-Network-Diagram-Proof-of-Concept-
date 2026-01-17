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

// Apple-inspired minimal graph styles
const graphStyles: cytoscape.StylesheetStyle[] = [
  // Base node - clean, minimal
  {
    selector: 'node',
    style: {
      'background-color': '#ffffff',
      'background-opacity': 0.95,
      'label': 'data(label)',
      'color': 'rgba(255, 255, 255, 0.9)',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'font-size': '11px',
      'font-family': '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
      'font-weight': 500,
      'text-margin-y': 10,
      'width': 44,
      'height': 44,
      'text-wrap': 'wrap',
      'text-max-width': '88px',
      'text-outline-color': 'rgba(0, 0, 0, 0.8)',
      'text-outline-width': 1.5,
      'border-width': 0,
      'shadow-blur': 20,
      'shadow-color': 'rgba(0, 0, 0, 0.25)',
      'shadow-opacity': 1,
      'shadow-offset-x': 0,
      'shadow-offset-y': 4,
      'overlay-padding': 6,
      'overlay-opacity': 0,
      'transition-property': 'background-color, width, height, shadow-blur, shadow-opacity',
      'transition-duration': 250,
      'transition-timing-function': 'ease-out',
    } as any,
  },
  // Focus node - Apple blue accent
  {
    selector: 'node.focus',
    style: {
      'background-color': '#007AFF',
      'width': 56,
      'height': 56,
      'font-weight': 600,
      'font-size': '12px',
      'color': '#ffffff',
      'text-margin-y': 12,
      'shadow-blur': 30,
      'shadow-color': 'rgba(0, 122, 255, 0.4)',
      'shadow-offset-y': 6,
      'z-index': 999,
    } as any,
  },
  // Hover state - subtle lift
  {
    selector: 'node:hover',
    style: {
      'background-color': '#ffffff',
      'cursor': 'pointer',
      'width': 48,
      'height': 48,
      'shadow-blur': 28,
      'shadow-color': 'rgba(0, 0, 0, 0.2)',
      'shadow-offset-y': 8,
    } as any,
  },
  // Adjacent nodes
  {
    selector: 'node.adjacent',
    style: {
      'background-color': 'rgba(255, 255, 255, 0.85)',
      'width': 38,
      'height': 38,
    } as any,
  },
  // Highlighted nodes
  {
    selector: 'node.highlighted',
    style: {
      'background-color': '#34C759',
      'shadow-color': 'rgba(52, 199, 89, 0.4)',
    } as any,
  },
  // Best fit node
  {
    selector: 'node.best-fit',
    style: {
      'background-color': '#FF9500',
      'width': 52,
      'height': 52,
      'font-weight': 600,
      'font-size': '12px',
      'shadow-blur': 28,
      'shadow-color': 'rgba(255, 149, 0, 0.35)',
      'shadow-offset-y': 6,
    } as any,
  },
  // Edge styles - hairline connections
  {
    selector: 'edge',
    style: {
      'width': 1,
      'line-color': 'rgba(255, 255, 255, 0.2)',
      'curve-style': 'bezier',
      'target-arrow-shape': 'none',
      'line-cap': 'round',
      'transition-property': 'line-color, width, line-opacity',
      'transition-duration': 250,
    } as any,
  },
  // Strong connection
  {
    selector: 'edge[strength = "strong"]',
    style: {
      'width': 1.5,
      'line-color': 'rgba(255, 255, 255, 0.35)',
    } as any,
  },
  // Moderate connection
  {
    selector: 'edge[strength = "moderate"]',
    style: {
      'width': 1,
      'line-color': 'rgba(255, 255, 255, 0.2)',
    } as any,
  },
  // Highlighted edge
  {
    selector: 'edge.highlighted',
    style: {
      'line-color': 'rgba(0, 122, 255, 0.6)',
      'width': 2,
      'z-index': 999,
    } as any,
  },
  // Selected state
  {
    selector: ':selected',
    style: {
      'background-color': '#007AFF',
      'line-color': 'rgba(0, 122, 255, 0.6)',
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
        minZoom={0.5}
        maxZoom={2}
        {...{ wheelSensitivity: 0.2 } as any}
      />

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 1.2)}
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
          onClick={() => cyRef.current?.zoom(cyRef.current.zoom() / 1.2)}
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
