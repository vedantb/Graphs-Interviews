function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}
function lca(root, node1, node2) {
  if (root === null) return null;
  if (root.val === node1 || root.val === node2) return root.val;
  let left = lca(root.left, node1, node2);
  let right = lca(root.right, node1, node2);
  if (left !== null && right !== null) return root.val;
  if (left === null && right === null) return null;
  return left !== null ? left : right;
}

let root = new TreeNode(3);
root.left = new TreeNode(
  6,
  new TreeNode(2),
  new TreeNode(11, new TreeNode(9), new TreeNode(5))
);
root.right = new TreeNode(8, null, new TreeNode(13, new TreeNode(7)));

console.log(lca(root, 9, 8));
