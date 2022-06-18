import React from "react";
import Box from "../../components/Main/Box";

const ProductPage = (props) => {
  return <Box api={props.api} {...props} />;
};

export default ProductPage;
