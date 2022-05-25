import React, { useState } from "react";
import "./Search.less";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState([]);

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onClick = (e) => {};

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="search">
      <form className="search-wrapper" onSubmit={onSubmit}>
        <input className="search-input" onChange={onChange} />
        <button className="search-button" onClick={onClick} type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default Search;
