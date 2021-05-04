//Import ExpressJS server and routing functionality.
const express = require("express");
const router = express.Router();
const fs = require('fs');

//Import Node path module.
const path = require('path');

//Import database interaction helper functions.
const { findUser } = require('../server/db/helpers.js');

router.get('/', (req, res) => {
  const { session } = req.cookies;
  if(!session){
    res.redirect('/signIn');
  }else{
    findUser({ session: session })
    .then((dataArr) => {
      if(!dataArr || !dataArr.length){
        res.redirect('/signIn');
      }else{
        res.redirect('/playerProfile');
      }
    })
  }
})

router.get('/signIn', (req, res) => {
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

router.get('/playerProfile', (req, res) => {
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