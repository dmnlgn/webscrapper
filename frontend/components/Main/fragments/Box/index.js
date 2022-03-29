import React, { Component } from "react";

import { getScrapes } from "../../../../scripts/fetchData";

import Pagination from "./Pagination/Pagination";
import Table from "./Table/Table";
import Filter from "../Filters";
import ProductSearch from "../ProductSearch";

import "./Box.less";
import ReactTable from "./Table/ReactTable";

class Box extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      boxPerPage: 20,
      fetchData: [],
      fetchFilterData: [],
    };
  }

  componentDidMount() {
    if (this.props.api) {
      this.getData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.api !== this.props.api) {
      if (this.props.api) {
        this.getData();
      }
    }
  }

  getData = async () => {
    await getScrapes(this.props.api, (fetchData) => {
      this.setState({
        fetchData: fetchData.data,
        fetchFilterData: fetchData.data,
      });
    });
  };

  getSortedData = (data) => {
    this.setState({
      fetchFilterData: data,
      currentPage: 1,
    });
  };

  getSearchData = (data) => {
    this.setState({
      fetchFilterData: data,
      currentPage: 1,
    });
  };

  getFilterData = (data) => {
    this.setState({
      fetchFilterData: data,
      currentPage: 1,
    });
  };

  getCurrentPage = (current) => {
    this.setState({
      currentPage: current,
    });
  };

  render() {
    const { currentPage, boxPerPage, fetchData, fetchFilterData } = this.state;

    const indexOfLastTodo = currentPage * boxPerPage;
    const indexOfFirstTodo = indexOfLastTodo - boxPerPage;
    const renderFetchedData = fetchFilterData?.slice(
      indexOfFirstTodo,
      indexOfLastTodo,
    );

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(fetchFilterData?.length / boxPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="box">
        <div className="box-container">
          <Filter
            pageName={this.props.name}
            data={fetchData}
            getFilterData={this.getFilterData}
            subpages={this.props.subpages}
            pages={this.props.pages}
            location={this.props.path}
            currentPage={this.props}
          />
          <ProductSearch data={fetchData} getSearchData={this.getSearchData} />
          <ReactTable data={fetchData} />
          {/* <Table
            fetchData={fetchData}
            getSortedData={this.getSortedData}
            pageNumber={currentPage}
            renderFetchedData={renderFetchedData}
          /> */}
          {/* {renderFetchedData && <ReactTable data={fetchData} />} */}
          {/* <Pagination
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            boxPerPage={boxPerPage}
            getCurrentPage={this.getCurrentPage}
          /> */}
        </div>
      </div>
    );
  }
}

export default Box;
