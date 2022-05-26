import React, { Component, useEffect, useState } from "react";

import { getScrapes } from "../../../../scripts/fetchData";

import Pagination from "../Pagination/Pagination";
import Filter from "../Filters";
import ProductSearch from "../ProductSearch";

import "./Box.less";
import ProductBox from "../ProductBox/ProductBox";
import RoutesPath from "../RoutesPath/RoutesPath";
import { connect, useDispatch } from "react-redux";

import { currentApi } from "../../../../redux/actions/actionGetApi";
import { getData } from "../../../../redux/actions/actionGetData";

const Box = (props) => {
  const [fetchData, setFetchData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentApi(props.api));
    setProducts()
  }, [props.api, props.path]);

  useEffect(() => {
    setFetchData(props.dataTest);
  }, [!!props.query, props.isFetching === false]);

  const setProducts = () => {
    dispatch(getData(props.api)).then(() => setFetchData(props.dataTest));
  }

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
            getData={setProducts}
            {...props}
          />
          <ProductBox data={fetchData} {...props} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const currentApi = state.currentApi.stateApi;
  const { dataTest, isFetching, query, error } = state.getData;

  return {
    dataTest,
    isFetching,
    query,
    error,
    currentApi,
  };
};

export default connect(mapStateToProps, null)(Box);

// export default Box;
