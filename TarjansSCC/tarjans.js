class Tarjans {
  constructor(graph) {
    this.graph = graph;
    this.sccCount = 0;
    this.id = 0;
    this.solved = false;
    this.sccs = Array(graph.length).fill(0);
    this.ids = Array(graph.length).fill(-1);
    this.low = Array(graph.length).fill(0);
    this.visited = Array(graph.length).fill(false);
    this.stack = [];
  }

  sccCount() {
    if (!this.solved) this.solve();
    return this.sccCount;
  }

  getSccs() {
    if (!this.solved) this.solve();
    return this.sccs;
  }

  solve() {
    if (this.solved) return;

    for (let i = 0; i < n; i++) {
      if (this.ids[i] === -1) {
        this.dfs(i);
      }
    }
    this.solved = true;
  }

  dfs(at) {
    this.ids[at] = this.id;
    this.low[at] = this.id;
    this.id++;
    this.stack.push(at);
    this.visited[at] = true;
    for (let to of graph[at]) {
      if (this.ids[to] === -1) {
        this.dfs(to);
      }
      if (this.visited[to]) {
        this.low[at] = Math.min(this.low[at], this.low[to]);
      }
    }

    // On recursive callback, if we're at the root node (start of SCC)
    // empty the seen stack until back to root.
    if (this.ids[at] === this.low[at]) {
      for (let node = this.stack.pop(); ; node = this.stack.pop()) {
        this.visited[node] = false;
        this.sccs[node] = this.sccCount;
        if (node === at) break;
      }
      this.sccCount++;
    }
  }
}

// TESTS
let graph = [];
let n = 8;
for (let i = 0; i < n; i++) {
  graph.push([]);
}

function addEdge(graph, from, to) {
  graph[from].push(to);
}

addEdge(graph, 6, 0);
addEdge(graph, 6, 2);
addEdge(graph, 3, 4);
addEdge(graph, 6, 4);
addEdge(graph, 2, 0);
addEdge(graph, 0, 1);
addEdge(graph, 4, 5);
addEdge(graph, 5, 6);
addEdge(graph, 3, 7);
addEdge(graph, 7, 5);
addEdge(graph, 1, 2);
addEdge(graph, 7, 3);
addEdge(graph, 5, 0);

let tarjansSolver = new Tarjans(graph);
let sccs = tarjansSolver.getSccs();
console.log(sccs);
