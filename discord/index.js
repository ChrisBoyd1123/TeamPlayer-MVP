//Import DiscordJS Library
const Discord = require('discord.js');
const EventEmitter = require('events');

/////////////////////////////////
// INITIALIZATION VIA NODE.JS //
///////////////////////////////

const client = new Discord.Client();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
 });

    //Set bot activity.
client.on('ready', () => {
    console.log('Ready');
    client.user.setActivity(``);
})

////////////////////////////////
// MAIN LOGIC VIA DISCORD.JS //
//////////////////////////////

//PSEUDOCODE START//

//When a user joins the "Team Player" server, give them their key to
//a corresponding player profile via DMs.

//When a user is "contacted" via the web-app, send them a DM over
//Discord to accept the contact request.

//Contact accepted? Create the following for both users.
// - category for both users.
// - text channel in category.
// - voice chat in category.

//import bot-database interaction functions.
const { initUser } = require('./dbFuncs.js');

///////////////////

client.on('guildMemberAdd', member => {
  const { username, discriminator, id, avatar } = member.user;
  initUser({
    username: username,
    discriminator: discriminator,
    id: id,
    avatar: avatar
  })
  .then((key) => {
    member.user.send(key);
  })
  })

////////////////////////////
// EXPORTING DISCORD BOT //
//////////////////////////

module.exports.BOT_CLIENT = client;