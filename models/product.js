const getDb = require('../util/database').getDb;

class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  save() {
    const db = getDb();
    return db.collection('Products')
      .insertOne(this)
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
    console.log(Productid);
    return db.collection('Products')
    .find({
      _id: Productid
    })
    .next()
    .then(product => {
      console.log(product);
      return product
    }).catch(err => {
      console.log( err);
    });
  }
}

module.exports = Product;