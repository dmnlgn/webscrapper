import React, { Component, useEffect, useState } from "react";

import { getScrapes } from "../../../../scripts/fetchData";

import Pagination from "../Pagination/Pagination";
import Filter from "../Filters";
import ProductSearch from "../ProductSearch";

import "./Box.less";
import ProductBox from "../ProductBox/ProductBox";
import RoutesPath from "../RoutesPath/RoutesPath";

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

  const getRenderData = (data) => {
    setFetchData(data);
  };

  return (
    <>
      <div className="box-routes">
        <div className="box-routes-wrapper wrapper">
          <RoutesPath
            pages={props.pages}
            subpages={props.subpages}
            currentPage={props.currentPage}
            name={props.name}
            path={props.path}
          />
        </div>
      </div>
      <div className="box wrapper">
        <div className="box-container">
          <Filter
            pageName={props.name}
            data={fetchData}
            subpages={props.subpages}
            pages={props.pages}
            location={props.path}
            name={props.name}
            getRenderData={getRenderData}
            getData={getData}
            {...props}
          />
          {/* <ProductSearch data={fetchData} /> */}
          <ProductBox data={fetchData} {...props} />
        </div>
      </div>
    </>
  );
};
//}

export default Box;
