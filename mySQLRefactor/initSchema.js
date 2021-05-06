//TODO
const { sequelize, User, Hash, Salt, Session, Game, UserGame } = require('./initSequelize');
const { DataTypes } = require('sequelize');
const { STRING, INTEGER } = DataTypes;

module.exports.initializeSchema = async () => {
  /*
  const query = sequelize.getQueryInterface();

  query.createTable('Hashes', {
    hash: STRING
  })
  */

  return new Promise ((resolve, reject) => {
    User.belongsTo(Hash);
    User.belongsTo(Salt);
    User.belongsTo(Session);

    UserGame.belongsTo(User);
    UserGame.belongsTo(Game);

  sequelize.sync()
    .then(() => {
      resolve();
    })
  })
}