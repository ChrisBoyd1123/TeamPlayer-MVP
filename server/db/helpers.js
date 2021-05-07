//Functions dealing with database manipulation, such as adding, deleting,
//finding, or updating users, should be included below:
const { User, Hash, Salt, Session, Game, UserGame } = require('./initSequelize');

module.exports.createUser = (userData) => {
  //userData should be an object with the following keys:
  //* username
  //* discriminator
  //* userId
  //* avatar
  //* hash
  //* salt
  //* session

  return new Promise ((resolve, reject) => {
    let hashId;
    let saltId;
    let sessionId;

    Hash.create({hash: userData.hash})
    .then((hashData) => {
      hashId = hashData.dataValues.id;
    })
    .then(() => {
      Salt.create({salt: userData.salt})
      .then((saltData) => {
        saltId = saltData.dataValues.id;
      })
      .then(() => {
        Session.create({session: userData.session})
        .then((sessionData) => {
          sessionId = sessionData.dataValues.id;
        })
        .then(() => {
          User.create({
            username: userData.username,
            discriminator: userData.discriminator,
            userId: userData.userId,
            avatar: userData.avatar,
            HashId: hashId,
            SaltId: saltId,
            SessionId: sessionId
          })
          .then((user) => {
            resolve(user);
          })
          .catch((err) => {
            reject(err);
          })
        })
      })
    })
  })
}

//TODO: A general "findUser" function is likely not very conducive to a
//relational SQL database environment.

//Make multiple "find" helper functions based on what is needed by the web app.

//*findUser by Discord Id.
//*findUser by username and discriminator.
//*findUser by session.

//Each helper function should send back a "complete" user object - 
//appropriate non-id hash, salt, and session values included.
module.exports.findUserById = ({ userId }) => {
  return new Promise((resolve, reject) => {
    let returnUser = {};
    User.findOne({ where: {userId: userId}})
    .then((foundUser) => {
      if(!foundUser){
        resolve(null);
        return;
      }
      const {username, discriminator, avatar, userId, HashId, SaltId, SessionId} = foundUser;
      returnUser.username = username;
      returnUser.discriminator = discriminator;
      returnUser.avatar = avatar;
      returnUser.userId = userId;

      Hash.findOne({ where: {id: HashId}})
      .then((foundHash) => {
        returnUser.hash = foundHash.hash;

        Salt.findOne({ where: {id: SaltId}})
        .then((foundSalt) => {
          returnUser.salt = foundSalt.salt;

          Session.findOne({ where: {id: SessionId}})
          .then((foundSession) => {
            returnUser.session = foundSession.session;

            resolve([returnUser]);
          })
        })
      })
    })
    .catch((err) => {
      reject(err);
    })
  })
}

module.exports.findUserByNmDc = ({ username, discriminator }) => {
  return new Promise((resolve, reject) => {
    let returnUser = {};
    User.findOne({ where: {username: username, discriminator: discriminator}})
    .then((foundUser) => {
      if(!foundUser){
        resolve(null);
        return;
      }
      const {username, discriminator, avatar, userId, HashId, SaltId, SessionId} = foundUser;
      returnUser.username = username;
      returnUser.discriminator = discriminator;
      returnUser.avatar = avatar;
      returnUser.userId = userId;

      Hash.findOne({ where: {id: HashId}})
      .then((foundHash) => {
        returnUser.hash = foundHash.hash;

        Salt.findOne({ where: {id: SaltId}})
        .then((foundSalt) => {
          returnUser.salt = foundSalt.salt;

          Session.findOne({ where: {id: SessionId}})
          .then((foundSession) => {
            returnUser.session = foundSession.session;

            resolve([returnUser]);
          })
        })
      })
    })
    .catch((err) => {
      reject(err);
    })
  })
}

module.exports.findUserBySession = ({ session }) => {
  return new Promise((resolve, reject) => {
    let returnUser = {};
    Session.findOne({ where: {session: session}})
        .then((foundSession) => {
          if(!foundSession){
            resolve(null);
            return;
          }
          returnUser.session = foundSession.session;

            User.findOne({ where: {SessionId: foundSession.id}})
            .then((foundUser) => {
              const {username, discriminator, avatar, userId, HashId, SaltId } = foundUser;
              returnUser.username = username;
              returnUser.discriminator = discriminator;
              returnUser.avatar = avatar;
              returnUser.userId = userId;

              Hash.findOne({ where: {id: HashId}})
                .then((foundHash) => {
                returnUser.hash = foundHash.hash;

                Salt.findOne({ where: {id: SaltId}})
                  .then((foundSalt) => {
                      returnUser.salt = foundSalt.salt;
                      resolve([returnUser]);
                    })
                  })
      })
    })
    .catch((err) => {
      reject(err);
    })
  })
}

//addGame should add an entry column to the Games table if a new
//game has been added, before linking both the created game and
//its associated user in UserGames.
module.exports.addGame = (userSession, gameName) => {
  return new Promise ((resolve, reject) => {
    Game.findOne({ where: {game: gameName}})
    .then((foundGame) => {
      if(!foundGame){
        //create game, then link with user in UserGames.
        let gameEntryId;
        let userEntryId;

        Game.create({game: gameName})
        .then((gameData) => {
          gameEntryId = gameData.dataValues.id;

          Session.findOne({ where: {session: userSession}})
          .then((foundSession) => {
            User.findOne({ where: {SessionId: foundSession.id}})
            .then((foundUser) => {
              userEntryId = foundUser.id;

              UserGame.create({UserId: userEntryId, GameId: gameEntryId})
              .then(() => {
                resolve();
              })
            })
          })
        })
      }else{
        //check if game is already linked with user in UserGames.
        Session.findOne({ where: {session: userSession}})
          .then((foundSession) => {
            User.findOne({ where: {SessionId: foundSession.id}})
            .then((foundUser) => {
              UserGame.findOne({where: {UserId: foundUser.id, GameId: foundGame.id}})
              .then((foundUserGame) => {
                if(!foundUserGame){
                  //if not? Link game with user.
                  UserGame.create({UserId: foundUser.id, GameId: foundGame.id})
                  .then(() => {
                    resolve();
                  })
                }else{
                  resolve();
                }
              })
            })
          })
      }
    })
  })
}

//TODO: A helper function that gets all the games
//associated with a given user.

module.exports.findUsersGames = (userSession) => {
  return new Promise((resolve, reject) => {
    Session.findOne({ where: {session: userSession}})
          .then((foundSession) => {
            User.findOne({ where: {SessionId: foundSession.id}})
            .then((foundUser) => {
              UserGame.findAll({ where: {UserId: foundUser.id}})
              .then((userGameData) => {
                let returnGames = [];
                if(!userGameData || !userGameData.length){
                  resolve(null);
                  return;
                }
                userGameData.forEach((userGameObj, uGOIndex) => {
                  Game.findOne({ where: {id: userGameObj.dataValues.GameId}})
                  .then((foundGame) => {
                    returnGames.push(foundGame.game);
                    if(returnGames.length === userGameData.length){
                      resolve(returnGames);
                    }
                  })
                })
              })
            })
          })
  })
}