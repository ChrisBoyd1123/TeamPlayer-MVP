//Functions dealing with interaction between bot & database
//should be included below:

//Should use db/helpers functions.
const { resolve } = require('node:path');
const { createHash, createKey, createSalt } = require('../server/auth/authUtils.js');
const { createUser, findUser } = require('../server/db/helpers.js');

const checkInitUser = (userObj) => {

  let userPresent = undefined;

  findUser({userId: userObj.id})
    .then((dataArr) => {
    if(!dataArr || !dataArr.length){
      userPresent = false;
    }
    userPresent = true;
    })
    .catch((err) => {
    console.error(err);
    })

  return userPresent;

}

module.exports.initUser = (userObj) => {
  console.log("Check Init User test", checkInitUser(userObj));
  
  const uKey = createKey();
  const uSalt = createSalt();
  const uHash = createHash(uKey, uSalt);

  createUser({
    username: userObj.username,
    discriminator: userObj.discriminator,
    userId: userObj.id,
    avatar: userObj.avatar ?
    `https://cdn.discordapp.com/avatars/${userObj.id}/${userObj.avatar}`
    : "null",
    hash: uHash,
    salt: uSalt,
    session: createSalt()
  })
  .then((user) => {
    console.log(user);
  })

  console.log("sending key");
  return uKey;
}