import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { trackPromise, usePromiseTracker } from "react-promise-tracker";

import { ThreeDots, Grid } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./Status.less";

const classNames = require("classnames");
const scrapperStatus = require("./config/configuration").scrapperStatus;

const Status = (props) => {
  const [values, setValues] = useState([]);
  const [isFetching, setIsFetching] = useState([]);
  const [currentRef, setCurrentRef] = useState([]);

  const ref = useRef([]);

  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    setValues(JSON.parse(sessionStorage.getItem("currentStatus")));
  }, []);

  useEffect(() => {
    if (promiseInProgress) {
      setIsFetching((prevSearchTerm) => ({
        ...prevSearchTerm,
        [currentRef.id]: promiseInProgress,
      }));
    } else {
      setIsFetching((prevSearchTerm) => ({
        ...prevSearchTerm,
        [currentRef.id]: false,
      }));
    }
  }, [currentRef.id, promiseInProgress]);

  const sessionStorageOperation = (currentStatus, status, length) => {
    setValues((prevSearchTerm) => ({
      ...prevSearchTerm,
      [currentStatus.id]: {
        status: status,
        dataLength: length,
      },
    }));

    const prevSessionStorageStatus = JSON.parse(
      sessionStorage.getItem("currentStatus"),
    );

    const body = {
      ...prevSessionStorageStatus,
      [currentStatus.id]: {
        status: status,
        dataLength: length,
      },
    };

    sessionStorage.setItem("currentStatus", JSON.stringify(body));
  };

  const checkStatus = (event, operation) => {
    let currentIndex = ref.current[event];
    let currentStatus = currentIndex.querySelector(".status-box-element-icon");

    switch (operation.operationName) {
      case "test": {
        trackPromise(
          axios({
            method: "get",
            url: `${process.env.CLIENT_URI}/${operation.endpoint}`,
          })
            .then((response) => {
              if (!Array.isArray(response.data)) {
                const sumData = Object.values(response.data).reduce(
                  (sum, next) => sum + next.data.length,
                  0,
                );
                sessionStorageOperation(
                  currentStatus,
                  response.status,
                  sumData,
                );

                Object.values(response.data).map(async (val) => {
                  currentIndex = ref.current[val.description];
                  currentStatus = currentIndex.querySelector(
                    ".status-box-element-icon",
                  );
                  sessionStorageOperation(
                    currentStatus,
                    val.status,
                    val.data.length,
                  );
                });
              } else {
                sessionStorageOperation(
                  currentStatus,
                  response.status,
                  response.data.length,
                );
              }
            })
            .catch((err) => console.error(err)),
        );

        break;
      }
      case "insert": {
        trackPromise(
          axios({
            method: "get",
            url: `${process.env.CLIENT_URI}/${operation.endpoint}`,
          })
            .then((response) => {})
            .catch((err) => console.error(err)),
        );
        break;
      }
      default: {
        return null;
      }
    }

    setCurrentRef(currentStatus);
  };

  return (
    <>
      <div className="status wrapper">
        <div className="status-box-header">
          <h1>STATUS</h1>
        </div>
        <div className="status-box ">
          {scrapperStatus.sections.map((sections, sectionId) => (
            <div className="status-box-content" key={sectionId}>
              <h2 className="status-box-content-header">
                {sections.sectionName}
              </h2>
              <table className="status-box-group">
                <thead>
                  <tr>
                    {scrapperStatus.header.map((e, i) => (
                      <td key={i}>{e}</td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sections.collection?.map((e, i) => {
                    return (
                      <tr
                        className="status-box-group-section"
                        key={e.shopDescription}
                        ref={(el) => (ref.current[e.shopDescription] = el)}>
                        <td className="status-box-element-title">
                          {e.shopTitle}
                        </td>
                        <td
                          className={classNames("status-box-element-icon", {
                            statusTrue:
                              !isFetching?.[e.shopDescription] &&
                              values?.[e.shopDescription]?.status === 200,
                            statusFalse:
                              !isFetching?.[e.shopDescription] &&
                              values?.[e.shopDescription]?.status !== 200,
                            statusPending: promiseInProgress,
                          })}
                          id={e.shopDescription}>
                          {isFetching?.[e.shopDescription] && <Grid />}
                        </td>
                        <td className="status-box-element-records">
                          {values?.[e.shopDescription]?.dataLength ?? 0}
                        </td>

                        <td>
                          <div className="status-box-element-button">
                            {e.shopOperations?.map(
                              (operation, operationKey) => (
                                <button
                                  key={operationKey}
                                  onClick={() =>
                                    checkStatus(e.shopDescription, operation)
                                  }>
                                  {operation.buttonName}
                                </button>
                              ),
                            )}
                          </div>
                        </td>

                        {/* <td className="status-box-element-button">
                          <button
                            onClick={() =>
                              checkStatus(e.shopDescription, e.shopOperation)
                            }>
                            TEST
                          </button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentStatus: state,
  };
};

export default connect(mapStateToProps, null)(Status);
