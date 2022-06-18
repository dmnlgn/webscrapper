import React from "react";
import PaginationTop from "../PaginationTop/PaginationTop";
import Sort from "../Sort/Sort.js";

import "./ProductHeader.less";

const ProductHeader = (props) => {
  return (
    <div className="product-header">
      <Sort
        api={props.api}
        data={props.data}
        getRenderData={props.getRenderData}
      />
      <PaginationTop
        {...props}
        getPaginateData={props.getPaginateData}
        fetchData={props.fetchData}
      />
    </div>
  );
};

export default ProductHeader;
