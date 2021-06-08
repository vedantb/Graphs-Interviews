// https://leetcode.com/problems/course-schedule/

/**
 * Simple Topsort and just returning true or false if the order
 * is possible
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  let g = Array(numCourses);
  let inDegree = Array(numCourses).fill(0);
  for (let i = 0; i < numCourses; i++) {
    g[i] = [];
  }

  for (let i = 0; i < prerequisites.length; i++) {
    g[prerequisites[i][1]].push(prerequisites[i][0]);
    inDegree[prerequisites[i][0]] += 1;
  }

  let q = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) q.unshift(i);
  }

  let index = 0;

  while (q.length > 0) {
    let at = q.pop();
    index++;
    for (let to of g[at]) {
      inDegree[to]--;
      if (inDegree[to] === 0) {
        q.unshift(to);
      }
    }
  }
  return index === numCourses;
};
