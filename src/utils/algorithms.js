// PersonalizedPageRank Algorithm (For Data Sparsity)
export function personalizedPageRank(graph, userId, alpha = 0.85, iterations = 100) {
    const scores = {};
    const neighbors = graph[userId] || [];
  
    // Initialize the scores vector
    for (let item of neighbors) {
      scores[item] = 1;
    }
  
    // Personalized PageRank algorithm
    for (let iter = 0; iter < iterations; iter++) {
      const updatedScores = {};
      for (let item in scores) {
        updatedScores[item] = alpha * scores[userId] + (1 - alpha) * getWeightedSum(item, scores, graph);
      }
  
      // Normalize the scores to sum to 1
      const sumScores = Object.values(updatedScores).reduce((a, b) => a + b, 0);
      for (let item in updatedScores) {
        updatedScores[item] /= sumScores;
      }
      
      Object.assign(scores, updatedScores);
    }
  
    return scores;
  }
  
  function getWeightedSum(item, scores, graph) {
    const neighbors = graph[item] || [];
    let sum = 0;
    for (let neighbor of neighbors) {
      sum += scores[neighbor] || 0;
    }
    return sum / neighbors.length;
  }
  
  // Community Detection Algorithm (For Cold Start Problem)
  export function detectCommunities(graph) {
    const communities = {};
    let communityId = 0;
  
    // Initialize each user as its own community
    for (let user in graph) {
      communities[user] = communityId++;
    }
  
    // Simulate community detection by grouping users with similar interactions
    for (let user in graph) {
      const neighbors = graph[user] || [];
      for (let neighbor of neighbors) {
        if (graph[neighbor]) {
          for (let commonUser of graph[neighbor]) {
            if (!communities[commonUser]) {
              communities[commonUser] = communities[user];
            }
          }
        }
      }
    }
  
    return communities;
  }
  
  // Node2Vec (For Scalability) - Simulated random walks
  export function generateRandomWalks(graph, startNode, numWalks = 10, walkLength = 10) {
    let walks = [];
    for (let i = 0; i < numWalks; i++) {
      let walk = [startNode];
      for (let j = 1; j < walkLength; j++) {
        const currentNode = walk[walk.length - 1];
        const neighbors = graph[currentNode] || [];
        const nextNode = getNextNode(currentNode, neighbors);
        walk.push(nextNode);
      }
      walks.push(walk);
    }
    return walks;
  }
  
  function getNextNode(currentNode, neighbors) {
    const randomIndex = Math.floor(Math.random() * neighbors.length);
    return neighbors[randomIndex];
  }
  