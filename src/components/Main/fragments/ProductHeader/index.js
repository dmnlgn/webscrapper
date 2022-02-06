import React, { Component } from "react";
import "./ProductHeader.less";

const _ = require("lodash");

class ProductHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sampleHeader: [],
    };
  }

  componentDidMount() {
    const uniqueNames = this.getUniqueNames();

    if (uniqueNames) {
      this.getHeader(uniqueNames);
    }
  }

  getUniqueNames = () => {
    const uniqueNames = [
      ...new Set(
        [].concat(
          ...this.props.data.map((e) => {
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

  sortCells = (e) => {
    const elementLi = document
      .getElementsByClassName("product-header")[0]
      .getElementsByTagName("button")[e.target.value];

    let sampleData = [];
    if (elementLi.innerHTML === "ASC") {
      sampleData = _.sortBy(this.props.data, (o) => {
        return o[e.target.value];
      });
      this.props.getSortedData(sampleData, 1);
      return (elementLi.innerHTML = "DESC");
    }
    if (elementLi.innerHTML === "DESC") {
      sampleData = _.sortBy(this.props.data, (o) => {
        return o[e.target.value];
      });
      sampleData.reverse();
      this.props.getSortedData(sampleData, 1);
      return (elementLi.innerHTML = "ASC");
    }
  };

  render() {
    return (
      <tr className="product-header">
        {this.state.sampleHeader.map((e, key) => (
          <td className key={key}>
            <div className="product-header-td">
              <span>{e.title}</span>
              <button
                className="product-header-button"
                ref={(e) => (this.form = e)}
                id={e.type}
                value={e.type}
                onClick={(e) => this.sortCells(e)}>
                ASC
              </button>
            </div>
          </td>
        ))}
      </tr>
    );
  }
}

export default ProductHeader;
