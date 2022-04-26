import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { Outlet } from "react-router-dom";

import "./App.less";

const App = (props) => {
  return (
    <div className="App">
      <Header pages={props.pages} {...props} />
      <div className="main-page">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
