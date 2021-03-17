const Discord = require('discord.js');

const client = new Discord.Client();

 const prefix = '!';

const fs = require('fs');

const command = ('command');

const commands = ('commands');

async  =>
  client.login(process.env.BOT_TOKEN);
  client.commands = new Map();
  client.cachedmessagereactions = new Map();

  client.commands = new Discord.Collection();

const commandfiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandfiles){
const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}





 



client.once('ready',() => {
    console.log('Tino is online!');
});

client.on('message', message => {
 if(!message.content.startsWith(prefix) || message.author.bot) return;

 const args = message.content.slice(prefix.length).split(/ +/);
 const command = args.shift().toLowerCase();
 

 if(command === 'ping'){
  client.commands.get('ping').execute(message, args);
 } else if (command === 'cpu'){
  client.commands.get('website').execute(message, args);
    
} else if (command === 'Web'){
  client.commands.get('website').execute(message, args);
    
    
    }
  
   });


client.login('NzkzNzM0OTg3NTEzODU2MDIw.X-wlTw.rWcRUw7el73fptqSa334KJJh5rA')