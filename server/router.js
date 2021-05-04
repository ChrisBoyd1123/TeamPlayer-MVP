//Import ExpressJS server and routing functionality.
const express = require("express");
const router = express.Router();
const fs = require('fs');

//Import Node path module.
const path = require('path');

router.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile(path.join(__dirname, '../client/dist/signIn.html'), 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    res.write(data);
    res.end();
  })
})

router.get('/2', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile(path.join(__dirname, '../client/dist/profile.html'), 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    res.write(data);
    res.end();
  })
})

module.exports.routes = router;