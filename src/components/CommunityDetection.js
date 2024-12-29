import React, { useState } from "react";
import { graph } from "../data/sampleData";

// Utility function to perform depth-first search (DFS) for connected components
const dfs = (graph, node, visited, community) => {
  visited.add(node);
  community.push(node);

  if (graph[node]) {
    graph[node].forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        dfs(graph, neighbor, visited, community);
      }
    });
  }
};

function CommunityDetection({ userId }) {
  const [result, setResult] = useState(null);

  // Function to detect communities and categorize users and items
  const detectCommunities = (graph) => {
    const visited = new Set();
    const communities = [];

    // Iterate over all nodes in the graph
    Object.keys(graph).forEach((node) => {
      if (!visited.has(node)) {
        const community = [];
        dfs(graph, node, visited, community); // Get the connected component
        communities.push(community); // Add it as a new community
      }
    });

    // Now, find the community that contains the userId
    const userCommunity = communities.find((community) =>
      community.includes(userId)
    );

    // Categorize the nodes in the found community into users and items
    const categorizedCommunity = {
      users: {},
      items: {},
    };

    if (userCommunity) {
      userCommunity.forEach((node) => {
        if (node.startsWith("user")) {
          categorizedCommunity.users[node] = "User";
        } else if (node.startsWith("item")) {
          categorizedCommunity.items[node] = "Item";
        }
      });
    }

    return categorizedCommunity;
  };

  // Run the community detection when the button is clicked
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
      {result ? (
        <div className="mt-2 text-sm bg-gray-100 p-4 rounded">
          <strong>Community of User {userId}:</strong>
          {/* Users Section */}
          {result.users && Object.keys(result.users).length > 0 ? (
            <div>
              <strong>Users:</strong>
              <ul className="list-disc pl-5 mt-2">
                {Object.keys(result.users).map((user, idx) => (
                  <li key={idx}>{user}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Items Section */}
          {result.items && Object.keys(result.items).length > 0 ? (
            <div>
              <strong>Items:</strong>
              <ul className="list-disc pl-5 mt-2">
                {Object.keys(result.items).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="mt-2 text-sm text-gray-500">No community detected for User {userId}.</p>
      )}
    </div>
  );
}

export default CommunityDetection;
