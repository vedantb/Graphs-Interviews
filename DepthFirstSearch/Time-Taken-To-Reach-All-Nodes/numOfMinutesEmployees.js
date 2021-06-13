// https://leetcode.com/problems/time-needed-to-inform-all-employees/
/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
var numOfMinutes = function (n, headId, manager, informTime) {
  let managerGraph = {};
  for (let i = 0; i < manager.length; i++) {
    let currentManager = manager[i];
    if (currentManager === -1) continue;
    if (!(currentManager in managerGraph)) {
      managerGraph[currentManager] = [];
    }
    managerGraph[currentManager].push(i);
  }
  return dfs(managerGraph, informTime, headId);
};

function dfs(managerGraph, informTime, curr) {
  let max = 0;
  if (!(curr in managerGraph)) return max;

  for (let i = 0; i < managerGraph[curr].length; i++) {
    max = Math.max(max, dfs(managerGraph, informTime, managerGraph[curr][i]));
  }
  return max + informTime[curr];
}
