import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";

import { currentApi } from "../../../redux/actions/actionGetApi";
import { getData } from "../../../redux/actions/actionGetData";

import Filter from "../Filters";
import ProductBox from "../ProductBox/ProductBox";
import RoutesPath from "../RoutesPath/RoutesPath";
import ScrollTop from "../ScrollTop/ScrollTop";

import "./Box.less";

const Box = (props) => {
  const [fetchData, setFetchData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentApi(props.api));
    setProducts();
  }, [props.api, props.path]);

  useEffect(() => {
    setFetchData(props.dataTest);
  }, [!!props.query, props.isFetching === false]);

  const setProducts = () => {
    dispatch(getData(props.api)).then(() => setFetchData(props.dataTest));
  };

  const getRenderData = (data) => {
    setFetchData(data);
  };

  return (
    <>
      <RoutesPath
        pages={props.pages}
        subpages={props.subpages}
        currentPage={props.currentPage}
        name={props.name}
        path={props.path}
      />
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
      <ScrollTop />
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
