import React, { Component } from "react";
import "./Header.less";

class Header extends Component {
  state = {};
  render() {
    return (
      <div className="header">
        <a className="header-logo">webscrapper</a>
      </div>
    );
  }
}

export default Header;
