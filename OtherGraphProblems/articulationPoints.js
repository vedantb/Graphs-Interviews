/**
 * Find articulation points in connected undirected graph.
 * Articulation points are vertices such that removing any one of them disconnects the graph.
 *
 * We need to do DFS of this graph and keep visitedTime and lowTime for each vertex.
 * lowTime is for detecting backedges
 *
 * If any one of following condition meets then vertex is articulation point.
 * 1. If vertex is root of DFS and has at least 2 independent children.(By independent it means they are
 * not connected to each other except via this vertex). This condition is needed because if we
 * started from corner vertex it will meet condition 2 but still is not an articulation point. To filter
 * out those vertices we need this condition.
 *
 * 2. It is not root of DFS and if visitedTime of vertex <= lowTime of any adjacent vertex then its articulation point.
 *
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */

let time = 0;
function findArticulationPoints(graph) {
  let visited = new Set();
  let articulationPoints = new Set();
  let visitedTime = {};
  let lowTime = {};
  let parent = {};

  dfs(visited, articulationPoints, 0, visitedTime, lowTime, parent, graph);
  return articulationPoints;
}

function dfs(visited, articulationPoints, vertex, visitedTime, lowTime, parent, graph) {
  visited.add(vertex);
  visitedTime[vertex] = time;
  lowTime[vertex] = time;
  time++;
  let childCount = 0;
  let isArticulationPoint = false;

  for (let adj of graph[vertex]) {
    if (adj === parent[vertex]) continue;

    if (!visited.has(adj)) {
      parent[adj] = vertex;
      childCount++;
      dfs(visited, articulationPoints, adj, visitedTime, lowTime, parent, graph);

      if (visitedTime[vertex] <= lowTime[adj]) {
        isArticulationPoint = true;
      } else {
        lowTime[vertex] = Math.min(lowTime[vertex], lowTime[adj]);
      }
    } else {
      lowTime[vertex] = Math.min(lowTime[vertex], visitedTime[adj]);
    }
  }

  if ((parent[vertex] && childCount >= 2) || (!parent[vertex] && isArticulationPoint)) {
    articulationPoints.add(vertex);
  }
}

let graph = [];
let n = 5;
for (let i = 0; i < n; i++) {
  graph[i] = [];
}
addEdge(0, 1);
addEdge(0, 2);
addEdge(0, 3);
addEdge(1, 2);
addEdge(3, 4);
function addEdge(v1, v2) {
  graph[v1].push(v2);
  graph[v2].push(v1);
}

console.log(findArticulationPoints(graph));
