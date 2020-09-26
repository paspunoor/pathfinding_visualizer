import React, { Component } from "react";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isClearingWalls) {
      this.setState({
        ...nextProps,
      });
    }
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
      if (this.props.isMovingStart && !this.state.isEnd) {
        this.setState({
          isStart: true,
          isWall: false,
        });
      } else if (this.props.isMovingEnd && !this.state.isStart) {
        this.setState({
          isEnd: true,
          isWall: false,
        });
      } else {
        this.handleMouseDown();
      }
    }
  }

  handleMouseLeave() {
    if (this.props.isMovingStart) {
      this.setState({
        isStart: false,
      });
    }

    if (this.props.isMovingEnd) {
      this.setState({
        isEnd: false,
      });
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
        onMouseLeave={this.handleMouseLeave}
      ></td>
    );
  }
}

export default Node;
