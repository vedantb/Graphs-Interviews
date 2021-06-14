function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}
/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
  let visited = {};
  let cloneGraphTraverse = function (node) {
    if (!node) return node;
    if (node.val in visited) return visited[node.val];
    let cloneNode = new Node(node.val, []);
    visited[node.val] = cloneNode;
    for (let neighbor of node.neighbors) {
      cloneNode.neighbors.push(cloneGraphTraverse(neighbor));
    }
    return cloneNode;
  };
  return cloneGraphTraverse(node);
};
