import React from "react";

import { Link } from "react-router-dom";

import Menu from "../Menu";
import Search from "./Search/Search";

import "./Header.less";

const Header = (props) => {
  return (
    <div className="header">
      <div className="header-box wrapper">
        <div className="header-box-left">
          <div className="header-logo">
            <Link to={"/"} className="header-logo">
              scrapper
            </Link>
          </div>
          <Menu pages={props.pages} />
        </div>
        <div className="header-box-right">
          <Search {...props} />
        </div>
      </div>
    </div>
  );
};

export default Header;
