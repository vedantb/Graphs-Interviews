let calcEquation = function (equations, values, queries) {
  let neighbors = {};

  for (let e = 0; e < equations.length; e++) {
    neighbors[equations[e][0]] = [];
    neighbors[equations[e][1]] = [];
  }

  for (let e = 0; e < equations.length; e++) {
    neighbors[equations[e][0]].push([equations[e][1], values[e]]);
    neighbors[equations[e][1]].push([equations[e][0], 1 / values[e]]);
  }
  let res = [];
  for (let e of queries) {
    res.push(evaluateExpression(e, neighbors));
  }
  return res;
};

let evaluateExpression = function (expression, neighborsList) {
  if (!(expression[0] in neighborsList) || !(expression[1] in neighborsList)) return -1;

  if (expression[0] === expression[1]) return 1;

  let queue = neighborsList[expression[0]].slice();
  let checked = [];

  while (queue.length) {
    let elem = queue.shift();
    if (elem[0] === expression[1]) return elem[1];

    checked.push(elem[0]);
    let neighbors = neighborsList[elem[0]];
    for (let n = 0; n < neighbors.length; n++) {
      let nextToCheck = neighbors[n];
      if (checked.includes(nextToCheck[0])) continue;
      queue.push([nextToCheck[0], nextToCheck[1] * elem[1]]);
    }
  }
  return -1;
};

console.log(
  calcEquation(
    [
      ["a", "b"],
      ["b", "c"]
    ],
    [2.0, 3.0],
    [
      ["a", "c"],
      ["b", "a"],
      ["a", "e"],
      ["a", "a"],
      ["x", "x"]
    ]
  )
);
