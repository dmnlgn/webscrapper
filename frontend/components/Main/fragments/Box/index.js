import React, { Component } from "react";
import MOCK_DATA from "../../../../MOCK_DATA.json";
import Filter from "../Filters";
import ProductHeader from "../ProductHeader";
import ProductList from "../ProductList";
import ProductSearch from "../ProductSearch";

import "./Box.less";

class Box extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      boxPerPage: 20,
      sampleProduct: MOCK_DATA,
    };

    this.renderHandleClick = this.renderHandleClick.bind(this);
    this.renderHandlePrevNext = this.renderHandlePrevNext.bind(this);
  }

  componentDidMount() {
    const elementLi = document
      .getElementsByClassName("box-page-numbers")[0]
      .getElementsByTagName("li")[this.state.currentPage];

    elementLi.classList.add("box-page-numbers-active");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.changeAttribLi(prevState.currentPage, this.state.currentPage);
    }
  }

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
      sampleProduct: data,
      currentPage: 1,
    });
  };

  getSearchData = (data) => {
    this.setState({
      sampleProduct: data,
      currentPage: 1,
    });
  };

  getFilterData = (data) => {
    this.setState({
      sampleProduct: data,
      currentPage: 1,
    });
  };

  render() {
    const { currentPage, boxPerPage } = this.state;
    const sampleProduct = this.state.sampleProduct;

    const indexOfLastTodo = currentPage * boxPerPage;
    const indexOfFirstTodo = indexOfLastTodo - boxPerPage;
    const renderSampleData = sampleProduct.slice(
      indexOfFirstTodo,
      indexOfLastTodo,
    );

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(sampleProduct.length / boxPerPage); i++) {
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
          data={this.state.sampleProduct}
          getFilterData={this.getFilterData}
          />
          <ProductSearch
            data={this.state.sampleProduct}
            getSearchData={this.getSearchData}
          />
          <table className="box-table">
            <thead>
              <ProductHeader
                dataHeader={this.state.sampleHeader}
                data={this.state.sampleProduct}
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
