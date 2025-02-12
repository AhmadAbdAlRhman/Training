const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = callback => {
    MongoClient.connect("mongodb://localhost:27017/Training")
    .then(client => {
        console.log('Connected to MongoDB');
        _db = client.db();
        callback();
    })
    .catch(err =>{
        console.log('Failed to connect to MongoDB');
        throw err;
    })
}

const getDb = () => {
    if (_db) {
      return _db;
    }
    throw 'No database found!';
  };
  
module.exports = {mongoConnect , getDb};