//Import ExpressJS server and routing functionality.
const express = require("express");
const router = express.Router();
const fs = require('fs');

//Import ReactDOM.
const ReactDOM = require("react-dom");
const path = require('path');

router.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile(path.join(__dirname, '../client/dist/index.html'), 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    res.write(data);
    res.end();
  })
})

/*
router.get('/dist/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/bundle.js'));
  res.end();
})
*/

module.exports.routes = router;