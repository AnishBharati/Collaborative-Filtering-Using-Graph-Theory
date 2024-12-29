// src/components/GraphVisualization.js
import React from 'react';
import { Graph } from 'react-d3-graph';
import { graph } from '../data/sampleData';

function GraphVisualization({ userId }) {
  const data = {
    nodes: [],
    links: [],
  };

  // Prepare nodes and edges based on the graph data
  Object.keys(graph).forEach((node) => {
    if (node.startsWith('user') || node.startsWith('item')) {
      data.nodes.push({ id: node });
      graph[node].forEach((neighbor) => {
        if (neighbor.startsWith('user') || neighbor.startsWith('item')) {
          data.links.push({ source: node, target: neighbor });
        }
      });
    }
  });

  const config = {
    nodeHighlightBehavior: true,
    node: {
      color: 'lightblue',
      size: 200,
      highlightStrokeColor: 'blue',
    },
    link: {
      highlightColor: 'blue',
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Graph Visualization</h3>
      <Graph
        id="graph-id"
        data={data}
        config={config}
        className="w-full h-96"
      />
    </div>
  );
}

export default GraphVisualization;
