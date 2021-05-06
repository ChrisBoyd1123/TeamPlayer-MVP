// TODO
const mongoose = require('mongoose');

const DATABASE_NAME = 'playerbase';
const DATABASE_URI = process.env.MONGO_URI || `mongodb://localhost/${DATABASE_NAME}`;

const DATABASE_START = () => {
  return new Promise ((resolve, reject) => {
    mongoose.connect(DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Successfully connected to database.')
    resolve();
  })
    .catch((err) => {
      console.log(`Error connecting to database:${err}`)
    reject();
  });
  })
}

const userSchema = new mongoose.Schema({
  username: String,
  discriminator: Number,
  userId: Number,
  avatar: String,
  games: [String],
  hash: String,
  salt: String,
  session: String,
})

const User = mongoose.model('User', userSchema);

module.exports.db = DATABASE_START;
module.exports.User = User;