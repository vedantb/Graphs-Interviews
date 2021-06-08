# Network Flow

## 1. Maximum Flow

Finding the maximum flow begins with having a "flow" graph. This is a graph where edges have a certain max capacity which cannot be exceeded. Edges also have a flow value which is how many units of flow are passing through that edge. Initially the flow is 0 for all edges until you run a max flow algorithm on it.

There are 2 special types of nodes in the flow graph - the source node and the sink node.

The max flow problem - With an infinite input source, how much "flow" can we push through the network given that each edge has a certain capacity.

Suppose the edges are roads with cars, pipes with water or wires with electric current. Flow represents the volume of water allowed to flow through the pipes, the number of cars the roads can sustain in traffic and net electric current. Effectively, it’s the “bottleneck” value for the amount of flow that can pass through the network from source to sink under all the constraints.

![Max Flow Example](../Images/MaxFlowExample.png)

A flow graph (flow network) is a directed graph where each edge (also called an arc) has a certain capacity which can receive a
certain amount of flow. The flow running through an edge must be less than or equal to the capacity.

Each edge in the flow graph has a certain flow and capacity specified by the fraction adjacent to each edge. Initially, the flow through each edge is 0 and the capacity is a non negative value.

To find the maximum flow (and min-cut as a by product), the Ford-Fulkerson method repeatedly finds **augmenting paths** through the **residual graph** and **augments the flow** until no more augmenting paths can be found.

![Augmenting Path](../Images/augmentingpath.png)

An **augmenting path** is a path of edges in the residual graph with unused capacity greater than zero from the source s to the sink t.

![Bottleneck](../Images/bottleneck.png)

In the augmenting path above, the bottleneck is the “smallest” edge on the path. We can use the bottleneck value to augment the flow along the path.

The smallest remaining capacity of any edge along the augmenting path is:
min(10-0, 15-0, 6-0, 25-0, 10-0) = min(10,15,6,25,10) = 6

![Augmenting Flow](../Images/augmentingflow.png)

Augmenting the flow means updating the flow values of the edges along the augmenting path.
For forward edges, this means increasing the flow by the bottleneck value.

![Residual Edges](../Images/residualedges.png)

When augmenting the flow along the augmenting path, you also need to decrease the flow along each residual edge by the bottleneck value.
Residual edges exist to “undo” bad augmenting paths which do not lead to a maximum flow.

You can think of every edge in the original graph as having a residual edge with a flow/capacity of 0/0 which is not usually shown.
The residual graph is the graph which also contains residual edges.

Q: Residual edges have a capacity of 0? Isn’t that forbidden? How does that work?
A. Think of the remaining capacity of an edge e (residual or not) as: e.capacity - e.flow, This ensures that the remaining capacity of an edge is always non-negative (even if the flow can be negative)

The Ford-Fulkerson method continues finding augmenting paths and augments the flow until no more augmenting paths from s -> t exist.

A key realization to make at this point is that the sum of the bottlenecks found in each augmenting path is equal to the max-flow!

![Max Flow Step 2](../Images/maxflowstep2.png)
![Max Flow Step 3](../Images/maxflowstep3.png)
![Max Flow Step 4](../Images/maxflowstep4.png)
![Max Flow Step 5](../Images/maxflowstep5.png)
![Max Flow Step 6](../Images/maxflowstep6.png)

No more augmenting paths can be found, so the algorithm terminates!

max flow = sum of all bottleneck values = 6 + 4 + 6 + 4 = 20

The time complexity of the Ford-Fulkerson method depends on the algorithm being used to find the augmenting paths, which is left unspecified.

Assuming the method of finding augmenting paths is by using a Depth First Search (DFS), the algorithm runs in O(fE), where f is the maximum flow and E is the number of edges.
