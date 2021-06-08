# Prim's Minimum Spanning Tree

## What is a Minimum Spanning Tree?

Given an undirected graph with weighted edges, a **MST** is a subset of the edges in the graph which connects all vertices together (without creating any cycles) while minimizing the total edge cost.

This particular graph has a unique MST highlighted in green. However, it is common for a graph to have multiple valid MSTs of equal costs.

![MST Example](../Images/MSTExample.png)

MST Cost: 0 + 5 + -2 + 2 + 1 + 3 = 9

## Prim's MST ALgorithm

Prim’s is a greedy MST algorithm that works well on dense graphs. On these graphs, Prim’s meets or improves on the time bounds of its popular rivals (Kruskal’s & Borůvka’s).

However, when it comes to finding the **minimum spanning forest** on a disconnected graph, Prim’s cannot do this as easily (the algorithm must be run on each connected component individually).

The lazy version of Prim’s has a runtime of `O(E*log(E))`, but the eager version (which we will also look at) has a better runtime of `O(E*log(V))`.

### Lazy Prim's MST Overview

Maintain a min Priority Queue (PQ) that sorts edges based on min edge cost. This will be used to determine the next node to visit and the edge used to get there.

Start the algorithm on any node s. Mark **s** as visited and iterate over all edges of s, adding them to a PQ.

While the PQ is not empty and a MST has not been formed, dequeue the next cheapest edge from the PQ. If the dequeued edge is outdated (meaning the node it points to has already been visited) then skip it and poll again. Otherwise, mark the current node as visited and add the selected edge to the MST.

Iterate over the new current node's edges and add all it's edges to the PQ. Do not add edges to the PQ which point to already visited nodes.

![Prims 1](../Images/Prims1.png)
![Prims 2](../Images/Prims2.png)

Let's start from node 0 and add all it's edges to the PQ.
![Prims 3](../Images/Prims3.png)

Pick the edge with the least weight from the PQ and continue
![Prims 4](../Images/Prims4.png)
![Prims 5](../Images/Prims5.png)
![Prims 6](../Images/Prims6.png)

### Lazy Prim's Pseudocode

Let's define a few variables we will need

```code
n = … # Number of nodes in the graph.

pq = … # PQ data structure; stores edge objects consisting of
       # {start node, end node, edge cost} tuples. The PQ sorts
       # edges based on min edge cost.

g = … # Graph representing an adjacency list of weighted edges.
      # Each undirected edge is represented as two directed
      # edges in g. For especially dense graphs, prefer using
      # an adjacency matrix instead of an adjacency list to
      # improve performance.

visited = [false, …, false] # visited[i] tracks whether node i
                            # has been visited; size n


# s - the index of the starting node (0 ≤ s < n)
function lazyPrims(s = 0):
    m = n - 1 # number of edges in MST
    edgeCount, mstCost = 0, 0
    mstEdges = [null, …, null] # size m
    addEdges(s)

    while(!pq.isEmpty() and edgeCount !== m):
        edge = pq.dequeue()
        nodeIndex = edge.to

        if visited[nodeIndex]:
            continue

        mstEdges[edgeCount++] = edge
        mstCost += edge.cost

        addEdges(nodeIndex)

    if edgeCount !== m:
        return (null, null) # NO MST

    return (mstCost, mstEdges)

// Helper method to iterate over the edges of a node and add edges to the PQ:
function addEdges(nodeIndex):
    // mark the current node as visited
    visited[nodeIndex] = true;

    // Iterate over all edges going outwards from the current node.
    // add edges to the PQ which point to unvisited nodes
    edges = g[nodeIndex]
    for(edge: edges):
        if !visited[edge.to]:
            pq.enqueue(edge)
```
