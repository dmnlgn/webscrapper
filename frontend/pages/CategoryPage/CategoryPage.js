import React from "react";
import { Link } from "react-router-dom";

import RoutesPath from "../../components/Main/RoutesPath/RoutesPath";
import "./CategoryPage.less";

const CategoryPage = (props) => {
  return (
    <>
      <RoutesPath
        pages={props.pages}
        subpages={props.subpages}
        currentPage={props.currentPage}
        name={props.name}
        path={props.path}
      />
      <div className="categoryPage wrapper">
        {props.subpages.map((subpage, i) => (
          <div className="categoryPage-shop" key={i}>
            <Link to={subpage.path}>{subpage.name}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryPage;
