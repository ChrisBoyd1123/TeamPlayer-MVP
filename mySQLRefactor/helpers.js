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
module.exports.findUser = (criteria) => {
  return new Promise((resolve, reject) => {
    
  })
}