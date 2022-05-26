import React, { useEffect, useState } from "react";
import { sortBy } from "lodash";

import "./Sort.less";

const Sort = (props) => {
  const defaultValue = "Choose From List";
  const options = [
    { name: "Sort by price", value: "price" },
    { name: "Sort by name", value: "name" },
    { name: "Sort by href", value: "href" },
  ];

  const [sortValue, setSortValue] = useState(defaultValue);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    setSortValue(defaultValue);
  }, [props.api]);

  const onClick = (event) => {
    setSortValue(event);
    sortData(event);
  };

  const sortData = (type) => {
    const newData = sortBy(props.data, type);
    setSortedData(sortedData);
    props.getRenderData(newData);
  };

  return (
    <>
      {/* <select onChange={(e) => onChange(e)} value={sortValue}>
        <option defaultValue disabled hidden>
          {sortValue}
        </option>
        {options.map((e, i) => (
          <option key={i} value={e.value}>
            {e.name}
          </option>
        ))}
      </select> */}
      <div className="product-sort">
        {options.map((e, i) => (
          <div key={i} value={e.value} onClick={() => onClick(e.value)}>
            {"> "}
            {e.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default Sort;
