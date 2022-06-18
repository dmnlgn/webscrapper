import React from "react";
import "./Product.less";

const Product = (props) => {
  return (
    <div className="product">
      {props.data.map((element, index) => (
        <div className="product-box" key={index}>
          <div className="product-box-image">
            <img
              src={
                element.imageUrl ??
                "http://localhost:9000/public/images/blog-ph.jpg"
              }
              alt="test"
            />
          </div>
          <div className="product-box-article">
            <div className="product-box-article-title">
              <a href={element.productUrl}>{element.name}</a>
            </div>
            <div className="product-box-article-price">
              {element.discountPrice ? (
                <div className="product-box-article-price-discount">
                  <span className="regular-price">{element.price}</span>
                  <span className="new-price">
                    {element.discountPrice}
                    <span className="price-pln">PLN</span>
                  </span>
                </div>
              ) : (
                <>
                  <span className="regular-price">{element.price}</span>
                  {element.price && <span className="price-pln">PLN</span>}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
