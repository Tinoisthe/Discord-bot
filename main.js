const { error, time } = require('console');
const Discord = require('discord.js');
const { on } = require('events');
const client = new Discord.Client();

 const prefix = '>';


 // Stores the current count.
let count = 0
// Stores the timeout used to make the bot count if nobody else counts for a set period of
// time.
let timeout

client.on('message', ({channel, content, member}) => {
  // Only do this for the counting channel of course
  // If you want to simply make this work for all channels called 'counting', you
  // could use this line:
   if (client.channels.cache.filter(c => c.name === 'counting').keyArray().includes(channel.id))
  if (channel.id === 'counting') {
    // You can ignore all bot messages like this
    if (member.user.bot) return
    // If the message is the current count + 1...
    if (Number(content) === count + 1) {
      // ...increase the count
      count++
      // Remove any existing timeout to count
      if (timeout) client.clearTimeout(timeout)
      // Add a new timeout
      timeout = client.setTimeout(
        // This will make the bot count and log all errors
        () => channel.send(++count).catch(console.error),
        // after 30 seconds
        3
      )
    // If the message wasn't sent by the bot...
    } else if (member.id !== client.user.id) {
      // ...send a message because the person stuffed up the counting (and log all errors)
      channel.send(`${member} messed up!`).catch(console.error)
      // Reset the count
      count = 0
      // Reset any existing timeout because the bot has counted so it doesn't need to
      // count again
      if (timeout) client.clearTimeout(timeout)
    }
  }
})

const fs = require('fs');
const { Error } = require('opusscript');
const { type } = require('os');
const { env, send, off } = require('process');
require('dotenv-flow').config();

const config = { 
 token: process.env.TOKEN,
 owner: process.env.OWNER,
 prefix: process.env.PREFIX

};

const commands = ('commands');


async  =>
  client.login(process.env.Discord_TOKEN);
  client.commands = new Map();
  client.cachedmessagereactions = new Map();

  client.commands = new Discord.Collection();

const commandfiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandfiles){
const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}





 



client.once('ready',() => {
    console.log('Tino is online!')
    client.user.setActivity('Anime', { type: 'WATCHING'});
});

client.on('message', message => {
 if(!message.content.startsWith(prefix) || message.author.bot) return;

 const args = message.content.slice(prefix.length).split(/ +/);
 const command = args.shift().toLowerCase();
 
 if(command === 'ping'){
  client.commands.get('ping').execute(message, args);
 } else if (command === 'cpu'){
  client.commands.get('twitch').execute(message, args);
} else if (command === 'clear'){
  client.commands.get('clear').execute(message, args);
} else if (command === 'kick'){
  client.commands.get('kick').execute(message, args);
} else if (command === 'ban'){
  client.commands.get('ban').execute(message, args);
} else if (command === 'tino'){
  client.commands.get('tino').execute(message, args);
} else if (command === 'help'){
  client.commands.get('help').execute(message, args);
} else if (command === 'admin'){
  client.commands.get('admin').execute(message, args);
} else if (command === 'link'){
  client.commands.get('link').execute(message, args);
} else if (command === 'errors'){
  client.commands.get('errors').execute(message, args);
    }
  
   });

client.login(config.token)
