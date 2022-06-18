import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./ProductCategory.less";

class ProductCategory extends Component {
  renderSubPages = (subpages) => {
    if (subpages) {
      return subpages?.map((e, i) => (
        <Link key={i} to={e?.path ?? "/"}>
          {e?.name}
        </Link>
      ));
    }
  };

  render() {
    const subPages = this.renderSubPages(this.props.subpages);

    return subPages ? (
      <div className="product-category">
        <div className="product-category-box">
          <div className="product-category-header">CATEGORY</div>
          <div className="product-category-main">
            <form className="product-category-main-content">{subPages}</form>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default ProductCategory;
