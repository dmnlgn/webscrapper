import React, { useEffect, useState } from "react";
import { sortBy } from "lodash";

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

  const onChange = (event) => {
    setSortValue(event.target.value);
    sortData(event.target.value);
  };

  const sortData = (type) => {
    const newData = sortBy(props.data, type);
    setSortedData(sortedData);
    props.getRenderData(newData);
  };

  return (
    <>
      <select onChange={(e) => onChange(e)} value={sortValue}>
        <option defaultValue disabled hidden>
          {sortValue}
        </option>
        {options.map((e, i) => (
          <option key={i} value={e.value}>
            {e.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Sort;
