import React from "react";
import Menu from "../Menu";
import "./Header.less";

const Header = (props) => {
  return (
    <div className="header">
      <div className="header-logo">
        <a className="header-logo">webscrapper</a>
      </div>
      <Menu pages={props.pages} />
    </div>
  );
};

export default Header;
