import React from 'react';
import Navbar from '../../components/Navbar';

const GraphAlgorithmsPage = () => {
  return (
    <div className="graph-algorithms-container">
      <Navbar />
      <div className="graph-algorithms-page">
        <section className="hero-section">
          <h1>Graph Algorithms</h1>
          <p>
            Graph algorithms explore and analyze relationships in graph data structures — crucial for networking, pathfinding, and optimizing complex systems.
          </p>
        </section>

        <section className="content-section">
          <h2>Common Graph Algorithms</h2>
          <ul>
            <li>Breadth-First Search (BFS)</li>
            <li>Depth-First Search (DFS)</li>
            <li>Dijkstra's Algorithm</li>
            <li>Kruskal's Algorithm</li>
            <li>Prim's Algorithm</li>
            <li>Topological Sort</li>
            <li>Bellman-Ford Algorithm</li>
          </ul>
        </section>

        <section className="examples-section">
          <h2>Graph Algorithm Examples</h2>

          {/* BFS */}
          <div className="example-card">
            <h3>Breadth-First Search (BFS)</h3>
            <p>BFS visits all nodes at current depth before going deeper.</p>
            <pre><code>{`
function bfs(graph, startNode) {
  const queue = [startNode];
  const visited = new Set([startNode]);

  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
            `}</code></pre>
          </div>

          {/* DFS */}
          <div className="example-card">
            <h3>Depth-First Search (DFS)</h3>
            <p>DFS explores as far as possible along a branch before backtracking.</p>
            <pre><code>{`
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  console.log(node);

  for (const neighbor of graph[node]) {
    dfs(graph, neighbor, visited);
  }
}
            `}</code></pre>
          </div>

          {/* Dijkstra */}
          <div className="example-card">
            <h3>Dijkstra's Algorithm</h3>
            <p>Finds the shortest path in weighted graphs using a priority queue.</p>
            <pre><code>{`
class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.values.sort((a, b) => a.priority - b.priority);
  }
  dequeue() {
    return this.values.shift();
  }
}

function dijkstra(graph, start, end) {
  const distances = {}, prev = {}, pq = new PriorityQueue();

  for (const node in graph) {
    distances[node] = node === start ? 0 : Infinity;
    prev[node] = null;
    pq.enqueue(node, distances[node]);
  }

  while (pq.values.length) {
    const { val: node } = pq.dequeue();
    if (node === end) break;

    for (const neighbor in graph[node]) {
      const newDist = distances[node] + graph[node][neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        prev[neighbor] = node;
        pq.enqueue(neighbor, newDist);
      }
    }
  }

  const path = [];
  for (let at = end; at; at = prev[at]) path.unshift(at);
  return path;
}
            `}</code></pre>
          </div>

          {/* Kruskal */}
          <div className="example-card">
            <h3>Kruskal's Algorithm</h3>
            <p>Finds Minimum Spanning Tree by sorting edges and avoiding cycles.</p>
            <pre><code>{`
function kruskal(nodes, edges) {
  const parent = {};
  const find = x => parent[x] === x ? x : (parent[x] = find(parent[x]));
  const union = (x, y) => {
    const rootX = find(x), rootY = find(y);
    if (rootX !== rootY) parent[rootX] = rootY;
  };

  nodes.forEach(node => parent[node] = node);
  edges.sort((a, b) => a.weight - b.weight);

  const mst = [];
  for (const { from, to, weight } of edges) {
    if (find(from) !== find(to)) {
      mst.push({ from, to, weight });
      union(from, to);
    }
  }
  return mst;
}
            `}</code></pre>
          </div>

          {/* Prim */}
          <div className="example-card">
            <h3>Prim's Algorithm</h3>
            <p>Builds MST by expanding from a starting node to closest unvisited node.</p>
            <pre><code>{`
function prim(graph, start) {
  const visited = new Set();
  const result = [];
  const edges = [...graph[start]];

  visited.add(start);
  while (edges.length) {
    edges.sort((a, b) => a.weight - b.weight);
    const { to, weight, from } = edges.shift();

    if (!visited.has(to)) {
      visited.add(to);
      result.push({ from, to, weight });
      for (const edge of graph[to]) edges.push(edge);
    }
  }
  return result;
}
            `}</code></pre>
          </div>

          {/* Topological Sort */}
          <div className="example-card">
            <h3>Topological Sort</h3>
            <p>Orders tasks/nodes such that for every directed edge u → v, u comes before v.</p>
            <pre><code>{`
function topoSort(graph) {
  const visited = new Set(), stack = [];

  function dfs(node) {
    visited.add(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) dfs(neighbor);
    }
    stack.push(node);
  }

  for (const node in graph) {
    if (!visited.has(node)) dfs(node);
  }
  return stack.reverse();
}
            `}</code></pre>
          </div>

          {/* Bellman-Ford */}
          <div className="example-card">
            <h3>Bellman-Ford Algorithm</h3>
            <p>Finds shortest paths even with negative weights (no negative cycles).</p>
            <pre><code>{`
function bellmanFord(graph, vertices, start) {
  const dist = Array(vertices).fill(Infinity);
  dist[start] = 0;

  for (let i = 1; i < vertices; i++) {
    for (const [u, v, w] of graph) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  // Optional: check for negative cycles
  for (const [u, v, w] of graph) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      throw new Error("Negative cycle detected");
    }
  }

  return dist;
}
            `}</code></pre>
          </div>
        </section>
      </div>

      <style>{`
        .graph-algorithms-container {
          background: #f9fafb;
          color: #1f2937;
          font-family: 'Segoe UI', sans-serif;
          padding-bottom: 3rem;
        }

        .graph-algorithms-page {
          max-width: 1100px;
          margin: auto;
          padding: 2rem;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .hero-section h1 {
          font-size: 2.75rem;
          font-weight: 700;
          color: #1d4ed8;
        }

        .hero-section p {
          color: #4b5563;
          max-width: 700px;
          margin: auto;
        }

        .content-section {
          margin-bottom: 2rem;
        }

        .content-section h2,
        .examples-section h2 {
          font-size: 1.75rem;
          margin-bottom: 1rem;
          color: #2563eb;
        }

        .content-section ul {
          padding-left: 1.5rem;
          line-height: 1.7;
        }

        .example-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .example-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.08);
        }

        .example-card h3 {
          color: #1e3a8a;
          margin-bottom: 0.5rem;
        }

        pre {
          background: #f3f4f6;
          padding: 1rem;
          overflow-x: auto;
          border-radius: 8px;
          font-size: 0.85rem;
          line-height: 1.5;
        }

        code {
          font-family: 'Courier New', monospace;
        }
      `}</style>
    </div>
  );
};

export default GraphAlgorithmsPage;
