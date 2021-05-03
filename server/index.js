// TODO
const ReactDOM = require('react-dom');
const express = require("express");
const { routes } = require('./router.js');
const path = require('path');

const PORT = process.env.PORT || 8080;
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');

const app = express();


app.use(express.static(CLIENT_PATH));
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});