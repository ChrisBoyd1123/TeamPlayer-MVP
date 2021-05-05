// TODO
const path = require('path');
const { webpack } = require('webpack');
const webpackPlugin = require('webpack');
const { envKeys } = require('./webpackEnv.js');

module.exports = {
  entry: path.join(__dirname, 'client/src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/client/dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new webpackPlugin.DefinePlugin(envKeys)
  ]
};