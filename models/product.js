const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, imageUrl, price, description, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db.collection('Products').updateOne({
        _id: new mongodb.ObjectId(this._id)
      }, {
        $set: this
      })
    } else {
      dbOp = db.collection('Products').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log("The product was saved");
      })
      .catch(err => {
        console.log(err);
      });
  }
  static fetchAll() {
    const db = getDb();
    return db.collection('Products')
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        return err
      });
  }
  static findById(Productid) {
    const db = getDb();
    return db.collection('Products')
      .find({
        _id: new mongodb.ObjectId(Productid)
      })
      .next()
      .then(product => {
        return product
      }).catch(err => {
        console.log(err);
      });
  }
  static DeleteById(Productid) {
    const db = getDb();
    return db.collection('Products').deleteOne({
      _id: new mongodb.ObjectId(Productid)
    }).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    });
  }
}
  module.exports = Product;