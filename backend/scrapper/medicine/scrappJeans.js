const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const recordRoutes = express.Router();
const CONFIG_API = require("../configuration").configuration;
const dbo = require("../../database/connect");
const { replacePriceToFloat } = require("../../utils/utils");

const scrapeData = async (index, scrapData) => {
  let currentIndex = index;
  let isFetching = true;
  if (index === undefined) {
    currentIndex = 1;
  }

  const API = `${CONFIG_API.MEDICINE.JEANS.URL}${currentIndex}`;

  let data = [];
  if (scrapData) {
    data = [...scrapData];
  }
  const response = axios
    .get(API)
    .then((response) => {
      let $ = cheerio.load(response.data);
      const stack = $(".productsContainer > div > .row > div");

      if (stack.length <= 2) {
        isFetching = false;
        return data;
      }

      stack?.each((i, el) => {
        if (i) {
          const Name = $(el)
            .find('div[class*="productCardDescription"] > span')
            .text();

          let productPrice = $(el).find('div[class*="priceContainer"]');
          let discountPrice = "";

          if (productPrice.children().length > 1) {
            discountPrice = productPrice.children('p[class*="sale"]').text();
            productPrice = productPrice
              .children('p[class*="overpriced"]')
              .text();
          } else {
            productPrice = productPrice.text();
          }

          const imageUrl = $(el)
            .find(
              'div[class*="Image__media"] > picture > source[media*="(max-width: 1100px)"]',
            )
            .attr("srcset");

          const productUrl = $(el)
            .find('div[class*="productCardImageWrapper"] > a')
            .attr("href");

          productPrice = replacePriceToFloat(productPrice);
          discountPrice = replacePriceToFloat(discountPrice);

          data.push({
            name: Name,
            price: productPrice,
            discountPrice: discountPrice,
            imageUrl: imageUrl,
            productUrl: productUrl,
          });
          return data;
        }
      });
      if (isFetching) {
        return scrapeData(currentIndex + 1, data);
      }
      return data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

recordRoutes.route("/medicine/jeans/insert").get(async (req, response) => {
  const item = await scrapeData();

  let db_connect = dbo.getDb();
  db_connect.collection("Shop").updateMany(
    {
      shopName: "Medicine",
      "shopCategories.categoryName": "Jeans",
    },
    {
      $set: {
        "shopCategories.$[shopCategories].collection": item,
      },
    },
    {
      arrayFilters: [
        {
          "shopCategories.categoryName": "Jeans",
        },
      ],
    },

    function (err, res) {
      if (err) throw err;
      response.json(res);
    },
  );
});

recordRoutes.route("/medicine/jeans/test").get(async (req, res) => {
  try {
    const item = await scrapeData();
    res.json(item);
  } catch (err) {
    console.log(err);
  }
});

recordRoutes.route("/medicine/jeans").get(function (req, res) {
  let db_connect = dbo.getDb("test");

  db_connect
    .collection("Shop")
    .aggregate([
      {
        $match: {
          shopName: "Medicine",
        },
      },
      {
        $unwind: {
          path: "$shopCategories",
        },
      },
      {
        $match: {
          "shopCategories.categoryName": "Jeans",
        },
      },
      { $replaceRoot: { newRoot: "$shopCategories" } },
    ])
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = recordRoutes;
