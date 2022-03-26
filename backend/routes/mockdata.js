var express = require("express");
var router = express.Router();

const mockData = require("./../test_data/MOCK_DATA2.json");

// middleware that is specific to this router
router.get("/", function (req, res, next) {
  res.send(mockData);
});

module.exports = router;
