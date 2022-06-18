const { MongoClient } = require("mongodb");
const Db = process.env.MONGO_URI ?? "mongodb://localhost:27017";

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: (callback) => {
    client.connect((err, db) => {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db("Shops");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },
};
