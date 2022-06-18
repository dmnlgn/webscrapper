import React, { useEffect, useState } from "react";
import { getPagination } from "../../../redux/actions/actionPagination";
import { connect, useDispatch } from "react-redux";
import "./BoxPagination.less";

const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState(
    props.paginationState.currentPage,
  );
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const dispatch = useDispatch();

  //const boxPerPage = 21;
  const boxPerPage = 21;
  const fetchData = props.fetchData;

  const indexOfLastTodo = currentPage * boxPerPage;
  const indexOfFirstTodo = indexOfLastTodo - boxPerPage;
  const renderFetchedData = fetchData?.slice(indexOfFirstTodo, indexOfLastTodo);

  useEffect(() => {
    setCurrentPage(props.paginationState.currentPage);
  }, [props.paginationState.currentPage]);

  useEffect(() => {
    if (renderFetchedData) {
      props.getPaginateData(renderFetchedData);
    }

    renderPageNumbers();

    dispatch(
      getPagination({
        paginationState: {
          currentPage: currentPage,
          pageNumbers: Math.ceil(fetchData?.length / boxPerPage),
        },
      }),
    );
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

  const handleChange = (event) => {
    if (event.target.value > 0 && event.target.value <= currentPageNumber) {
      setCurrentPage(Number(event.target.value));
    } else {
      setCurrentPage(1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = Math.ceil(fetchData?.length / boxPerPage);
    setCurrentPageNumber(pageNumbers);
  };

  return (
    <div className="box-pagination">
      <ul className="box-pagination-page-numbers">
        <li
          id={"prev"}
          limit={currentPageNumber}
          onClick={renderHandlePrevNext}>
          {"< PREV"}
        </li>
        <div className="box-pagination-box">
          <input value={currentPage} onChange={handleChange}></input>
          <span>z {currentPageNumber}</span>
        </div>
        <li
          id={"next"}
          limit={currentPageNumber}
          onClick={renderHandlePrevNext}>
          {"NEXT >"}
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    paginationState: {
      currentPage: state.getPagination.paginationState.currentPage,
      pageNumbers: state.getPagination.paginationState.pageNumbers,
    },
  };
};

export default connect(mapStateToProps, null)(Pagination);
