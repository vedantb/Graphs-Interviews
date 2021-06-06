# Floyd-Warshall All Pairs Shortest Path

In graph, theory the Floyd-Warshall (FW) algorithm is an APSP algorithm. This means that it can find the shortest path between all pairs of nodes.

The time complexity of FW is O(V^3) which is ideal for graphs no larger than a couple of hundred nodes.

![Algo Reference](../Images\ShortestPathAlgoReference.png)

**Graph Setup:**

With FW, the optimal way to represent our graph is with a 2D adjacency matrix m where cell m[i][j] represents the edge weight of going from node i to node j

**Note:** It is assumed that the distance from a node to itself is 0. If there is no edge from i to j, then set the edge value m[i][j] to be positive infinity.

![FW Graph Setup](../Images\FW-GraphSetup.png)

The main idea behind FW is to gradually **build up all itermediate routes between nodes i and j** to find the optimal path.

Suppose our adjacency matrix tells us that the distance from a to b is: `m[a][b] = 11`

Suppose there exists a third node, c. If `m[a][c] + m[c][b] < m[a][b]` then it’s better to route through c!

The goal of FW is to eventually consider going through all possible intermediate nodes on paths of different lengths

![FW Idea](../Images\FW-Idea.png)

## The Memo Table

Let `dp` be a 3D matrix of size n x n x n that acts as a memo table.

`dp[k][i][j] = shortest path from node i to node j routing through nodes {0, 1, ..., k-1, k}`

Start with k = 0, then k = 1 and so on. This gradually builds up the optimal solution routing through 0, then all optimal solutions routing through 0 and 1, then all optimal solutions routing through 0,1,2, etc. up until n-1 which stores the APSP solution.

Specifically `dp[n-1]` is the 2D matrix solution we're after.

**Populating the DP table:**

In the beginning the optimal solution from i to j is simply the distance in the adj matrix.
`dp[k][i][j] = m[i][j] if k = 0`

otherwise:
`dp[k][i][j] = min(dp[k-1][i][j], dp[k-1][i][k] + dp[k-1][k][j])`

`dp[k-1][i][j]` = Reuse the best distance from i to j with values routing through nodes {0,1,...,k-1}
`dp[k-1][i][k] + dp[k-1][k][j]` = The right side of the min function essentially says go from i to k and then from k to j

Currently we're using O(V^3) memory since our memo table has one dimension for each of k,i,j

Notice that we'll be looping over k starting from 0, then 1, 2, .. and so forth. The important thing to note here is that previous result builds off the last since we need state k-1 to compute state k. With that being said, it is possible to compute the solution of k in-place saving us a dimension and reducing the space complexity to O(V^2).

The new recurrence relation is:
`dp[i][j] = m[i][j] if k = 0`
`dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j])`

## Pseudocode

```code
// Global/class scope variables
n = size of adj matrix
dp = memo table that will contain the solution
next = matrix used to reconstruct shortest paths

function floydwarshall(m):
    setup(m)

    // Execute FW APSP algorithm
    for(k = 0; k < n; k++):
        for(i = 0; i < n; i++):
            for(j = 0; j < n; j++):
                if(dp[i][k] + dp[k][j] < dp[i][j]):
                    dp[i][j] = dp[i][k] + dp[k][j]
                    next[i][j] = next[i][k]

    // Detect and propagate negative cycles
    propagateNegativeCycles(dp, n)

    return dp

function setup(m):
    dp = empty matrix of size n x n

    // should contain null values by default
    next = empty integer matrix of size n x n

    // do a deep copy of input matrix and setup the 'next' matrix for path reconsturction
    for(i := 0; i < n; i++):
        for(j := 0; j < n; j++):
            dp[i][j] = m[i][j]
            if(m[i][j] != Infinity):
                next[i][j] = j

function propagateNegativeCycles(dp, n):
    // Execute FW ASP algorithm a second time but this time if the distance can be imrpoved
    // set the optimal distance to -Infinity.
    // Every edge (i,j) maked with -Infinity is either part of or reaches into a negative cycle
        for(k = 0; k < n; k++):
        for(i = 0; i < n; i++):
            for(j = 0; j < n; j++):
                if(dp[i][k] + dp[k][j] < dp[i][j]):
                    dp[i][j] = -Infinity;
                    next[i][j] = -1


// RECONSTRUCT PATH
// start and end. You must run the fw solver before calling this
// Returns null if path is affected by negative cycle
function reconstructPath(start, end):
    path = []
    // check if there exists a path between start and end node
    if dp[start][end] == Infinity: return path

    at = start
    // reconstruct path from next matrix
    for(at = start; at != end; next[at][end]):
        if at == -1: return null
        path.add(at)

    if next[at][end] == -1: return null
    path.add(end)
    return path
```
