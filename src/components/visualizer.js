import React, { Component } from "react";
import Node from "./node";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Spinner,
  ToggleButton,
  Image,
} from "react-bootstrap";
import dijkstra from "../algorithms/dijkstra";
import dfs from "../algorithms/dfs";
import bfs from "../algorithms/bfs";
import pathImg from "../assets/path.svg";
import profileImg from "../assets/profile.svg";
import codeImg from "../assets/code.svg";
import githubImg from "../assets/github.svg";

class Visualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseDown: false,
      startRow: 7,
      startCol: 15,
      endRow: 10,
      endCol: 30,
      algorithm: "1",
      isRunning: false,
      isClearingWalls: false,
      isMovingStart: false,
      isMovingEnd: false,
      diagonal: false,
      pathLength: "-",
      visited: "-",
    };

    this.clearBoard = this.clearBoard.bind(this);
    this.runPathfinder = this.runPathfinder.bind(this);
    this.getShortestPath = this.getShortestPath.bind(this);
    this.toggleIsRunning = this.toggleIsRunning.bind(this);
    this.clearGrid = this.clearGrid.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getInitialGrid = this.getInitialGrid.bind(this);
    this.createNode = this.createNode.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const grid = this.getInitialGrid();
    this.setState({ grid });
  }

  toggleIsRunning() {
    this.setState({ isRunning: !this.state.isRunning });
  }

  handleChange() {
    this.setState({
      diagonal: !this.state.diagonal,
    });
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
      heuristic: this.state.diagonal
        ? (endRow - row) ** 2 + (endCol - col) ** 2
        : Math.abs(endRow - row) + Math.abs(endCol - col),
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
    const {
      algorithm,
      startRow,
      startCol,
      endRow,
      endCol,
      grid,
      diagonal,
    } = this.state;
    const startNode = grid[startRow][startCol],
      endNode = grid[endRow][endCol];
    let visitedNodes;

    const startTime = window.performance.now();
    switch (algorithm) {
      case "1":
        visitedNodes = dijkstra(startNode, endNode, grid, diagonal);
        break;
      case "2":
        // A* is a simple modification of dijkstra
        const isAstar = true;
        visitedNodes = dijkstra(startNode, endNode, grid, diagonal, isAstar);
        break;
      case "3":
        visitedNodes = dfs(startNode, endNode, grid, diagonal);
        break;
      case "4":
        visitedNodes = bfs(startNode, endNode, grid, diagonal);
        break;
      default:
    }

    const shortestPath = this.getShortestPath(endNode);
    shortestPath.push("end");

    const endTime = window.performance.now();
    this.setState({
      visited: visitedNodes.length,
      pathLength: shortestPath.length,
    });
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
      this.setState({
        pathLength: "-",
        visited: "-",
      });
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
            node.heuristic = this.state.diagonal
              ? (endRow - node.row) ** 2 + (endCol - node.col) ** 2
              : Math.abs(endRow - node.row) + Math.abs(endCol - node.col);
          }
          if (nodeClassName === "node node-end") {
            node.isVisited = false;
            node.distance = Infinity;
            node.heuristic = 0;
            node.previousNode = null;
          }
          if (nodeClassName === "node node-start") {
            node.isVisited = false;
            node.distance = Infinity;
            node.heuristic = this.state.diagonal
              ? (endRow - node.row) ** 2 + (endCol - node.col) ** 2
              : Math.abs(endRow - node.row) + Math.abs(endCol - node.col);
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
      diagonal,
      pathLength,
      visited,
    } = this.state;

    const algoKeys = {
      "1": "Dijkstra's",
      "2": "A-star",
      "3": "Depth-first search",
      "4": "Breadth-first search",
    };

    const algo = algoKeys[algorithm];
    const infoText = {
      "1":
        "The Dijkstra's algorithm is a greedy algorithm which guarantees the shortest path from one node to all other nodes in a weighted graph.",
      "2":
        "The A-star algorithm is a smarter version of Dijkstra's. It specializes in finding the shortest path from a start node to a finish node by moving in the direction of the finish node.",
      "3":
        "The Depth-first search algorithm is a graph traversal algorithm which prioritizes exploring the deeper nodes.",
      "4":
        "The Breadth-first search algorithm is a graph traversal algorithm which prioritizes exploring the neighboring nodes.",
    };

    const info = infoText[algorithm];

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
            Pathfinding Algorithm Visualizer
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {isRunning ? (
            <>
              <span className="info-text">Visualizing</span>
              <Spinner animation="border" variant="light" />
            </>
          ) : (
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
                <Button
                  variant={diagonal ? "secondary" : "light"}
                  onClick={this.handleChange}
                >
                  {diagonal
                    ? "Lateral traversal only"
                    : "Allow diagonal traversal"}
                </Button>
              </Nav>
              <div className="links">
                <a href="https://github.com/paspunoor/pathfinding_visualizer">
                  <Image alt="code" className="icons" src={codeImg} />
                </a>
                <a href="https://github.com/paspunoor">
                  <Image alt="github" className="icons" src={githubImg} />
                </a>
                {/* <a>
                  <Image alt="profile" className="icons" src={profileImg} />
                </a> */}
              </div>
            </Navbar.Collapse>
          )}
        </Navbar>
        <div className="panel">
          <div className="info">
            <div className="tutorial">
              Welcome to the Pathfinding Algorithm Visualizer! Drag and drop the
              Spaceship and the Planet anywhere on the grid. You can add
              asteroids by clicking and dragging on an empty cell. Choose an
              algorithm from the dropdown list above and click on <b>Run</b> to
              watch the Spaceship find it's way to the Planet. Tip: Click on
              Clear walls and board if you lose your Spaceship or Planet.
            </div>
            <div className="algo-info">{info}</div>
          </div>
          <div className="metrics">
            <span className="stat visited">{"NODES VISITED : " + visited}</span>
            <span className="stat path">
              {"PATH LENGTH : " + (pathLength - 2 || pathLength)}
            </span>
          </div>
        </div>
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
