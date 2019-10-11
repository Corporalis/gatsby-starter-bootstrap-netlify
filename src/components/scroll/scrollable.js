import React from "react";

export default class Scrollable extends React.Component {
  handleScroll = event => {
    // Call the passed-in prop
    if (this.props.onWindowScroll) {
      this.props.onWindowScroll(event);
    }
  };

  render = () => {
    return null; //this.props.children;
  };

  componentDidMount = () => {
    if (this.props.onWindowScroll) {
      window.addEventListener("scroll", this.handleScroll, false);
    }
  };

  componentWillUnmount = () => {
    if (this.props.onWindowScroll) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  };
}
