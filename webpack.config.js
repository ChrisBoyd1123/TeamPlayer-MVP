// TODO
const path = require('path');

module.exports = {
  entry: "./client/src/index",
  output: { // NEW
    path: path.join(__dirname, 'client/dist'),
    filename: "bundle.js"
  }, // NEW Ends
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};