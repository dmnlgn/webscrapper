import React, { useEffect, useRef, useState } from "react";
import "./BoxPagination.less";

const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const prevCountRef = useRef(currentPage);

  const boxPerPage = 5;
  const fetchData = props.fetchData;

  const indexOfLastTodo = currentPage * boxPerPage;
  const indexOfFirstTodo = indexOfLastTodo - boxPerPage;
  const renderFetchedData = fetchData?.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderHandleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

    useEffect(() => {
    if (renderFetchedData) {
      props.getPaginateData(renderFetchedData);
    }
  }, [currentPage, props.fetchData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [props.api, props.fetchData]);

  const renderHandlePrevNext = (event) => {
    const limit = event.target?.getAttribute?.("limit");
    if (limit && event.target.id === "next" && currentPage < Number(limit)) {
      setCurrentPage(currentPage + 1);
    }
    if (limit && event.target.id === "prev" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageNumbers = [];
  for (let i = 0; i <= Math.ceil(fetchData?.length / boxPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers?.map((number, key) => {
    return (
      <li
        key={number}
        id={number}
        onClick={renderHandleClick}
        className="box-page-numbers-li">
        {number}
      </li>
    );
  });
  const handleChange = (event) => {
    if (event.target.value > 0 && event.target.value < pageNumbers.length) {
      setCurrentPage(Number(event.target.value));
    } else {
      setCurrentPage(1);
    }
    //props.getPaginateData(renderFetchedData);
  };

  return (
    <div className="box-pagination">
      <ul className="box-page-numbers">
        <li
          id={"prev"}
          limit={pageNumbers?.length}
          onClick={renderHandlePrevNext}>
          {"< PREV"}
        </li>
        {/* <ul className="box-page-numbers-inside">{renderPageNumbers} </ul> */}
        <input value={currentPage} onChange={handleChange}></input>
        <p>z {pageNumbers.length}</p>
        <li
          id={"next"}
          limit={pageNumbers?.length}
          onClick={renderHandlePrevNext}>
          {"NEXT >"}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
