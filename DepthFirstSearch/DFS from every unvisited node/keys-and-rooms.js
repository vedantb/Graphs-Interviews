// https://leetcode.com/problems/keys-and-rooms/

// rooms is given as an adjacency list. It's a simple dfs
// and then we check if count of visited rooms is equal to the
// total number of rooms present

/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
  let count = dfsHelper(0, Array(rooms.length).fill(false), rooms);
  if (count === rooms.length) return true;
  return false;
};

var dfsHelper = function (at, visited, graph) {
  if (visited[at]) return 0;
  visited[at] = true;
  let count = 1;
  let edges = graph[at];
  if (edges) {
    for (let edge of edges) {
      count += dfsHelper(edge, visited, graph);
    }
  }
  return count;
};
