import React from "react";
import PropTypes from "prop-types";

export default class Scrollable extends React.Component {
  handleScroll = event => {
    // Do something generic, if you have to
    console.log("Scrollable's handleScroll");

    // Call the passed-in prop
    if (this.props.onWindowScroll) {
      this.props.onWindowScroll(event);
    }
  };

  render = () => {
    return null; //this.props.children;
  };

  componentDidMount = () => {
    console.log("Scrollable's componentDidMount");
    if (this.props.onWindowScroll) {
      window.addEventListener("scroll", this.handleScroll, false);
    }
  };

  componentWillUnmount = () => {
    console.log("Scrollable's componentWillUnmount");
    if (this.props.onWindowScroll) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  };
}
