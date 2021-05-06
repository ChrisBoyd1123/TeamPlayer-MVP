//TODO
const { sequelize, User, Hash, Salt, Session, Game, UserGame } = require("./initSequelize");
const { initializeSchema } = require('./initSchema');

const { createUser } = require('./helpers.js');

const DATABASE_START = () => {
  return new Promise ((resolve, reject) => {
    sequelize.authenticate()
    .then(() => {
      initializeSchema()
      .then(() => {
        console.log('sql database authenticated.');
        resolve();
      })
     })
    .catch((err) => {
      console.log(err);
      reject(err); })
  })
}

DATABASE_START();

module.exports.db = DATABASE_START;