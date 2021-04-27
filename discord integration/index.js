//Import bot token.
const { TOKEN } = require(`./botToken.js`);

//Import DiscordJS Library
const Discord = require('discord.js');

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

client.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('pong.')
    }
  })

////////////////////////////////////
// CONNECTING BOT TO DISCORD API //
//////////////////////////////////

client.login(TOKEN);