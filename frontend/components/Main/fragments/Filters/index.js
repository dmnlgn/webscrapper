import React, { Component } from "react";
import FilterPrice from "./FilterTypes/FilterPrice";

import "./Filter.less";
import ProductCategory from "../ProductCategory/ProductCategory";
import RoutesPath from "../RoutesPath/RoutesPath";

class Filter extends Component {
  render() {
    return (
      <div className="filter-box">
        <div className="filter-box-list">
          <RoutesPath
            pages={this.props.pages}
            currentPage={this.props.currentPage}
          />
          <ProductCategory
            subpages={this.props.subpages}
            pages={this.props.pages}
            pageName={this.props.pageName}
            location={this.props.location}
            currentPage={this.props.currentPage}
          />
          <FilterPrice
            data={this.props.data}
            getFilterData={this.props.getFilterData}
          />
        </div>
      </div>
    );
  }
}

export default Filter;
