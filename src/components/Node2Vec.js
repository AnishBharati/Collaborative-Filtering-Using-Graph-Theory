import React, { useState } from "react";
import { graph, itemValues } from "../data/sampleData";

function Node2Vec({ userId, numWalks = 10, walkLength = 5 }) {
  const [result, setResult] = useState(null);
  const [uniqueItemValues, setUniqueItemValues] = useState([]); // To store unique item values

  const generateRandomWalks = (graph, userId, walkLength, numWalks) => {
    const walks = [];
    const seenPaths = new Set(); // To track unique paths
    const allItemValues = new Set(); // To track unique item values across all walks

    for (let i = 0; i < numWalks; i++) {
      let walk = [userId];
      let currentItemValues = new Set(); // To track item values for the current walk

      for (let j = 0; j < walkLength - 1; j++) {
        const current = walk[walk.length - 1];
        const next =
          graph[current] ? graph[current][Math.floor(Math.random() * graph[current].length)] : null;
        if (next) {
          walk.push(next);
          if (next.startsWith("item") && !currentItemValues.has(next)) {
            // Add item value if not already added for this walk
            allItemValues.add(itemValues[next] || "No value");
            currentItemValues.add(next);
          }
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

    // Convert allItemValues to an array and return the walks and unique item values
    return { walks, uniqueItemValues: Array.from(allItemValues) };
  };

  const handleRun = () => {
    const { walks, uniqueItemValues } = generateRandomWalks(graph, userId, walkLength, numWalks);
    const pathWithValues = walks.map((walk, index) => {
      return (
        <div key={index} className="mb-4">
          <h4 className="text-xl font-medium text-gray-700">Walk {index + 1}:</h4>
          <ul className="space-y-2 mt-2">
            {walk.map((node, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span className="text-gray-600">{node}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    });

    setResult(pathWithValues);
    setUniqueItemValues(uniqueItemValues); // Set the unique item values
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
          <>
            {result}
            {/* Display collected unique item values at the end of all walks */}
            {uniqueItemValues.length > 0 && (
              <div className="mt-4">
                <strong>Collected Item Values:</strong> {uniqueItemValues.join(", ")}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">No walks generated yet. Click the button to run.</p>
        )}
      </div>
    </div>
  );
}

export default Node2Vec;
