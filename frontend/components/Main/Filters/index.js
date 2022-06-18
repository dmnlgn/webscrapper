import React from "react";
import ProductCategory from "../ProductCategory/ProductCategory";

import { filterType } from "./constans/filterType";

import "./Filter.less";

const Filter = (props) => {
  const filters = props.filters;

  return (
    <div className="filter-box">
      <div className="filter-box-list">
        <ProductCategory
          subpages={props.subpages}
          pages={props.pages}
          pageName={props.pageName}
          location={props.location}
          currentPage={props.currentPage}
        />
        {filters?.map((filter, index) => {
          const FilterBox = filterType(props)[filter];

          return (
            <div className="filter-box-wrapper" key={index}>
              <div className="filter-box-list-header">{FilterBox.title}</div>
              <div className="filter-box-list-main">{FilterBox.component}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
