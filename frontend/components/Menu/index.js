import React from "react";
import { NavLink } from "react-router-dom";

import "./Menu.less";

const Menu = (props) => {
  const menuList = (pages) =>
    pages?.map((page, index) => {
      return (
        <NavLink key={index} to={page.path}>
          {page.name}
        </NavLink>
      );
    });

  return (
    <div className="menu">
      <nav className="menu-nav">
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/">
          Home
        </NavLink>
        {menuList(props.pages)}
      </nav>
    </div>
  );
};

export default Menu;
