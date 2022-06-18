import React from "react";
import App from "./App.js";

import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductPage from "./pages/ProductPage/ProductPage.js";
import HomePage from "./pages/Homepage/Homepage.js";
import CategoryPage from "./pages/CategoryPage/CategoryPage.js";
import Error from "./pages/Error/Error.js";
import Status from "./pages/Status/Status.js";

// import * as pages from "./routes/pages.json";
// import * as testpage from "./routes/testpage.json";
import * as productRoute from "./routes/productRoute.json";

import { Provider } from "react-redux";

import store from "./redux/store";

const componentTypes = (type, props) => {
  const pagesType = {
    ProductPage: () => (
      <ProductPage api={props.webAPI} pages={productRoute} {...props} />
    ),
    HomePage: () => <HomePage />,
    CategoryPage: () => <CategoryPage {...props} pages={productRoute} />,
    Status: () => <Status />,
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
    } else {
      path = page.path;
    }

    if (Array.isArray(page.subpages)) {
      if (!path?.includes(page.path)) {
        path?.push(page.path);
      }
      list = [...list, ...flatPages(page.subpages, path)];
    }

    const pathName = path?.toString().replaceAll(",", "");
    page.path = pathName || page.path;
  });

  return list;
};

// const flatPages = (pagesList, pagePath) => {
//   let list = [];
//   let path = [];

//   pagesList.forEach((page) => {
//     list.push(page);

//     if (pagePath) {
//       path = [...pagePath, page.path];
//     }

//     if (Array.isArray(page.subpages)) {
//       if (!path.includes(page.path)) {
//         path.push(page.path);
//       }
//       list = [...list, ...flatPages(page.subpages, path)];
//     }

//     const pathName = path.toString().replaceAll(",", "");
//     page.path = pathName || page.path;
//   });

//   return list;
// };

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<App pages={productRoute} />}>
          {renderPages(productRoute)}
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);
