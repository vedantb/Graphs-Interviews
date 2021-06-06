// https://leetcode.com/problems/find-the-town-judge/

// Since the judge trusts nobody it's outdegree will be 0
// and since everyone trusts the judge it's indegree will be n-1
// we just maintain a list where list[i] = indegree(i) - outdegree(i)
// if list[i] is n-1 we have our judge

/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (n, trust) {
  if (trust.length < n - 1) return -1;
  let degree = Array(n + 1).fill(0);

  for (let i = 0; i < trust.length; i++) {
    degree[trust[i][0]] -= 1;
    degree[trust[i][1]] += 1;
  }
  for (let i = 1; i < n + 1; i++) {
    if (degree[i] === n - 1) return i;
  }
  return -1;
};
