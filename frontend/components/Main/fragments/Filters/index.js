import React, { Component } from "react";
import FilterPrice from "./FilterTypes/FilterPrice";

import "./Filter.less";
import ProductCategory from "../ProductCategory/ProductCategory";
import RoutesPath from "../RoutesPath/RoutesPath";
import Sort from "../ProductHeader/elements/Sort/Sort";

import { filterType } from "./constans/filterType";

const Filter = (props) => {
  const filters = props.filters;

  return (
    <div className="filter-box">
      <div className="filter-box-list">
        {/* <RoutesPath
          pages={props.pages}
          subpages={props.subpages}
          currentPage={props.currentPage}
          name={props.name}
          path={props.path}
        /> */}
        <ProductCategory
          subpages={props.subpages}
          pages={props.pages}
          pageName={props.pageName}
          location={props.location}
          currentPage={props.currentPage}
        />
        {/* <FilterPrice data={props.data} getFilterData={props.getFilterData} /> */}
        {filters?.map((filter, index) => {
          //return filterType(props)[filter];

          const FilterBox = filterType(props)[filter];

          return (
            <div className="filter-price" key={index}>
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
