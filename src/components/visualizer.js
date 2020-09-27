import React, { Component } from "react";
import Node from "./node";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import dijkstra from "../algorithms/dijkstra";
import pathImg from "../assets/path.svg";

// Starting with a predefined start and end node

const START_NODE_ROW = 5;
const START_NODE_COL = 15;
const END_NODE_ROW = 10;
const END_NODE_COL = 30;

class Visualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseDown: false,
      startRow: START_NODE_ROW,
      startCol: START_NODE_COL,
      endRow: END_NODE_ROW,
      endCol: END_NODE_COL,
      algorithm: "Dijkstra",
      isRunning: false,
      isClearingWalls: false,
      isMovingStart: false,
      isMovingEnd: false,
    };

    this.clearBoard = this.clearBoard.bind(this);
    this.runPathfinder = this.runPathfinder.bind(this);
    this.getShortestPath = this.getShortestPath.bind(this);
    this.toggleIsRunning = this.toggleIsRunning.bind(this);
    this.clearGrid = this.clearGrid.bind(this);
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  toggleIsRunning() {
    this.setState({ isRunning: !this.state.isRunning });
  }

  handleMouseDown(e) {
    if (this.state.isRunning) return;
    this.clearGrid();
    const [row, col] = e.target.id.split("-").slice(1);
    if (row == this.state.startRow && col == this.state.startCol) {
      this.setState({
        isMovingStart: true,
      });
    }

    if (row == this.state.endRow && col == this.state.endCol) {
      this.setState({
        isMovingEnd: true,
      });
    }
    this.setState({ mouseDown: true, isClearingWalls: false });
  }

  handleMouseUp() {
    if (this.state.isRunning) return;
    this.clearGrid();
    this.setState({
      mouseDown: false,
      isClearingWalls: false,
      isMovingStart: false,
      isMovingEnd: false,
    });

    let startRow = this.state.startRow,
      startCol = this.state.startCol,
      endRow = this.state.endRow,
      endCol = this.state.endCol;

    const newGrid = this.state.grid.slice();
    for (let ref in this.refs) {
      const { row, col, isStart, isEnd } = this.refs[ref].state;
      newGrid[row][col] = this.refs[ref].state;
      startRow = isStart ? row : startRow;
      startCol = isStart ? col : startCol;
      endRow = isEnd ? row : endRow;
      endCol = isEnd ? col : endCol;
    }

    this.setState({
      grid: newGrid,
      startRow,
      startCol,
      endRow,
      endCol,
    });
  }

  handleMouseLeave() {
    if (this.state.isRunning) return;
    if (this.state.mouseDown) {
      this.handleMouseUp();
    }
  }

  clearBoard() {
    if (this.state.isRunning) return;
    this.clearGrid();
    const { startRow, startCol, endRow, endCol, isRunning } = this.state;
    const newGrid = getInitialGrid(startRow, startCol, endRow, endCol);
    this.setState({ isClearingWalls: true, grid: newGrid });
  }

  runPathfinder() {
    if (this.state.isRunning) return;
    this.clearGrid();
    this.toggleIsRunning();
    const { algorithm, startRow, startCol, endRow, endCol, grid } = this.state;
    const startNode = grid[startRow][startCol],
      endNode = grid[endRow][endCol];
    let visitedNodes;

    switch (algorithm) {
      case "Dijkstra":
        visitedNodes = dijkstra(startNode, endNode, grid);
        break;
      default:
    }

    const shortestPath = this.getShortestPath(endNode);
    shortestPath.push("end");
    this.animate(visitedNodes, shortestPath);
  }

  getShortestPath(endNode) {
    const shortestPath = [];
    let cur = endNode;
    while (cur !== null) {
      shortestPath.unshift(cur);
      cur = cur.previousNode;
    }
    return shortestPath;
  }

  animate(visitedNodes, shortestPath) {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPath);
        }, 5 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodes[i];
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`
        ).className;
        if (
          nodeClassName !== "node node-start" &&
          nodeClassName !== "node node-end"
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 5 * i);
    }
  }

  animateShortestPath(shortestPath) {
    for (let i = 0; i < shortestPath.length; i++) {
      if (shortestPath[i] === "end") {
        setTimeout(() => {
          this.toggleIsRunning();
        }, i * 25);
      } else {
        setTimeout(() => {
          const node = shortestPath[i];
          const nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`
          ).className;
          if (
            nodeClassName !== "node node-start" &&
            nodeClassName !== "node node-end"
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-shortest-path";
          }
        }, i * 20);
      }
    }
  }

  clearGrid() {
    if (!this.state.isRunning) {
      const newGrid = this.state.grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`
          ).className;
          if (
            nodeClassName !== "node node-start" &&
            nodeClassName !== "node node-end" &&
            nodeClassName !== "node node-wall"
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node";
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(this.state.FINISH_NODE_ROW - node.row) +
              Math.abs(this.state.FINISH_NODE_COL - node.col);
          }
          if (nodeClassName === "node node-end") {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode = 0;
            node.previousNode = null;
            node.distance = Infinity;
          }
          if (nodeClassName === "node node-start") {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(this.state.FINISH_NODE_ROW - node.row) +
              Math.abs(this.state.FINISH_NODE_COL - node.col);
            node.isStart = true;
            node.isWall = false;
            node.previousNode = null;
            node.isNode = true;
          }
        }
      }
    }
  }

  render() {
    const {
      grid,
      mouseDown,
      isClearingWalls,
      isMovingStart,
      isMovingEnd,
      isRunning,
    } = this.state;

    return (
      <div
        onMouseUp={(e) => {
          e.preventDefault();
          this.handleMouseUp();
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          this.handleMouseDown(e);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          this.handleMouseLeave();
        }}
      >
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand>
            <img
              alt=""
              src={pathImg}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Pathfinding visualizer
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown
                variant="Info"
                title="Algorithm"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>Dijkstra's</NavDropdown.Item>
                <NavDropdown.Item>Depth-first search</NavDropdown.Item>
                <NavDropdown.Item>Breadth-first search</NavDropdown.Item>
                <NavDropdown.Item>A*</NavDropdown.Item>
              </NavDropdown>

              <div className="navbar-buttons">
                <Button variant="success" onClick={this.runPathfinder}>
                  Visualize {this.state.algorithm}
                </Button>
                <Button onClick={this.clearBoard} variant="outline-danger">
                  Clear walls and board
                </Button>

                <Button onClick={this.clearGrid} variant="outline-warning">
                  Clear board
                </Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <table className="grid">
          <tbody>
            {grid.map((row, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {
                      row,
                      col,
                      isEnd,
                      isStart,
                      isWall,
                      isVisited,
                      distance,
                      previousNode,
                    } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        row={row}
                        col={col}
                        isEnd={isEnd}
                        isStart={isStart}
                        isWall={isWall}
                        isVisited={isVisited}
                        mouseDown={mouseDown}
                        distance={distance}
                        previousNode={previousNode}
                        ref={row + ":" + col}
                        isClearingWalls={isClearingWalls}
                        isMovingStart={isMovingStart}
                        isMovingEnd={isMovingEnd}
                        isRunning={isRunning}
                      ></Node>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

// Creating an initial grid
const getInitialGrid = (startRow, startCol, endRow, endCol) => {
  const grid = [];

  for (let row = 0; row < 25; row++) {
    const cur = [];

    for (let col = 0; col < 70; col++) {
      cur.push(createNode(row, col, startRow, startCol, endRow, endCol));
    }

    grid.push(cur);
  }
  return grid;
};

// Creating each node
const createNode = (row, col, startRow, startCol, endRow, endCol) => {
  let node = {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === END_NODE_ROW && col === END_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    mouseDown: false,
  };

  if (typeof startRow !== "undefined") {
    node.isStart = row === startRow && col === startCol;
    node.isEnd = row === endRow && col === endCol;
  }

  return node;
};

export default Visualizer;
