//Functions dealing with interaction between bot & database
//should be included below:

//Should use db/helpers functions.
const { createHash, createKey, createSalt } = require('../server/auth/authUtils.js');
const { createUser, findUserById } = require('../server/db/helpers.js');

const checkInitUser = (userObj) => {

  return new Promise((resolve, reject) => {
    findUserById({userId: userObj.id})
    .then((dataArr) => {
    if(!dataArr || !dataArr.length){
      resolve(false);
    }
      resolve(true);
    })
    .catch((err) => {
    reject(err);
    })
  })

}

module.exports.initUser = async (userObj) => {
  const userCheck = await checkInitUser(userObj)
  if(userCheck){
    return "nope!";
  }
  
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

  return uKey;
}