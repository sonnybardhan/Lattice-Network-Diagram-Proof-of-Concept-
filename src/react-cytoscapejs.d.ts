declare module 'react-cytoscapejs' {
  import cytoscape from 'cytoscape';
  import { Component, CSSProperties } from 'react';

  interface CytoscapeComponentProps {
    elements: cytoscape.ElementDefinition[];
    stylesheet?: any[];
    style?: CSSProperties;
    layout?: cytoscape.LayoutOptions;
    cy?: (cy: cytoscape.Core) => void;
    pan?: cytoscape.Position;
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    zoomingEnabled?: boolean;
    userZoomingEnabled?: boolean;
    userPanningEnabled?: boolean;
    panningEnabled?: boolean;
    boxSelectionEnabled?: boolean;
    autoungrabify?: boolean;
    autounselectify?: boolean;
  }

  export default class CytoscapeComponent extends Component<CytoscapeComponentProps> {}
}
