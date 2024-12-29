import React, { useState } from "react";
import { graph, itemValues } from "../data/sampleData";

function Node2Vec({ userId, numWalks = 10, walkLength = 5 }) {
  const [result, setResult] = useState(null);

  const generateRandomWalks = (graph, userId, walkLength, numWalks) => {
    const walks = [];
    const seenPaths = new Set(); // To track unique paths

    for (let i = 0; i < numWalks; i++) {
      let walk = [userId];
      for (let j = 0; j < walkLength - 1; j++) {
        const current = walk[walk.length - 1];
        const next =
          graph[current] ? graph[current][Math.floor(Math.random() * graph[current].length)] : null;
        if (next) {
          walk.push(next);
        } else {
          break;
        }
      }
      // Convert path to string for easy comparison and add it if not seen before
      const walkString = walk.join("->");
      if (!seenPaths.has(walkString)) {
        seenPaths.add(walkString);
        walks.push(walk);
      }
    }

    return walks;
  };

  const handleRun = () => {
    const walks = generateRandomWalks(graph, userId, walkLength, numWalks);
    const pathWithValues = walks.map((walk) => {
      return walk.map((node) => {
        if (node.startsWith("item")) {
          return {
            node: node,
            value: itemValues[node] || "No value"
          };
        }
        return node;
      });
    });
    setResult(pathWithValues);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <button
        className="w-full px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        onClick={handleRun}
      >
        Run Node2Vec
      </button>
      
      <h3 className="mt-6 text-2xl font-semibold text-gray-800">Node2Vec Results:</h3>
      
      <div className="mt-4 bg-gray-50 p-4 rounded-md">
        {result && result.length > 0 ? (
          result.map((walk, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-xl font-medium text-gray-700">Walk {index + 1}:</h4>
              <ul className="space-y-2 mt-2">
                {walk.map((node, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span className="text-gray-600">{node.node || node}</span>
                    {node.value && (
                      <span className="text-sm text-gray-500">
                        (Value: {node.value})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No walks generated yet. Click the button to run.</p>
        )}
      </div>
    </div>
  );
}

export default Node2Vec;
