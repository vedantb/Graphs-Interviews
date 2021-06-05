# Trees

## Isomorphisms in Trees

**Graph Isomorphism**
The question of asking whether two graphs G1 and G2 are isomorphic is asking whether they are structurally the same.
For isomorphism to exist, we need to be able to map all nodes and edges in G1 to G2 and vice-versa.

Determining if two graphs are isomorphic is not only not obvious to the human eye, but also a difficult problem for computers. Still an open question wether the graph isomorphism problem is NP complete. However, there are many polynomial time isomorphism algorithms which exist for subclasses of graphs like trees.

**Identifying Isomorphic Trees**
The method we look at involves serializing a tree into a unique encoding. This encoding is simply a unique string that represents a tree, if another tree has they same encoding, they are isomorphic.

If a tree is not rooted, it's easier to serialize a rooted tree.
However, if we're rooting a tree we need to ensure that the same root node is selected in both trees before serializing/encoding the trees.

To select a common node between both trees, we can find the center(s) to help ourselves.

The tree encoding is simplay a sequence of left '(' and right ')' beackets. You can also think of them as 0s and 1s.
From the encoding, it is also possible to reconstruct the original tree.

**Generating the tree encoding**
We use the AHU algorithm which is able to capture the complete history of the tree's edge spectrum and structure ensuring a deterministic method of checking for tree isomorphism.

1. Assign all nodes Knuth tuples: ()
2. For all the nodes with already processed children, combine the labels of their child nodes and wrap them in brackets.
3. Be aware to sort the brackets lexicographically when combining labels of child nodes

**Pseudocode**

```code
class TreeNode:
    id; // unique id to identify node
    parent; // pointer to parent TreeNode reference. Only the root has a null parent
    children = [] // List of pointers to chil treeNodes

// Returns whether two trees are isomorphic
// Parameters tree1 and tree2 are undirected trees stored as adj lists
function treesAreIsomorphic(tree1, tree2):
    tree1Centers = treeCenters(tree1)
    tree2Centers = treeCenters(tree2)

    tree1Rooted = rootTree(tree1, tree1Centers[0])
    tree1Encoded = encode(tree1Rooted)

    for center in tree2Centers:
        tree2Rooted = rootTree(tree2, tree2Centers[0])
        tree2Encoded = encode(tree2Rooted)
        if tree1Encoded === tree2Encoded return true

    return false

function encode(node):
    if node === null:
        return ""

    labels = []
    for child in node.children:
        labels.push(encode(child))

    sort(labels) //lexicographically sorting them

    result = ""
    for label in labels:
        result += label;

    return "(" + result + ")"
```
