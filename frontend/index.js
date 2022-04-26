import React from "react";
import App from "./App.js";

import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductPage from "./pages/test/ProductPage.js";
import HomePage from "./pages/test/Homepage.js";
import Error from "./pages/test/Error.js";

import * as pages from "./pages/pages.json";
import * as testpage from "./pages/testpage.json";

const componentTypes = (type, props) => {
  const pagesType = {
    ProductPage: () => (
      <ProductPage api={props.webAPI} pages={testpage} {...props} />
    ),
    HomePage: () => <HomePage />,
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

const flatPages = (pagesList, pagePath) => {
  let list = [];
  let path = [];

  pagesList.forEach((page) => {
    list.push(page);

    if (pagePath) {
      path = [...pagePath, page.path];
    }

    if (Array.isArray(page.subpages)) {
      if (!path.includes(page.path)) {
        path.push(page.path);
      }
      list = [...list, ...flatPages(page.subpages, path)];
    }

    const pathName = path.toString().replaceAll(",", "");
    page.path = pathName || page.path;
  });

  return list;
};

render(
  <BrowserRouter>
    <Routes>
      <Route element={<App pages={testpage} />}>{renderPages(testpage)}</Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root"),
);
