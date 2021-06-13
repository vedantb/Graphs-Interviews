// https://leetcode.com/problems/flood-fill/
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, newColor) {
  let currentColor = image[sr][sc];
  if (currentColor !== newColor) dfs(image, sr, sc, image[sr][sc], newColor);
  return image;
};

var dfs = function (image, sr, sc, currentColor, newColor) {
  if (sr < 0 || sc < 0 || sr >= image.length || sc >= image[0].length || image[sr][sc] !== currentColor) {
    return;
  }
  image[sr][sc] = newColor;
  dfs(image, sr + 1, sc, currentColor, newColor);
  dfs(image, sr - 1, sc, currentColor, newColor);
  dfs(image, sr, sc + 1, currentColor, newColor);
  dfs(image, sr, sc - 1, currentColor, newColor);
};
