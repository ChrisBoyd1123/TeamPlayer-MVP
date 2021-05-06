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
    
  })
}

//TODO: A general "findUser" function is likely not very conducive to a
//relational SQL database environment.

//Make multiple "find" helper functions based on what is needed by the web app.
module.exports.findUser = (criteria) => {
  return new Promise((resolve, reject) => {
    
  })
}