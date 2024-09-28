const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const mongodbConnect = (callback) => {
  MongoClient.connect("mongodb://localhost:27017/training")
  .then((client) => {
    console.log("Success");
    callback(client);
  }).catch((err)=>{
    console.log(err);
  });
};
module.exports = mongodbConnect;