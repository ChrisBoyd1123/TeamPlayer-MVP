//TODO: Define appropriate table models, and establish table
//relationships through sequelize.
require('dotenv').config();
const { Sequelize, DataTypes} = require('sequelize');
const { STRING, INTEGER } = DataTypes;

const DATABASE_NAME = 'playerbase';
const DATABASE_URI = process.env.SQL_URI || null;

const sequelize = DATABASE_URI ?
new Sequelize(DATABASE_URI)
: new Sequelize(DATABASE_NAME, 'root', '', {
  dialect: 'mysql'
});

  const User = sequelize.define('User', {
      name: {
        type: STRING
      },
      discriminator: {
        type: INTEGER
      },
      avatar: {
        type: STRING
      },
      userId: {
        type: INTEGER
      }
    })

  const Hash = sequelize.define('Hash', {
      hash: {
        type: STRING
      }
    })

  const Salt = sequelize.define('Salt', {
      salt: {
        type: STRING
      }
    })

  const Game = sequelize.define('Game', {
      game: {
        type: STRING
      }
    })

  const Session = sequelize.define('Session', {
      session: {
        type: STRING
      }
    })

  const UserGame = sequelize.define('UserGame', {})

  module.exports.sequelize = sequelize;
  module.exports.User = User;
  module.exports.Hash = Hash;
  module.exports.Salt = Salt;
  module.exports.Game = Game;
  module.exports.Session = Session;
  module.exports.UserGame = UserGame;