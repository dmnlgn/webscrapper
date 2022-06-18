import React from "react";
import Price from "../FilterTypes/Price";

export const filterType = (props) => ({
  Price: {
    title: "PRICE",
    component: <Price {...props} />,
  },
});
