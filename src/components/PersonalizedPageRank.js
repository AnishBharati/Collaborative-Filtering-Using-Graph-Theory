import React, { useState } from "react";
import { graph, itemValues } from "../data/sampleData";

function PersonalizedPageRank({ userId }) {
  const [result, setResult] = useState(null);

  const personalizedPageRank = (graph, userId, alpha = 0.85, iterations = 100) => {
    const scores = {};
    const neighbors = graph[userId] || [];

    if (neighbors.length === 0) return "No recommendations found.";

    // Initialize scores for the neighbors
    for (let item of neighbors) {
      // Ensure item value exists in itemValues, otherwise default to 0
      scores[item] = itemValues[item] || 0;
    }

    // Perform the PageRank iterations
    for (let iter = 0; iter < iterations; iter++) {
      const updatedScores = {};

      // For each item in the current scores, update based on its neighbors
      for (let item in scores) {
        updatedScores[item] =
          alpha * scores[userId] + (1 - alpha) * getWeightedSum(item, scores, graph);
      }

      // Normalize the scores
      const sumScores = Object.values(updatedScores).reduce((a, b) => a + b, 0);
      if (sumScores === 0) return null;

      for (let item in updatedScores) {
        updatedScores[item] /= sumScores;
      }

      Object.assign(scores, updatedScores);
    }

    return scores;
  };

  const getWeightedSum = (item, scores, graph) => {
    const neighbors = graph[item] || [];
    let sum = 0;

    // Weighted sum of the neighbors' scores
    for (let neighbor of neighbors) {
      sum += scores[neighbor] || 0;
    }
    return sum / neighbors.length;
  };

  const handleRun = () => {
    const pprResults = personalizedPageRank(graph, userId);
    
    // Explicitly log item values to ensure they are correctly included in the results
    const resultsWithValues = {};
    for (const [item] of Object.entries(pprResults || {})) {
      resultsWithValues[item] = {
        value: itemValues[item] || 0,  // Display item value along with the score
      };
    }

    setResult(resultsWithValues);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={handleRun}
      >
        Run Personalized PageRank
      </button>
      <h3 className="mt-4 text-xl font-semibold">Personalized PageRank Results:</h3>
      <pre className="mt-2 text-sm bg-gray-100 p-4 rounded">
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}

export default PersonalizedPageRank;
