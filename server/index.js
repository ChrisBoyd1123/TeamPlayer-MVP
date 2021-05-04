// TODO
const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { routes } = require('./router.js');
const { BOT_CLIENT } = require('../discord/index.js');
const { db } = require('./db/index.js');

//Access bot token.
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const CLIENT_PATH = path.join(__dirname, '../client/dist');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(CLIENT_PATH));
app.use('/', routes);

db().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    BOT_CLIENT.login(process.env.BOT_TOKEN);
  });
})