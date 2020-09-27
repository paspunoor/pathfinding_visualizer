import React, { Component } from "react";
import Node from "./node";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import dijkstra from "../algorithms/dijkstra";
import astar from "../algorithms/astar";
import dfs from "../algorithms/dfs";
import bfs from "../algorithms/bfs";
import pathImg from "../assets/path.svg";

// Starting with a predefined start and end node

class Visualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseDown: false,
      startRow: 5,
      startCol: 15,
      endRow: 15,
      endCol: 30,
      algorithm: "1",
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
    this.handleSelect = this.handleSelect.bind(this);
    this.getInitialGrid = this.getInitialGrid.bind(this);
    this.createNode = this.createNode.bind(this);
  }

  componentDidMount() {
    const grid = this.getInitialGrid();
    this.setState({ grid });
  }

  toggleIsRunning() {
    this.setState({ isRunning: !this.state.isRunning });
  }

  handleSelect(eventKey) {
    this.setState({
      algorithm: eventKey,
    });
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

  // Creating an initial grid
  getInitialGrid() {
    const grid = [];

    for (let row = 0; row < 20; row++) {
      const cur = [];

      for (let col = 0; col < 50; col++) {
        cur.push(this.createNode(row, col));
      }

      grid.push(cur);
    }
    return grid;
  }

  // Creating each node
  createNode(row, col) {
    const { startRow, startCol, endRow, endCol } = this.state;
    let node = {
      row,
      col,
      isStart: row === startRow && col === startCol,
      isEnd: row === endRow && col === endCol,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      mouseDown: false,
      distanceToFinishNode: (endRow - row) ** 2 + (endCol - col) ** 2,
    };

    if (typeof startRow !== "undefined") {
      node.isStart = row === startRow && col === startCol;
      node.isEnd = row === endRow && col === endCol;
    }

    return node;
  }

  clearBoard() {
    if (this.state.isRunning) return;
    this.clearGrid();
    const { startRow, startCol, endRow, endCol, isRunning } = this.state;
    const newGrid = this.getInitialGrid();
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
      case "1":
        visitedNodes = dijkstra(startNode, endNode, grid);
        break;
      case "2":
        visitedNodes = astar(startNode, endNode, grid);
        break;
      case "3":
        visitedNodes = dfs(startNode, endNode, grid);
        break;
      case "4":
        visitedNodes = bfs(startNode, endNode, grid);
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
        }, i * 40);
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
        }, i * 30);
      }
    }
  }

  clearGrid() {
    if (!this.state.isRunning) {
      const { startRow, startCol, endRow, endCol } = this.state;
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
              (this.state.endRow - node.row) ** 2 +
              (this.state.endCol - node.col) ** 2;
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
              (this.state.endRow - node.row) ** 2 +
              (this.state.endCol - node.col) ** 2;
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
      algorithm,
    } = this.state;

    const algoKeys = {
      "1": "Dijkstra's",
      "2": "A-star",
      "3": "Depth-first search",
      "4": "Breadth-first search",
    };

    const algo = algoKeys[algorithm];

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
            Pathfinding algorithm visualizer
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown
                variant="Info"
                title="Algorithm"
                id="basic-nav-dropdown"
                onSelect={(eventKey) => {
                  this.handleSelect(eventKey);
                }}
              >
                <NavDropdown.Item eventKey="1">Dijkstra's</NavDropdown.Item>
                <NavDropdown.Item eventKey="2">A*</NavDropdown.Item>
                <NavDropdown.Item eventKey="3">
                  Depth-first search
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="4">
                  Breadth-first search
                </NavDropdown.Item>
              </NavDropdown>

              <Button variant="info" onClick={this.runPathfinder}>
                Run -> {algo}
              </Button>
              <Button onClick={this.clearBoard} variant="outline-danger">
                Clear walls and board
              </Button>

              <Button onClick={this.clearGrid} variant="outline-warning">
                Clear board
              </Button>
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

export default Visualizer;
