//Import ExpressJS server and routing functionality.
const express = require("express");
const router = express.Router();
const fs = require('fs');

//Import Node path module.
const path = require('path');

//Import database interaction helper functions.
const { findUserByNmDc, findUserBySession, addGame, findUsersGames } = require('./db/helpers.js');
const { compareHash, verifySession } = require('../server/auth/authUtils.js');

router.get('/', (req, res) => {
  verifySession(req, res)
  .then((sessionPresent) => {
    if(sessionPresent){
      res.redirect('/playerProfile');
    }
  })
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
  verifySession(req, res)
  .then((sessionPresent) => {
    if(sessionPresent){
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.readFile(path.join(__dirname, '../client/dist/profile.html'), 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        res.write(data);
        res.end();
      })
    }
  })
})

router.post('/signingIn', (req, res) => {
  const usernamePattern = /^.*#[0-9]{4}$/;
  //Test for "username#discriminator" pattern.
  const { username, key } = req.body;

  if(!usernamePattern.test(username)){
    res.sendStatus(400).end();
  }

  const userAndDis = username.split("#");

  findUserByNmDc({username: userAndDis[0], discriminator: userAndDis[1]})
  .then((dataArr) => {
    if(!dataArr || !dataArr.length){
      res.redirect('/signIn');
    }else{
      if(compareHash(key, dataArr[0].salt, dataArr[0].hash)){
        res.cookie('session', dataArr[0].session).end();
      }else{
        res.redirect('/signIn');
      }
    }
  })
})

router.get('/userData', (req, res) => {
  verifySession(req, res)
  .then((sessionPresent) => {
    if(sessionPresent){
    const { session } = req.cookies;

    findUserBySession({session: session})
    .then((data) => {
      res.send(JSON.stringify(data[0]));
    })
  }
  })
})

router.get('/userGames', (req, res) => {
  verifySession(req, res)
  .then((sessionPresent) => {
    if(sessionPresent){
    const { session } = req.cookies;

    findUsersGames(session)
    .then((userGames) => {
      res.send(JSON.stringify({userGames: userGames}));
    })
  }
  })
})

router.post('/newGame', (req, res) => {
  verifySession(req, res)
  .then((sessionPresent) => {
    const { gameName } = req.body;

    if(sessionPresent && gameName){
    const { session } = req.cookies;

    addGame(session, gameName)
    .then(() => {
      res.sendStatus(200).send();
    })
    }
  })
})

router.get('/listing', (req, res) => {
  verifySession(req, res)
  .then((sessionPresent) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
      fs.readFile(path.join(__dirname, '../client/dist/listing.html'), 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        res.write(data);
        res.end();
      })
  })
})

module.exports.routes = router;