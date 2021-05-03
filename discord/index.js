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

///////////////////

client.on('message', msg => {
    if (msg.content === 'ping') {
      console.log("cache get user", client.users.cache.get('299722286947368974'));
    }
  })

////////////////////////////
// EXPORTING DISCORD BOT //
//////////////////////////

module.exports.BOT_CLIENT = client;