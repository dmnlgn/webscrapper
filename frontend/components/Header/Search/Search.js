import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";

import { getData } from "../../../redux/actions/actionGetData";

import "./Search.less";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState([]);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onClick = () => {
    if (props.currentApi) {
      dispatch(getData(props.currentApi, searchValue));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="search">
      <form className="search-wrapper" onSubmit={onSubmit}>
        <input
          className="search-input"
          onChange={onChange}
          value={searchValue}
        />
        <button className="search-button" onClick={onClick} type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    query: state.getData.query,
    currentApi: state.currentApi.stateApi,
  };
};

export default connect(mapStateToProps, null)(Search);
