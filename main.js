const Discord = require('discord.js');
const { error, time } = require('console');
const { on } = require('events');
const client = new Discord.Client();
const guildID = '849581521828315146';
const token = '';

 const prefix = '>';
const fs = require('fs');
const { Error } = require('opusscript');
const { type } = require('os');
const { env, send, off } = require('process');
const bot = require('./commands/newEmbed');
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
//Message Event
client.on('message', async message => {
  //args
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  

  //commands
  if (command === 'report') {
    //Has to be in DMs
    if (message.channel.type != 'dm') {
        message.delete();
        

       let appChannel = (await message.author.send("Please fill all the details if you don't want to continue then type cancel")).channel
       
      //First Question
      while(1){
        await message.author.send('Have you read all the prerequisites for the reporting system');
      let answer = await appChannel.awaitMessages(answer => answer.author.id != client.user.id, {
        max: 1
      });
      const tf = (answer.map(answers => answers.content).join());
      if(tf==='cancel'){
        message.author.send("Request has been cancelled");
        return;
      }
      if(tf==='no'){
        message.author.send("Please read all the prerequisites for the reporting system in #report-here");
        return;
      }

      //Second Question
      await message.author.send('Send message link for the message to be reported');
      answer = await appChannel.awaitMessages(answer => answer.author.id != client.user.id, {
        max: 1
      });
      const msg1 = (answer.map(answers => answers.content).join());
        if(msg1==='cancel'){
        message.author.send("Request has been cancelled");
        return;
      }

      //Third Question
      await message.author.send('Send the message link where you have told them not to insult you');
      answer = await appChannel.awaitMessages(answer => answer.author.id != client.user.id, {
        max: 1
      });
      const msg2 = (answer.map(answers => answers.content).join());
        if(msg2==='cancel'){
        message.author.send("Request has been cancelled");
        return;
      }
        
      message.author.send("Your request has been submitted. Expect message from Mods in case there is extra message required");

      //Embed
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField('Accused Message Link', msg1)
        .addField('Warn Message Link', msg2)
        .setTimestamp()
        .setColor("255x#FF0000")
        .addField('userID', message.author.id);

      //Sending Embed
      const guild = client.guilds.cache.get(guildID);
      await guild.channels.cache.find(channel => channel.name === 'reports').send(embed);
        
        return;
      }
  client.commands = new Discord.Collection();

const commandfiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandfiles){
const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);

}
      

}

}

   });
const cmd = client.commands.get('report');
console.log(cmd);


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
} else if (message.content === `${prefix}server`) {
  message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
} else if (message.content === `${prefix}user`) {
  message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);

}

   });

client.login(config.token)
