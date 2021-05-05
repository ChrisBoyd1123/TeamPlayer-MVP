//TODO
require('dotenv').config();
const DATABASE_NAME = 'playerbase';
const DATABASE_URI = process.env.SQL_URI || null;
const { initializeSchema } = require('./initializeSchema');

const { Sequelize, Model, DataTypes } = require('sequelize');
let sequelize = DATABASE_URI ?
new Sequelize(DATABASE_URI)
: new Sequelize(DATABASE_NAME, 'root', '', {
  dialect: 'mysql'
});

const DATABASE_START = () => {
  return new Promise ((resolve, reject) => {
    sequelize.authenticate()
    .then(() => {
      console.log('sql database authenticated.');
      resolve(); })
    .catch((err) => {
      console.log(err);
      reject(err); })
  })
}

const { User, Hash, Salt, Session, Games, User_Games } = initializeSchema();

module.exports.db = DATABASE_START;
module.exports.sequelize = sequelize;
module.exports.Model = Model;
module.exports.DataTypes = DataTypes;