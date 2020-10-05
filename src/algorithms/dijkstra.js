import TinyQueue from "tinyqueue";

export default function dijkstra(
  startNode,
  finishNode,
  grid,
  diagonal,
  isAstar
) {
  // Set the start node distance to 0
  startNode.distance = 0;

  // Insert all nodes in a min-heap
  const nodes = getAllNodes(grid);
  let pq = new TinyQueue(nodes, function (a, b) {
    return a.distance - b.distance;
  });

  // Visited nodes
  let visitedNodes = [];

  while (pq.length) {
    // get the closest nodes
    let cur = pq.pop();

    // Don't traverse a wall
    if (cur.isWall) continue;

    // No path exists
    if (cur.distance === Infinity) return visitedNodes;

    // Push the nodes in the visited set
    cur.isVisited = true;
    visitedNodes.push(cur);

    const adjacentNodes = getUnvisitedNeighbors(cur, grid, diagonal);

    for (const node of adjacentNodes) {
      // Modify the algorith to move in the direction of end node if A* is selected
      const param = isAstar ? node.heuristic : cur.distance;
      // Relaxing the edges
      if (node.distance > param + 1) {
        node.distance = param + 1;
        node.previousNode = cur;

        // Heapify
        pq = new TinyQueue(pq.data, function (a, b) {
          return a.distance - b.distance;
        });

        if (node.isEnd) {
          return visitedNodes;
        }
      }
    }
  }

  return visitedNodes;
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
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
