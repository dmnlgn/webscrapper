import React from "react";
import Box from "../../components/Main/fragments/Box";

const ProductPage = (props) => {
  return <Box api={props.api} {...props} />;
};

export default ProductPage;
