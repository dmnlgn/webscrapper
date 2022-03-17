import React from "react";
// import ReactDOM from "react-dom";
import App from "./App.js";

//ReactDOM.render(<App />, document.getElementById("root"));

import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductPage from "./pages/test/ProductPage.js";
import HomePage from "./pages/test/Homepage.js";
import Error from "./pages/test/Error.js";

import * as pages from "./pages/pages.json";

const componentTypes = (type) => {
  const pages = {
    ProductPage: () => <ProductPage />,
    default: () => <Error />,
  };
  return pages[type]?.() ?? pages["default"]();
};

const renderPages = (pagesList) =>
  pagesList?.map((page, index) => {
    return (
      <Route
        key={index}
        path={page.path}
        element={componentTypes(page.component)}
      />
    );
  });

render(
  <BrowserRouter>
    <Routes>
      <Route element={<App pages={pages} />}>
        <Route path="/" element={<HomePage />} />
        {renderPages(pages)}
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root"),
);
