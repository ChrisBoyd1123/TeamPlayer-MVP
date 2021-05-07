//TODO
const { sequelize, User, Hash, Salt, Session, Game, UserGame } = require('./initSequelize');
const { DataTypes } = require('sequelize');

module.exports.initializeSchema = async () => {

  return new Promise ((resolve, reject) => {
    User.belongsTo(Hash);
    User.belongsTo(Salt);
    User.belongsTo(Session);

    UserGame.belongsTo(User);
    UserGame.belongsTo(Game);

  sequelize.sync({forc: true})
    .then(() => {
      resolve();
    })
  })
}