const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
const mongodbConnect = (callback) => {
  MongoClient.connect("mongodb://localhost:27017/training")
  .then((client) => {
    console.log("Success");
    _db = client.db();
    callback();
  }).catch((err)=>{
    console.log(err);
    throw err;
  });
};

const getDB = () => {
  if(_db){
    return _db;
  }
  throw "There is not th database";
}
exports.mongodbConnect = mongodbConnect;
exports.getDB = getDB;