const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class Users {
  constructor(name) {
    this.id = uuidv4();
    this.name = name.trim();
  }

  async save() {
    const user = await Users.getAll();
    user.push(this.toJSON());
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "public", "dateBase.json"),
        JSON.stringify(user),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  toJSON() {
    return {
      name: this.name,
      id: this.id,
    };
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "public", "dateBase.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }

  static async getByName(name) {
    const users = await Users.getAll();
    return users.find((elem) => elem.name.toLowerCase() === name.toLowerCase());
  }

  static async deleteUser(name) {
    let tikets = await Users.getAll();
    tikets = tikets.filter((elem) => elem.name !== name);

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "public", "dateBase.json"),
        JSON.stringify(tikets),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
}

module.exports = Users;
