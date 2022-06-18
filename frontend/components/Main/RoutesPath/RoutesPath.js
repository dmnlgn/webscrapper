import React from "react";
import { Link } from "react-router-dom";

import "./RoutesPath.less";

const RoutesPath = (props) => {
  const findPage = (pages, element) => {
    for (let node of pages) {
      if (node?.path.includes(element)) {
        return node;
      }
      if (node?.subpages) {
        let desiredNode = findPage(node.subpages, element);
        if (desiredNode) {
          return desiredNode;
        }
      }
    }
  };

  const renderFullPath = () => {
    const pathname = window.location.pathname;
    const slashRegex = /(\w+)/gi;
    const fullPath = pathname.match(slashRegex);

    if (fullPath.length > 0) {
      const lastIndex = fullPath.length - 1;
      let array = [];
      let newpath = "";

      return fullPath.map((el, i) => {
        if (fullPath.length > 1) {
          array.push(el);
          newpath = array.join("/");
        } else {
          newpath = el;
        }

        const currentPage = findPage(props?.pages, newpath);

        return (
          <div className="routes-list" key={i}>
            <Link key={i} to={`/${newpath}`}>
              {/* {el} */}
              {currentPage?.name}
            </Link>
            {!(lastIndex === i) && <span className="routes-arrow">{" > "}</span>}
          </div>
        );
      });
    }
  };

  return (
    <div className="routes">
      <div className="routes-wrapper wrapper">
        <div className="routes-path">{renderFullPath()}</div>
      </div>
    </div>
  );
};

export default RoutesPath;
