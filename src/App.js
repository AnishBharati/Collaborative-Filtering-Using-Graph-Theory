// src/App.jsx
import React, { useState } from 'react';
import PersonalizedPageRank from './components/PersonalizedPageRank';
import CommunityDetection from './components/CommunityDetection';
import Node2Vec from './components/Node2Vec';
import GraphVisualization from './components/GraphVisualization';

function App() {
  const [userId, setUserId] = useState('user1');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-blue-600">Collaborative Filtering Solutions</h1>

        <div className="flex justify-center space-x-4">
          <select
            className="p-2 border border-gray-300 rounded-md"
            onChange={(e) => setUserId(e.target.value)}
            value={userId}
          >
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
            <option value="user3">User 3</option>
            <option value="user4">User 4</option>
          </select>
        </div>

        <div className="space-y-8">
          <PersonalizedPageRank userId={userId} />
          <CommunityDetection />
          <Node2Vec userId={userId} />
          <GraphVisualization userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default App;
