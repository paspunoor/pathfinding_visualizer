export default function dfs(startNode, finishNode, grid, diagonal) {
  const visitedNodes = [];
  const stack = [];
  stack.push(startNode);
  while (stack.length) {
    const cur = stack.pop();

    if (cur.isEnd) return visitedNodes;
    if (!cur.isWall && (cur.isStart || !cur.isVisited)) {
      cur.isVisited = true;
      visitedNodes.push(cur);

      const adjacentNodes = getUnvisitedNeighbors(cur, grid, diagonal);

      for (const node of adjacentNodes) {
        node.previousNode = cur;
        stack.push(node);
      }
    }
  }

  return visitedNodes;
}

// Gets all the adjacent nodes
function getUnvisitedNeighbors(node, grid, diagonal) {
  let neighbors = [];

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  if (diagonal) directions.push([1, 1], [-1, 1], [-1, -1], [1, -1]);

  const { row, col } = node;

  for (const dir of directions) {
    const newRow = row + dir[0];
    const newCol = col + dir[1];
    if (
      0 <= newRow &&
      newRow < grid.length &&
      0 <= newCol &&
      newCol < grid[0].length &&
      !grid[newRow][newCol].isVisited
    ) {
      neighbors.push(grid[newRow][newCol]);
    }
  }

  return neighbors;
}
