function floydwarshall(matrix) {
  let n = matrix.length;
  let dp = Array.from(Array(matrix.length), () => Array(matrix[0].length));
  let next = Array.from(Array(matrix.length), () => Array(matrix[0].length));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] !== Infinity) next[i][j] = j;
      dp[i][j] = matrix[i][j];
    }
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dp[i][k] + dp[k][j] < dp[i][j]) {
          dp[i][j] = dp[i][k] + dp[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }

  // Identify negative cycles by propagating the value 'NEGATIVE_INFINITY'
  // to every edge that is part of or reaches into a negative cycle.
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dp[i][k] !== Infinity && dp[k][j] !== Infinity && dp[k][k] < 0) {
          dp[i][j] = -Infinity;
          next[i][j] = -1;
        }
      }
    }
  }
  let path = reconstructShortestPath(dp, next, 0, 2);
  return { dp, path };
}

function reconstructShortestPath(dp, next, start, end) {
  let path = [];
  if (dp[start][end] === Infinity) return path;
  let at = start;
  for (at; at !== end; at = next[at][end]) {
    if (at === -1) return null;
    path.push(at);
  }
  if (next[at][end] === -1) return null;
  path.push(end);
  return path;
}

let m = Array.from(Array(7), () => Array(7).fill(Infinity));
for (let i = 0; i < 7; i++) {
  m[i][i] = 0;
}

m[0][1] = 2;
m[0][2] = 5;
m[0][6] = 10;
m[1][2] = 2;
m[1][4] = 11;
m[2][6] = 2;
m[6][5] = 11;
m[4][5] = 1;
m[5][4] = -2;

m = [
  [0, 1, Infinity, 1],
  [Infinity, 0, 1, Infinity],
  [Infinity, Infinity, 0, 1],
  [Infinity, Infinity, Infinity, 0]
];

let { dp, path } = floydwarshall(m);
console.log(dp);
console.log(path);
