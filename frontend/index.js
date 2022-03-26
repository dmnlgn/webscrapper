import React from "react";
import App from "./App.js";

import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductPage from "./pages/test/ProductPage.js";
import HomePage from "./pages/test/Homepage.js";
import Error from "./pages/test/Error.js";

import * as pages from "./pages/pages.json";

const componentTypes = (type, props) => {
  const pagesType = {
    ProductPage: () => (
      <ProductPage api={props.webAPI} pages={pages} {...props} />
    ),
    default: () => <Error />,
  };
  return pagesType[type]?.() ?? pagesType["default"]();
};

const renderPages = (pagesList) => {
  const flattenPagesList = flatPages(pagesList);
  return flattenPagesList.map((page, index) => (
    <Route
      key={index}
      path={page.path}
      element={componentTypes(page.component, page)}
    />
  ));
};

const flatPages = (pagesList) => {
  let list = [];

  pagesList.forEach((page) => {
    list.push(page);
    if (Array.isArray(page.subpages)) {
      list = [...list, ...flatPages(page.subpages)];
    }
  });
  return list;
};

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
