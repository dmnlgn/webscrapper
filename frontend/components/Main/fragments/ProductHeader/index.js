import React, { Component } from "react";
import { sortBy } from "lodash-es";

import "./ProductHeader.less";

class ProductHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sampleHeader: [],
    };
  }

  componentDidMount() {
    this.getStaticHeader();
  }

  getStaticHeader = () => {
    const headerUnique = [
      { title: "NAZWA", type: "name" },
      { title: "CENA", type: "price" },
      { title: "ADRES", type: "href" },
    ];

    this.setState({
      sampleHeader: headerUnique,
    });
  };

  sortCells = (e) => {
    const elementLi = document
      .getElementsByClassName("product-header")[0]
      .getElementsByTagName("button")[e.target.value];

    let sampleData = [];
    if (elementLi?.innerHTML === "ASC") {
      sampleData = sortBy(this.props.data, (o) => {
        return o[e.target.value];
      });
      this.props.getSortedData(sampleData, 1);
      return (elementLi.innerHTML = "DESC");
    }
    if (elementLi?.innerHTML === "DESC") {
      sampleData = sortBy(this.props.data, (o) => {
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
          <>
            <div className="product-header-td">
              <span>{e.title}</span>
              <button
                className="product-header-button"
                // ref={(e) => (this.form = e)}
                id={e.type}
                value={e.type}
                onClick={(e) => this.sortCells(e)}>
                ASC
              </button>
            </div>
          </>
        ))}
      </tr>
    );
  }
}

export default ProductHeader;
