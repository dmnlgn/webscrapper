import React, { Component } from "react";
import "./ProductSearch.less";

class ProductSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productData: this.props?.data,
    };
  }

  onKeyUp = (ev) => {
    const { value } = ev.target;
    const data = this.state.productData;
    let searchData = [];

    if (value) {
      searchData = data.filter((el) => {
        if (el.name.match(value)) {
          return el.name;
        }
      });
      this.props.getSearchData(searchData);
    } else {
      this.props.getSearchData(data);
    }
  };

  render() {
    return (
      <div className="product-search">
        <div className="product-search-box">
          <input
            type="text"
            className="product-search-input"
            placeholder="Search..."
            onKeyUp={this.onKeyUp}
          />
        </div>
      </div>
    );
  }
}

export default ProductSearch;
