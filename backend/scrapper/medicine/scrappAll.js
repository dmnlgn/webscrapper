const request = require("supertest");
const express = require("express");
const recordRoutes = express.Router();

const configuration = require("../configuration").configuration;
const { scrapeData } = require("./scrappJeans");

const getRequestFromConfiguration = () => {
  return Object.values(configuration.MEDICINE).map((req) => req);
};

recordRoutes.route("/medicine/test/all").get(async (req, res) => {
  const client = request(req.app);
  const reqFromConf = getRequestFromConfiguration();
  let reqBody = [];

  for (let i = 0; i < reqFromConf.length; i++) {
    const getClientData = await client.get(reqFromConf[i].REQUEST.TEST);
    reqBody = {
      ...reqBody,
      [reqFromConf[i].DESCRIPTION]: {
        status: getClientData.status,
        data: getClientData.body,
        description: reqFromConf[i].DESCRIPTION,
      },
    };
  }

  res.json(reqBody);
});

recordRoutes.route("/medicine/insert/all").get(async (req, res) => {
  const client = request(req.app);
  const reqFromConf = getRequestFromConfiguration();
  let reqBody = [];

  for (let i = 0; i < reqFromConf.length; i++) {
    const getClientData = await client.get(reqFromConf[i].REQUEST.INSERT);
    reqBody = {
      ...reqBody,
      [reqFromConf[i].DESCRIPTION]: {
        status: getClientData.status,
        data: getClientData.body,
        description: reqFromConf[i].DESCRIPTION,
      },
    };
  }

  res.json(reqBody);
});

recordRoutes.route("/medicine/all").get(async (req, res) => {
  const client = request(req.app);
  const reqFromConf = getRequestFromConfiguration();
  let reqBody = [];

  for (let i = 0; i < reqFromConf.length; i++) {
    const getClientData = await client.get(reqFromConf[i].REQUEST.GET);
    reqBody = [...reqBody, ...getClientData.body];
  }
  res.json(reqBody);
});

module.exports = recordRoutes;
