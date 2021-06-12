/**
 * Bridges in a Graph
 *
 * An edge in an undirected graph is a bridge iff removing it disconnects the graph For a disconnected
 * undirected graph, definition is similar, a bridge is an edge which increases number of disconnected
 * components.
 *
 * Like articulation points, bridges represent vulnerabilities in a connected network and are useful
 * for deigning reliable networks. For example, in a wired network, an articulation point indicates the
 * critical computers and a bridge indicates the critical wires or connections.
 *
 * An O(V+E) algorithm to find all bridges
 * The idea is similar to O(V+E) algorithm for articulation points. We do DFS traversal of the given graph.
 * in DFS tree an edge (u,v) (u is parent of v in DFS tree) is bridge if there does not exist any other
 * alternative to reach u or an ancestor of u from subtree rooted with v. The value low[v] indicates earlier
 * visited vertex reachable from subtree rooted with v.
 * The condition for edge (u,v) to be bridge is low[v] > disc[u]
 *
 */

let time = 0;
function findBridges(graph) {
  let visited = new Set();
  let bridges = new Set();
  let visitedTime = {};
  let lowTime = {};
  let parent = {};

  dfs(visited, bridges, 0, visitedTime, lowTime, parent, graph);
  return bridges;
}

function dfs(visited, bridges, vertex, visitedTime, lowTime, parent, graph) {
  visited.add(vertex);
  visitedTime[vertex] = time;
  lowTime[vertex] = time;
  time++;

  for (let adj of graph[vertex]) {
    if (!visited.has(adj)) {
      parent[adj] = vertex;
      dfs(visited, bridges, adj, visitedTime, lowTime, parent, graph);

      if (visitedTime[vertex] < lowTime[adj]) {
        bridges.add([vertex, adj]);
      }
      lowTime[vertex] = Math.min(lowTime[vertex], lowTime[adj]);
    } else {
      if (!(adj === parent[vertex])) {
        lowTime[vertex] = Math.min(lowTime[adj], visitedTime[vertex]);
      }
    }
  }
}

let graph = [];
let n = 5;
for (let i = 0; i < n; i++) {
  graph[i] = [];
}
addEdge(1, 0);
addEdge(2, 0);
addEdge(0, 3);
addEdge(3, 4);
addEdge(4, 0);

function addEdge(v1, v2) {
  graph[v1].push(v2);
  graph[v2].push(v1);
}
console.log(graph);
console.log(findBridges(graph));
