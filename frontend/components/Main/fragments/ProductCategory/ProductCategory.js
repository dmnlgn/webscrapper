import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./ProductCategory.less";

class ProductCategory extends Component {
  renderSubPages = (pages) => {
    if (pages.subpages) {
      return pages?.subpages.map((e, i) => (
        <Link key={i} to={e?.path ?? "/"}>
          {"> "}
          {e?.name}
        </Link>
      ));
    }
  };

  render() {
    const subPages = this.renderSubPages(this.props.currentPage);

    return (
      <div className="product-category">
        {subPages && (
          <>
            <div className="product-category-header">KATEGORIE</div>
            <div className="product-category-main">
              <form className="product-category-main-content">{subPages}</form>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default ProductCategory;
