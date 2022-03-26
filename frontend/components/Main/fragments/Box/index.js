import React, { Component } from "react";
import Filter from "../Filters";
import ProductHeader from "../ProductHeader";
import ProductList from "../ProductList";
import ProductSearch from "../ProductSearch";

import "./Box.less";
import { getScrapes } from "../../../../scripts/fetchData";

class Box extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      boxPerPage: 20,
      sampleProduct: [],
      newData: [],
      webAPI: "",
    };

    this.renderHandleClick = this.renderHandleClick.bind(this);
    this.renderHandlePrevNext = this.renderHandlePrevNext.bind(this);
  }

  componentDidMount() {
    if (this.props.api) {
      this.getData();
    }

    const elementLi = document
      .getElementsByClassName("box-page-numbers")[0]
      .getElementsByTagName("li")[this.state.currentPage];

    elementLi.classList.add("box-page-numbers-active");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.changeAttribLi(prevState.currentPage, this.state.currentPage);
    }

    if (prevProps.api !== this.props.api) {
      if (this.props.api) {
        this.getData();
      }
    }
  }

  getData = async () => {
    await getScrapes(this.props.api, (fetchData) => {
      this.setState({ sampleProduct: fetchData.data, newData: fetchData.data });
    });
  };

  renderHandleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  renderHandlePrevNext(event) {
    const { currentPage } = this.state;
    const limit = event.target.getAttribute("limit");

    if (event.target.id === "next" && currentPage < Number(limit)) {
      this.setState({
        currentPage: currentPage + 1,
      });
    }
    if (event.target.id === "prev" && currentPage !== 1) {
      this.setState({
        currentPage: currentPage - 1,
      });
    }
  }

  changeAttribLi = (prev, current) => {
    const elementLi = document
      .getElementsByClassName("box-page-numbers")[0]
      .getElementsByTagName("li");

    elementLi?.[current].classList.add("box-page-numbers-active");

    if (elementLi?.[prev].classList.contains("box-page-numbers-active")) {
      elementLi[prev].classList.remove("box-page-numbers-active");
    }
  };

  getSortedData = (data) => {
    this.setState({
      newData: data,
      currentPage: 1,
    });
  };

  getSearchData = (data) => {
    this.setState({
      newData: data,
      currentPage: 1,
    });
  };

  getFilterData = (data) => {
    this.setState({
      newData: data,
      currentPage: 1,
    });
  };

  render() {
    const { currentPage, boxPerPage, sampleProduct, newData } = this.state;

    const indexOfLastTodo = currentPage * boxPerPage;
    const indexOfFirstTodo = indexOfLastTodo - boxPerPage;
    const renderSampleData = newData?.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(newData?.length / boxPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li key={number} id={number} onClick={this.renderHandleClick}>
          {number}
        </li>
      );
    });

    return (
      <div className="box">
        <div className="box-container">
          <Filter
            pageName={this.props.name}
            data={this.state.sampleProduct}
            getFilterData={this.getFilterData}
            subpages={this.props.subpages}
            pages={this.props.pages}
            location={this.props.path}
            currentPage={this.props}
          />
          <ProductSearch
            data={sampleProduct}
            getSearchData={this.getSearchData}
          />
          <table className="box-table">
            <thead>
              <ProductHeader
                dataHeader={this.state.sampleHeader}
                data={sampleProduct}
                getSortedData={this.getSortedData}
                pageNumber={currentPage}
              />
            </thead>
            <tbody className={"box-table-tbody"}>
              <ProductList data={renderSampleData} />
            </tbody>
          </table>
          <div className="box-pagination">
            <ul className="box-page-numbers">
              <li
                id={"prev"}
                limit={pageNumbers.length}
                onClick={this.renderHandlePrevNext}>
                {"<"}
              </li>
              <ul className="box-page-numbers-inside">{renderPageNumbers}</ul>
              <li
                id={"next"}
                limit={pageNumbers.length}
                onClick={this.renderHandlePrevNext}>
                {">"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Box;
