import React, { Component, useEffect, useState } from "react";
import Pagination from "../Pagination/BoxPagination";
//import Pagination from "../Pagination/Pagination";
import Product from "../Product/Product";
import ProductHeader from "../ProductHeader/ProductHeader";

import "./ProductBox.less";

const ProductBox = (props) => {
  const [fetchData, setFetchData] = useState(props.data);
  const [paginateData, setPagianteData] = useState([]);

  useEffect(() => {
    setFetchData(props.data);
  }, [props.data]);

  const getRenderData = (data) => {
    setFetchData(data);
  };

  const getPaginateData = (data) => {
    setPagianteData(data)
  }

  return (
    <div className="product-box-main">
      <ProductHeader
        api={props.api}
        data={props.data}
        getRenderData={getRenderData}
      />
      <Pagination
        {...props}
        getPaginateData={getPaginateData}
        fetchData={fetchData}
      />
      <Product data={paginateData} />
    </div>
  );
};

export default ProductBox;
