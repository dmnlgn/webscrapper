import React, { Component } from "react";
import "./Product.less";

const Product = (props) => {
  return (
    <div className="product">
      {props.data.map((element, index) => (
        <div className="product-box" key={index}>
          <div className="product-box-image">
            <img
              src="http://localhost:9000/public/images/blog-ph.jpg"
              alt="test"
            />
          </div>
          <div className="product-box-article">
            <div className="product-box-article-title">{element.name}</div>
            <div className="product-box-article-price">
              {element.price}
              {"PLN"}
            </div>
            <div className="product-box-article-href"><a href={element.href}>{element.href}</a></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
