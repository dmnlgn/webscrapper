var express = require("express");
var router = express.Router();

const mockData = require("./../test_data/MOCK_DATA.json");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send(mockData);
});

module.exports = router;
