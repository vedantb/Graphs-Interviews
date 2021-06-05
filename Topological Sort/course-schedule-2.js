// https://leetcode.com/problems/course-schedule-ii/

/**
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
 * You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that
 * you must take course bi first if you want to take course ai.
 *
 * For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
 *
 * Return the ordering of courses you should take to finish all courses.
 * If there are many valid answers, return any of them.
 * If it is impossible to finish all courses, return an empty array.
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
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
  let order = [];
  while (q.length > 0) {
    let at = q.pop();
    order[index++] = at;
    for (let to of g[at]) {
      inDegree[to]--;
      if (inDegree[to] === 0) {
        q.unshift(to);
      }
    }
  }
  if (index !== numCourses) return [];
  return order;
};

console.log(
  findOrder(4, [
    [1, 0],
    [2, 0],
    [3, 1],
    [3, 2]
  ])
);

console.log(findOrder(1, []));
console.log(findOrder(2, [[1, 0]]));
console.log(
  findOrder(2, [
    [1, 0],
    [0, 1]
  ])
);
