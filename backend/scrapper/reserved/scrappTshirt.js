const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../../database/connect");

const { replacePriceToFloat } = require("../../utils/utils");

const scrapeData = async () => {
  const API = "https://www.reserved.com/pl/pl/mezczyzna/ubrania/t-shirty";
  const data = [];
  const response = axios
    .get(API)
    .then((response) => {
      let $ = cheerio.load(response.data);
      const stack = $("#categoryProducts > article");
      stack.each((i, el) => {
        if (i) {
          const Name = $(el).find(".es-product-name").text();

          let productPrice = $(el).find(".es-product-price");
          let discountPrice = null;

          if (productPrice.children().length > 1) {
            discountPrice = productPrice.children(".es-discount-price").text();
            productPrice = productPrice.children(".es-regular-price").text();
          } else {
            productPrice = productPrice.text();
          }

          const imageUrl = $(el)
            .find(".es-product-photo > img")
            .attr("data-src");

          const productUrl = $(el).find("figure > a").attr("href");

          productPrice = replacePriceToFloat(productPrice);
          discountPrice = replacePriceToFloat(discountPrice);

          data.push({
            name: Name,
            price: productPrice,
            discountPrice: discountPrice,
            imageUrl: imageUrl,
            productUrl: productUrl,
          });
        }
      });
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

recordRoutes.route("/reserved/tshirt/test").get(async (req, res) => {
  try {
    const item = await scrapeData();
    res.json(item);
  } catch (err) {
    console.log(err);
  }
});

recordRoutes.route("/reserved/tshirt/insert").get(async (req, response) => {
  const item = await scrapeData();

  let db_connect = dbo.getDb();
  db_connect.collection("Shop").updateMany(
    {
      shopName: "Reserved",
      "shopCategories.categoryName": "Tshirt",
    },
    {
      $set: {
        "shopCategories.$[shopCategories].collection": item,
      },
    },
    {
      arrayFilters: [
        {
          "shopCategories.categoryName": "Tshirt",
        },
      ],
    },

    function (err, res) {
      if (err) throw err;
      response.json(res);
    },
  );
});

recordRoutes.route("/reserved/tshirt").get(function (req, res) {
  let db_connect = dbo.getDb("test");

  db_connect
    .collection("Shop")
    .aggregate([
      {
        $match: {
          shopName: "Reserved",
        },
      },
      {
        $unwind: {
          path: "$shopCategories",
        },
      },
      {
        $match: {
          "shopCategories.categoryName": "Tshirt",
        },
      },
      { $replaceRoot: { newRoot: "$shopCategories" } },
      // {
      //   $project: {
      //     collection: "$shopCategories.collection",
      //   },
      // },
    ])
    // .lean()
    // .exec(function (err, doc) {
    //   doc.addedProperty = "foobar";
    //   res.json(doc);
    // });
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = recordRoutes;
