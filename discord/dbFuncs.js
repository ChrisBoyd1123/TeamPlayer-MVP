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
    return `You already have a key to your player profile! Check this bot's direct messages to you for a possible record of it.`;
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

  return `This is your player profile key!

  ||${uKey}||

  Use it, along with your Discord username, in order to access your new profile on the Team Player web app!`
}