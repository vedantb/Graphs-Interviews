# Topological Sort

Applications/Problems

- School/class pre-reqs
- Program dependencies
- Event Scheduling

A **topological ordering** is an ordering of the nodes in a directed graph where for each directed edge from node A to node B, node A appears before node B in the ordering

The **topological sort** algorithm can find a topological ordering in **O(V + E)**

**Note:** The topological orderings are NOT unique.

Not every type of graph can have a topological ordering. A graph which contains a cycle cannot have a valid ordering.
Only graphs with valid topological ordering are **Directed Acyclic Graphs**. These are graphs with directed edges and no cycles.

Q: How do I verify if my graph has no cycle?
A: One method is to use the Tarjan's strongly connected components algorithm which can be used to find cycles.

Every tree has a topological ordering since they do not have cycles.

**Algorithm:**

1. Pick an unvisited node
2. Beginning with the selected node, do a DFS exploring only unvisited nodes
3. On the recursive callback of the DFS, add the current node to the topological ordering in reverse order.

**Topsort Pseudocode:**

```code
// Assumption: graph is stored as adj list
function topsort(graph):
    N = graph.numberOfNodes();
    V = [false, ..., false] // Length N
    ordering = [0, ... , 0] // Length N
    i = N - 1;
    for(at = 0; at < n; at++):
        if V[at] == false:
            visitedNodes = []
            dfs(at, V, visitedNodes, graph)
            for nodeId in visitedNodes:
                ordering[i] = nodeId
                i = i - 1;

    return ordering

function dfs(node, V, visitedNodes, graph):
    V[at] = true

    edges = graph[at];
    for edge in edges:
        if V[edge.to] == false:
            dfs(edge.to, V, visitedNodes, graph)

    visitedNodes.add(at)
```

**Optimization:**

```code
function topsort(graph):
    N = graph.numberOfNodes();
    V = [false, ..., false] // Length N
    ordering = [0, ... , 0] // Length N
    i = N - 1;
    for(at = 0; at < n; at++):
        if V[at] == false:
            i = dfs(i, at, V, ordering, graph)

    return ordering

function dfs(i, node, V, ordering, graph):
    V[at] = true

    edges = graph[at];
    for edge in edges:
        if V[edge.to] == false:
            i = dfs(i, edge.to, V, ordering, graph)

    ordering[i] = at
    return i - 1
```

### Kahn's Algorithm for Topological Sort

**Kahn's algorithm** is a simple topological sort algorithm and can find a topological sort in O(V+E) time.

The intuition behind Kahn's algorithm is to repeatedly remove nodes without any dependencies from the graph and add them to the topological ordering.

As nodes without dependencies (and their outgoing edges) are removed from the graph, new nodes without dependencies should become free.

We repeat removing nodes without dependencies from the graph until all nodes are processed, or a cycle is disocvered.

1. Begin by counting the incoming degree of each node. This allows us to know whether the node has dependencies or not. Calculate the indegrees of all nodes and store it in an array.

2. Maintain a queue of all nodes with no incoming edges. The queue will help us determine which node to process next. Add all nodes with degree 0 to the queue.

3. Dequeue and add the node to the topological ordering. Remove this node from the graph and decrease the degree of all affected nodes.

4. Add any new nodes with an incoming degree of 0 to the queue.

```code
function FindTopologicalOrdering(g):
    n = g.size()
    inDegree = [0,0,...,0] // size n
    for(i = 0; i < n; i++):
        for(to in g[i]):
            inDegree[to] = inDegree[to] + 1;

    // q always contains the set of nodes with no incoming edges
    q = ... // empty integer data structure
    for(i = 0; i < n; i++):
        if(inDegree[i] == 0):
            q.enqueue(i)

    index = 0
    order = [0,0,..,0] // size n
    while(!q.isEmpty()):
        at = q.dequeue()
        order[index++] = at
        for(to in g[at]):
            inDegree[to] = inDegree[to] - 1
            if(inDegree[to] == 0):
                q.enqueue(to)
    if(index !== n):
        return null // graph contains a cycle

    return order
```
