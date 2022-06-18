import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getPagination } from "../../../redux/actions/actionPagination";

import "./PaginationTop.less";

const PainationTop = (props) => {
  const [currentPage, setCurrentPage] = useState(
    props.paginationState.currentPage,
  );
  const dispatch = useDispatch();

  const pageNumbers = props.paginationState.pageNumbers;

  useEffect(() => {
    setCurrentPage(props.paginationState.currentPage);
  }, [props.paginationState.currentPage, props.fetchData]);

  const handleChange = (event) => {
    if (event.target.value > 0 && event.target.value <= pageNumbers) {
      setCurrentPage(Number(event.target.value));
      dispatch(
        getPagination({
          paginationState: {
            currentPage: Number(event.target.value),
            pageNumbers: pageNumbers,
          },
        }),
      );
    } else {
      setCurrentPage(1);
      dispatch(
        getPagination({
          paginationState: {
            currentPage: 1,
            pageNumbers: pageNumbers,
          },
        }),
      );
    }
  };

  const handlePrevNext = (event) => {
    if (event.target.id === "next" && currentPage < Number(pageNumbers)) {
      setCurrentPage(currentPage + 1);
      dispatch(
        getPagination({
          paginationState: {
            currentPage: currentPage + 1,
            pageNumbers: pageNumbers,
          },
        }),
      );
    }
    if (event.target.id === "prev" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      dispatch(
        getPagination({
          paginationState: {
            currentPage: currentPage - 1,
            pageNumbers: pageNumbers,
          },
        }),
      );
    }
  };

  return (
    <>
      <div className="paginationTop">
        {currentPage > 1 && (
          <div className="paginationTop-button">
            <button id={"prev"} onClick={handlePrevNext}>
              PREV
            </button>
          </div>
        )}
        <div className="paginationTop-input">
          <input value={currentPage} onChange={handleChange}></input>
          <span>z</span>
          <span>{pageNumbers}</span>
        </div>
        <div className="paginationTop-button">
          <button id={"next"} onClick={handlePrevNext}>
            NEXT
          </button>
        </div>
      </div>
    </>
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
export default connect(mapStateToProps, null)(PainationTop);
