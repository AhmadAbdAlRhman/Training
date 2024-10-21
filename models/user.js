const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save() {
    const db = getDB();
    return db.collection("User").insertOne(this);
  }

  addToCart(product) {
    //   const cartProductIndex = this.cart.items.findIndex((cp) => {
    //     return cp.productId.toString() === product._id.toString();
    //   });
    //   let newQuantity = 1;
    //   const updatedCartItems = [...this.cart.items];

    //   if (cartProductIndex >= 0) {
    //     newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    //     updatedCartItems[cartProductIndex].quantity = newQuantity;
    //   } else {
    //     updatedCartItems.push({
    //       productId: new ObjectId(product._id),
    //       quantity: newQuantity,
    //     });
    //   }
    //   const updatedCart = {
    //     items: updatedCartItems,
    //   };
    //   const db = getDb();
    //   return db
    //     .collection("User")
    //     .updateOne(
    //       { _id: new ObjectId(this._id) },
    //       { $set: { cart: updatedCart } }
    //     );
    // }

    const updatedCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb();
    return db.collection("User").updateOne(
      {
        _id: new ObjectId(this._id),
      },
      {
        $set: { cart: updatedCart },
      }
    );
  }
  static fetchById(userId) {
    const db = getDB();
    return db
      .collection("User")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
