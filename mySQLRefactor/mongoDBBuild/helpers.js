//Functions dealing with database manipulation, such as adding, deleting,
//finding, or updating users, should be included below:

const { User } = require('./index.js');

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
    const newUser = new User(userData);
    newUser.save((err, user) => {
      if(err){
        reject(err);
      }
      resolve(user);
    });
  })
}

module.exports.findUser = (criteria) => {
  return new Promise((resolve, reject) => {
    User.find(criteria, (err, dataArr) => {
      if(err){
        reject(err);
      }
      resolve(dataArr);
    })
  })
}