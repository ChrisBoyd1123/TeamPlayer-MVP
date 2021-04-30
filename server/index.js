// TODO
const ReactDOM = require('react-dom');
const express = require("express");
const { routes } = require('./router.js');
const path = require('path');

const PORT = process.env.PORT || 8080;

const app = express();

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});