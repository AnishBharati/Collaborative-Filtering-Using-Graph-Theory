import React, { useState } from "react";
import { graph } from "../data/sampleData";

function CommunityDetection() {
  const [result, setResult] = useState(null);

  const detectCommunities = (graph) => {
    const communities = { users: [], items: [] };

    Object.keys(graph).forEach((node) => {
      if (node.startsWith("user")) {
        communities.users.push(node);
      } else {
        communities.items.push(node);
      }
    });

    return communities;
  };

  const handleRun = () => {
    const communityResults = detectCommunities(graph);
    setResult(communityResults);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={handleRun}
      >
        Run Community Detection
      </button>
      <h3 className="mt-4 text-xl font-semibold">Community Detection Results:</h3>
      <pre className="mt-2 text-sm bg-gray-100 p-4 rounded">{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default CommunityDetection;
