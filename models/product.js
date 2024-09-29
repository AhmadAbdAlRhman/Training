const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;
class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }
  save() {
    const db = getDB();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id}, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static fetchAll = () => {
    const db = getDB();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        // console.log(db.collection("products").find());
        return products;
      })
      .catch((err) => {
        return err;
      });
  };
  static fetchById = (prodId) => {
    const db = getDB();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((products) => {
        // console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  static deleteById = (prodId) =>{
    const db = getDB();
    return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)});
  }
}
module.exports = Product;
