import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./RoutesPath.less";

const RoutesPath = (props) => {
  const renderFullPath = () => {
    const pathname = window.location.pathname;
    const slashRegex = /(\w+)/gi;
    const fullPath = pathname.match(slashRegex);

    if (fullPath.length > 0) {
      const lastIndex = fullPath.length - 1;
      const array = [];
      let newpath = "";

      return fullPath.map((el, i) => {
        if (fullPath.length > 1) {
          array.push(el);
          newpath = array.join("/");
        } else {
          newpath = el;
        }

        return (
          <div className="routes-list" key={i}>
            <Link key={i} to={`/${newpath}`}>
              {el}
            </Link>
            {!(lastIndex === i) && " > "}
          </div>
        );
      });
    }
  };

  return <div className="routes-path">{renderFullPath()}</div>;
};

export default RoutesPath;
