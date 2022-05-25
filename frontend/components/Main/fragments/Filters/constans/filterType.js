import React from "react";
import Sort from "../../ProductHeader/elements/Sort/Sort";
import FilterPrice from "../FilterTypes/FilterPrice";
import Price from "../FilterTypes/Price";

export const filterType = (props) => ({
  Sort: {
    title: "SORT",
    component: <Sort {...props} />,
  },
  Price: {
    title: "PRICE",
    component: <Price {...props} />,
  },
});
