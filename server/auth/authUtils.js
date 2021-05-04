//Functions dealing with generating user keys, hashes, and
//sessions should be included below:

const crypto = require('crypto');

//Generates a hash based on data and a given salt.
module.exports.createHash = (data, salt = '') => {
  const shasum = crypto.createHash('sha1');
  shasum.update(data+salt);
  return shasum.digest('hex');
};

//Generates a random string of characters for a user
//to enter their player profile with.
module.exports.createKey = () => {
  return crypto.randomBytes(3).toString('hex');
}

//Generates a longer random string of 12 characters for
//use as a user's salt.
module.exports.createSalt = () => {
  return crypto.randomBytes(12).toString('hex');
}

module.exports.compareHash = (key, salt, hash) => {
  return (this.createHash(key, salt) === hash);
}