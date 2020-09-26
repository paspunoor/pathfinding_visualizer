import React, { Component } from "react";
import Node from "./node";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

// Starting with a predefined start and end node
const START_NODE_ROW = 5;
const START_NODE_COL = 15;
const END_NODE_ROW = 20;
const END_NODE_COL = 50;

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
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    this.setState({ mouseDown: true });
  }

  handleMouseUp() {
    this.setState({ mouseDown: false });
  }

  render() {
    const { grid, mouseDown } = this.state;

    return (
      <div
        onMouseUp={(e) => {
          e.preventDefault();
          this.handleMouseUp();
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          this.handleMouseDown();
        }}
      >
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand>
            <img
              alt=""
              src="/path.svg"
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
                        mouseDown={this.state.mouseDown}
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
const getInitialGrid = () => {
  const grid = [];

  for (let row = 0; row < 25; row++) {
    const cur = [];

    for (let col = 0; col < 70; col++) {
      cur.push(createNode(row, col));
    }

    grid.push(cur);
  }
  return grid;
};

// Creating each node
const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === END_NODE_ROW && col === END_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

export default Visualizer;
