// leetcode.com/problems/employee-importance/

function Employee(id, importance, subordinates) {
  this.id = id;
  this.importance = importance;
  this.subordinates = subordinates;
}

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
var GetImportance = function (employees, id) {
  let employeeMap = {};
  for (let employee of employees) {
    employeeMap[employee.id] = employee;
  }
  return dfs(employeeMap, id);
};

var dfs = function (employeeMap, id) {
  let employee = employeeMap[id];
  let res = employee.importance;
  for (let subordinate of employee.subordinates) {
    res += dfs(employeeMap, subordinate);
  }
  return res;
};

let employee1 = new Employee(1, 5, [2, 3]);
let employee2 = new Employee(2, 3, []);
let employee3 = new Employee(3, 3, []);
console.log(GetImportance([employee1, employee2, employee3], 1));
