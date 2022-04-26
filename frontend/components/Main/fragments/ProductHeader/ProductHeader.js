import React from "react";
import Sort from "./elements/Sort/Sort";

const ProductHeader = (props) => {
  return (
    <div className="product-header">
      <div className="product-header-sort">
        <div className="product-header-sort-box">
          <Sort
            api={props.api}
            data={props.data}
            getRenderData={props.getRenderData}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
