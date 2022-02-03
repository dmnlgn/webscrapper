import React, { Component } from "react";
import MOCK_DATA from "../../../../MOCK_DATA.json";

import "./Box.less";

const _ = require("lodash");

class Box extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: "",
      currentPage: 1,
      boxPerPage: 10,
      sampleProduct: MOCK_DATA,
      sampleData: [],
      sampleHeader: [],
    };

    this.renderHandleClick = this.renderHandleClick.bind(this);
    this.renderHandlePrevNext = this.renderHandlePrevNext.bind(this);
  }

  componentDidMount() {
    const elementLi = document
      .getElementsByClassName("box-page-numbers")[0]
      .getElementsByTagName("li")[this.state.currentPage];

    elementLi.classList.add("box-page-numbers-active");

    const uniqueNames = this.getUniqueNames();
    if (uniqueNames) {
      this.getHeader(uniqueNames);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.changeAttribLi(prevState.currentPage, this.state.currentPage);
    }
  }

  sortCells = (elementType) => {
    this.setState({
      sampleProduct: _.sortBy(this.state.sampleProduct, (o) => {
        return o[elementType.target.value];
      }),
      currentPage: 1,
    });
  };

  renderHandleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  renderHandlePrevNext(event) {
    const limit = event.target.getAttribute("limit");

    if (event.target.id === "next" && this.state.currentPage < Number(limit)) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    } else if (event.target.id === "prev" && this.state.currentPage !== 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  }

  changeAttribLi = (prev, current) => {
    const elementLi = document
      .getElementsByClassName("box-page-numbers")[0]
      .getElementsByTagName("li");

    elementLi[current].classList.add("box-page-numbers-active");

    if (elementLi[prev].classList.contains("box-page-numbers-active")) {
      elementLi[prev].classList.remove("box-page-numbers-active");
    }
  };

  handleChange = (e) => {
    this.setState({ checked: e.target.value });
  };

  getUniqueNames = () => {
    const uniqueNames = [
      ...new Set(
        [].concat(
          ...MOCK_DATA.map((e) => {
            return Object.getOwnPropertyNames(e);
          }),
        ),
      ),
    ];

    return uniqueNames;
  };

  getHeader = (uniqueNames) => {
    let headerUnique = [];
    uniqueNames.map((e) => {
      if (e === "name") {
        headerUnique = [
          ...headerUnique,
          {
            title: "NAZWA",
            type: e,
          },
        ];
      }
      if (e === "price") {
        headerUnique = [
          ...headerUnique,
          {
            title: "CENA",
            type: e,
          },
        ];
      }
      if (e === "href") {
        headerUnique = [
          ...headerUnique,
          {
            title: "ADRES",
            type: e,
          },
        ];
      }
    });

    this.setState({
      sampleHeader: headerUnique,
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
          <table className="box-table">
            <thead>
              <tr>
                {this.state.sampleHeader.map((e, key) => (
                  <td key={key}>
                    {e.title}
                    <input
                      type="checkbox"
                      id={e.type}
                      name="sorted"
                      value={e.type}
                      onClick={(e) => this.sortCells(e, sampleProduct)}
                      onChange={this.handleChange}
                      checked={this.state.checked === e.type}
                    />
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {renderSampleData.map((e, key) => {
                return (
                  <tr key={key}>
                    <td>{e.name}</td>
                    <td>{e.price}</td>
                    <td>{e.href}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="box-pagination">
            <ul className="box-page-numbers" ref={(c) => (this.form = c)}>
              <li
                id={"prev"}
                limit={pageNumbers.length}
                onClick={this.renderHandlePrevNext}>
                {"<"}
              </li>
              {renderPageNumbers}
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
