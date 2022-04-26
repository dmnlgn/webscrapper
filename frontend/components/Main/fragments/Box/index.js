import React, { Component, useEffect, useState } from "react";

import { getScrapes } from "../../../../scripts/fetchData";

import Pagination from "../Pagination/Pagination";
import Table from "./Table/Table";
import Filter from "../Filters";
import ProductSearch from "../ProductSearch";

import "./Box.less";
import ReactTable from "./Table/ReactTable";
import ProductBox from "../ProductBox/ProductBox";

const Box = (props) => {
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    getData();
  }, [props.api]);

  const getData = async () => {
    await getScrapes(props.api, (fetchData) => {
      setFetchData(fetchData.data);
    });
  };

  return (
    <div className="box">
      <div className="box-container">
        <Filter
          pageName={props.name}
          data={fetchData}
          //getFilterData={this.getFilterData}
          subpages={props.subpages}
          pages={props.pages}
          location={props.path}
       //currentPage={props}
          {...props}
        />
        <ProductSearch
          data={fetchData}
        />
        <ProductBox data={fetchData} {...props} />
      </div>
    </div>
  );
};
//}

export default Box;
