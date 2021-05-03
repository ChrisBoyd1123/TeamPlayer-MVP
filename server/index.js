// TODO
const ReactDOM = require('react-dom');
const express = require("express");
const { routes } = require('./router.js');
const { BOT_CLIENT } = require('../discord/index.js');
const path = require('path');

//Access bot token.
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');

const app = express();


app.use(express.static(CLIENT_PATH));
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  BOT_CLIENT.login(process.env.BOT_TOKEN);
});