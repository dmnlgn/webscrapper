import React from "react";
import { NavLink } from "react-router-dom";

import "./Menu.less";

const Menu = (props) => {
  const menuList = (pages) =>
    pages?.map((page, index) => {
      if (page.name) {
        return (
          <NavLink
            key={index}
            to={page.path}
            className={({ isActive }) => (isActive ? "active" : "inactive")}>
            {page.name}
          </NavLink>
        );
      }
    });

  return (
    <div className="menu">
      <nav className="menu-nav">
        {menuList(props.pages)}
      </nav>
    </div>
  );
};

export default Menu;
