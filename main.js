const { error, time } = require('console');
const Discord = require('discord.js');
const { on } = require('events');
const client = new Discord.Client();

 const prefix = '>';
 

 

const fs = require('fs');
const { url } = require('inspector');
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
    client.user.setActivity('Donate2Snail', { type: 'STREAMING'});
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
} else if (command === 'hi'){
  client.commands.get('hello').execute(message, args);
} else if (command === 'link'){
  client.commands.get('link').execute(message, args);
    }
  
   });

client.login(config.token)
