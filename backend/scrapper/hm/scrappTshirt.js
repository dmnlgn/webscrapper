const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const recordRoutes = express.Router();
const CONFIG_API = require("../configuration").configuration;

const scrapeData = async (index, scrapData) => {
  let currentIndex = index;
  let isFetching = true;
  if (index === undefined) {
    currentIndex = 1;
  }

  const API = `${CONFIG_API.HM.TSHIRT.URL}`;

  let data = [];
  if (scrapData) {
    data = [...scrapData];
  }
  const response = axios
    .get(API)
    .then((response) => {
      let $ = cheerio.load(response.data);
      const stack = $(".products-listing > li");

      stack?.each((i, el) => {
        if (i) {
          const Name = $(el).find(".item-details > .item-heading > a").text();

          let productPrice = $(el).find(".item-price");
          let discountPrice = "";

          if (productPrice.children().length > 1) {
            discountPrice = productPrice.find('span[class*="sale"]').text();
            productPrice = productPrice.children('span[class*="price"]').text();
          } else {
            productPrice = productPrice.find('span[class*="price"]').text();
          }

          //   const imageUrl = $(el)
          //     .find(".es-product-photo > img")
          //     .attr("data-src");

          //   const productUrl = $(el).find("figure > a").attr("href");

          data.push({
            name: Name,
            price: productPrice,
            discountPrice: discountPrice,
            //   imageUrl: imageUrl,
            //   productUrl: productUrl,
          });
          // return data;
        }
      });
      return data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

recordRoutes.route(CONFIG_API.HM.TSHIRT.REQUEST).get(async (req, res) => {
  try {
    const item = await scrapeData();
    res.json(item);
  } catch (err) {
    console.log(err);
  }
});

module.exports = recordRoutes;
