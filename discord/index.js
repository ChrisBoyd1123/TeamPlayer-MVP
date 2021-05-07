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

let teamPlayerGuild;

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
    if(!teamPlayerGuild){
      teamPlayerGuild = member.guild;
    }
    member.user.send(key);
  })
  })

  //NOTE:
  //The DiscordJS message handler below is included for demo-ing purposes.
  //A production build of Team Player should, likely, not include message-responsive
  //functionality.
  client.on('message', msg => {
    const { username, discriminator, id, avatar } = msg.author;
    if(msg.content === 'ping'){
      initUser({
        username: username,
        discriminator: discriminator,
        id: id,
        avatar: avatar
      })
      .then((key) => {
        msg.author.send(key);
      })
    }
    })

    client.on('teamPlayerCreateChannel', (user1Id, user2Id) => {
      if(teamPlayerGuild){
        teamPlayerGuild.channels.create('lobby', {
          type: 'text',
          permissionOverwrites: [
            {
              id: teamPlayerGuild.roles.everyone,
              deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            },
            {
              id: user1Id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            },
            {
              id: user2Id,
              allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            }
          ]
        })

        teamPlayerGuild.channels.create('lobby voice chat', {
          type: 'voice',
          permissionOverwrites: [
            {
              id: teamPlayerGuild.roles.everyone,
              deny: ['VIEW_CHANNEL']
            },
            {
              id: user1Id,
              allow: ['VIEW_CHANNEL']
            },
            {
              id: user2Id,
              allow: ['VIEW_CHANNEL']
            }
          ]
        })
      }
    })

    const createLobbyChannel = (user1Id, user2Id) => {
      client.emit('teamPlayerCreateChannel', user1Id, user2Id);
    }

////////////////////////////
// EXPORTING DISCORD BOT //
//////////////////////////

module.exports.BOT_CLIENT = client;
module.exports.createServerLobby = createLobbyChannel;