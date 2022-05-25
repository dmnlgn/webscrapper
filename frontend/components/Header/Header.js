import React from "react";
import Menu from "../Menu";
import Search from "./Search/Search"
import "./Header.less";

const Header = (props) => {
  return (
    <div className="header">
    <div className="header-box wrapper">
      <div className="header-box-left">
      <div className="header-logo">
        <a className="header-logo">webscrapper</a>
      </div>
      <Menu pages={props.pages} />
      </div>
      <div className="header-box-right">
        <Search/>
      </div>
    </div>
    </div>
  );
};

export default Header;
