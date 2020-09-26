import React, { Component } from "react";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  handleMouseDown() {
    if (!(this.state.isEnd || this.state.isStart)) {
      this.setState({
        isWall: !this.state.isWall,
      });
    }
  }

  handleMouseEnter() {
    if (this.props.mouseDown) {
      this.handleMouseDown();
    }
  }

  render() {
    const { row, col, isEnd, isStart, isWall, isVisited } = this.state;

    const customClass = isEnd
      ? "node-end"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : isVisited
      ? "node-visited"
      : "";

    return (
      <td
        id={`node-${row}-${col}`}
        className={`node ${customClass}`}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
      ></td>
    );
  }
}

export default Node;
