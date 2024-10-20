const getDB = require("../util/database").getDB;
const mongodb = require("mongodb");
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  save() {
    const db = getDB();
    return db
      .collection("User")
      .insertOne(this)
      .then((User) => {
        console.log(User);
        return User;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static fetchById = (UserId) => {
    const db = getDB();
    return db
      .collection("User")
      .findOne({ _id: new mongodb.ObjectId(UserId) })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
module.exports = User;
