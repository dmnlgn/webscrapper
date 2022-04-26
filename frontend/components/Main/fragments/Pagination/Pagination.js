import React, { Component } from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      boxPerPage: 20,
      // currentPage: this.props.currentPage,
      // boxPerPage: this.props.boxPerPage,
    };
  }

  componentDidMount() {
    const elementLi =
      document.getElementsByClassName?.("box-page-numbers")?.[0];

    if (!!elementLi) {
      const elementClassList =
        elementLi?.getElementsByTagName?.("li")?.[this.state.currentPage];
      elementClassList?.classList?.add?.("box-page-numbers-active");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.changeAttribLi(prevState.currentPage, this.state.currentPage);
    }
  }

  renderHandleClick = (event) => {
    this.setState(
      {
        currentPage: Number(event.target.id),
      },
      () => {
        this.props.getCurrentPage(Number(event.target.id));
      },
    );
  };

  changeAttribLi = (prev, current) => {
    const elementLi = document
      .getElementsByClassName?.("box-page-numbers")?.[0]
      .getElementsByTagName("li");

    if (elementLi) {
      elementLi?.[current]?.classList.add?.("box-page-numbers-active");

      if (elementLi?.[prev].classList.contains("box-page-numbers-active")) {
        elementLi[prev].classList.remove("box-page-numbers-active");
      }
    }
  };

  renderHandlePrevNext = (event) => {
    const { currentPage } = this.state;
    const limit = event.target?.getAttribute?.("limit");

    if (limit && event.target.id === "next" && currentPage < Number(limit)) {
      this.setState(
        {
          currentPage: currentPage + 1,
        },
        () => {
          this.props.getCurrentPage(this.state.currentPage);
        },
      );
    }
    if (limit && event.target.id === "prev" && currentPage !== 1) {
      this.setState(
        {
          currentPage: currentPage - 1,
        },
        () => {
          this.props.getCurrentPage(this.state.currentPage);
        },
      );
    }
  };

  render() {
    const { data } = this.props;
    const { currentPage, boxPerPage } = this.state;

    const indexOfLastTodo = currentPage * boxPerPage;
    const indexOfFirstTodo = indexOfLastTodo - boxPerPage;
    const renderFetchedData = data?.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(data?.length / boxPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers?.map((number) => {
      return (
        <li key={number} id={number} onClick={this.renderHandleClick}>
          {number}
        </li>
      );
    });

    // if (renderFetchedData) {
    //   this.props.getRenderFetchedData(renderFetchedData);
    // }

    return (
      <div className="box-pagination">
        <ul className="box-page-numbers">
          <li
            id={"prev"}
            limit={pageNumbers?.length}
            onClick={this.renderHandlePrevNext}>
            {"<"}
          </li>
          <ul className="box-page-numbers-inside">{renderPageNumbers}</ul>
          <li
            id={"next"}
            limit={pageNumbers?.length}
            onClick={this.renderHandlePrevNext}>
            {">"}
          </li>
        </ul>
      </div>
    );
  }
}

export default Pagination;


// import React, { useEffect, useRef, useState } from "react";
// import "./BoxPagination.less";

// const Pagination = (props) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const prevCountRef = useRef(currentPage);

//   const boxPerPage = 5;
//   const fetchData = props.data;

//   const indexOfLastTodo = (currentPage + 1) * boxPerPage;
//   const indexOfFirstTodo = indexOfLastTodo - boxPerPage;
//   const renderFetchedData = fetchData?.slice(indexOfFirstTodo, indexOfLastTodo);

//   console.log("indexOfLastTodo ", indexOfLastTodo);
//   console.log("indexOfFirstTodo ", indexOfFirstTodo);

//   // useEffect(() => {
//   //   if (renderFetchedData) {
//   //     props.getRenderData(renderFetchedData);
//   //   }
//   // }, [currentPage]);

//   // useEffect(() => {
//   //   if (renderFetchedData) {
//   //     console.log("XD", renderFetchedData);
//   //     props.getRenderData(renderFetchedData);
//   //   }

//   //   changeAttributes();
//   //   prevCountRef.current = currentPage;
//   // }, [fetchData, currentPage]);

//   // const getElementLi = () =>
//   //   document
//   //     .getElementsByClassName?.("box-page-numbers")?.[0]
//   //     .getElementsByTagName?.("li");

//   // const changeAttributes = () => {
//   //   const elementLi = getElementLi();

//   //   const xd = document
//   //     .getElementsByClassName?.("box-page-numbers-inside")?.[0]
//   //     .getElementsByTagName?.("li");

//   //   console.log("elementLi ", xd[currentPage]);
//   //   if (elementLi) {
//   //     // if (prevCountRef.current) {
//   //     //   xd?.[prevCountRef?.current]?.classList?.remove(
//   //     //     "box-page-numbers-active",
//   //     //   );
//   //     // }
//   //     xd?.[currentPage]?.classList.add?.("box-page-numbers-active");
//   //     if (
//   //       currentPage &&
//   //       xd?.[currentPage]?.classList.contains("box-page-numbers-active")
//   //     ) {
//   //       xd?.[prevCountRef?.current]?.classList?.remove(
//   //         "box-page-numbers-active",
//   //       );
//   //     }
//   //   }
//   // };
//   useEffect(() => {
//     if (renderFetchedData) {
//       props.getRenderData(renderFetchedData);
//     }
//   }, [fetchData, currentPage]);

//   const renderHandleClick = (event) => {
//     setCurrentPage(Number(event.target.id));
//   };

//   const renderHandlePrevNext = (event) => {
//     const limit = event.target?.getAttribute?.("limit");
//     if (limit && event.target.id === "next" && currentPage < Number(limit)) {
//       setCurrentPage(currentPage + 1);
//     }
//     if (limit && event.target.id === "prev" && currentPage !== 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(fetchData?.length / boxPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   const renderPageNumbers = pageNumbers?.map((number, key) => {
//     return (
//       <li
//         key={number}
//         id={number}
//         onClick={renderHandleClick}
//         className="box-page-numbers-li">
//         {number}
//       </li>
//     );
//   });

//   console.log("renderFetchedData ", renderFetchedData);

//   return (
//     <div className="box-pagination">
//       <ul className="box-page-numbers">
//         <li
//           id={"prev"}
//           limit={pageNumbers?.length}
//           onClick={renderHandlePrevNext}>
//           {"< PREV"}
//         </li>
//         <ul className="box-page-numbers-inside">{renderPageNumbers} </ul>
//         <li
//           id={"next"}
//           limit={pageNumbers?.length}
//           onClick={renderHandlePrevNext}>
//           {"NEXT >"}
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Pagination;
