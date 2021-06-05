function TreeNode(id, parent = null, children = []) {
  this.id = id;
  this.parent = parent;
  this.children = children;
}

function areTreesIsomorphic(tree1, tree2) {
  if (tree1.length === 0 || tree2.length === 0) return;

  let centers1 = findTreeCenters(tree1);
  let centers2 = findTreeCenters(tree2);

  let rootedTree1 = rootTree(tree1, centers1[0]);
  let tree1Encoding = encode(rootedTree1);

  for (center of centers2) {
    let rootedTree2 = rootTree(tree2, center);
    let tree2Encoding = encode(rootedTree2);
    if (tree1Encoding === tree2Encoding) return true;
  }
  return false;
}

function encode(node) {
  if (node === null) return "";

  let labels = [];
  for (child of node.children) {
    labels.push(encode(child));
  }
  labels.sort();
  let res = "";
  for (label of labels) {
    res += label;
  }
  return `(${res})`;
}

// To find the center of a tree, we are iteratively removing layers
// from the leaf node till we are left with 1 or 2 centers
function findTreeCenters(tree) {
  let n = tree.length;
  let degree = Array(n);
  let leaves = [];

  for (let i = 0; i < n; i++) {
    let edges = tree[i];
    degree[i] = edges.length;
    if (degree[i] <= 1) {
      leaves.push(i);
      degree[i] = 0;
    }
  }
  console.log(tree, degree, leaves);
  let processedLeaves = leaves.length;

  while (processedLeaves < n) {
    let newLeaves = [];
    for (let node of leaves) {
      for (let neighbor of tree[node]) {
        degree[neighbor]--;
        if (degree[neighbor] === 1) {
          newLeaves.push(neighbor);
        }
      }
      degree[node] = 0;
    }
    processedLeaves += newLeaves.length;
    leaves = newLeaves;
  }

  return leaves;
}

function rootTree(graph, rootId) {
  let root = new TreeNode(rootId);
  return buildTree(graph, root);
}

function buildTree(graph, node) {
  for (let neighbor of graph[node.id]) {
    if (node.parent !== null && neighbor === node.parent.id) continue;

    let child = new TreeNode(neighbor, node);
    node.children.push(child);

    buildTree(graph, child);
  }
  return node;
}

// TESTS
function createEmptyGraph(n) {
  let graph = [];
  for (let i = 0; i < n; i++) graph.push([]);
  return graph;
}

function addUndirectedEdge(graph, from, to) {
  graph[from].push(to);
  graph[to].push(from);
}

/**
 * 1
 * |
 * 2 -> 0
 * |
 * 3 -> 4
 */
let tree1 = createEmptyGraph(5);
addUndirectedEdge(tree1, 2, 0);
addUndirectedEdge(tree1, 3, 4);
addUndirectedEdge(tree1, 2, 1);
addUndirectedEdge(tree1, 2, 3);

let tree2 = createEmptyGraph(5);
addUndirectedEdge(tree2, 1, 0);
addUndirectedEdge(tree2, 2, 4);
addUndirectedEdge(tree2, 1, 3);
addUndirectedEdge(tree2, 1, 2);

console.log(areTreesIsomorphic(tree1, tree2));
