const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE','CHANNEL','REACTION']});
const token = '';
const { env, send, off } = require('process');
require('dotenv-flow').config();
const config = { 
  token: process.env.TOKEN,
  
 
 };
client.once('ready', () => {
  client.user.setActivity('To Code Files For Errors', { type: "LISTENING"});
});
 client.on('guildMemberAdd', guildMember =>{
  let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === '880396361168732201');

  guildMember.roles.add(welcomeRole);
  guildMember.guild.channels.cache.get('880357822062288926').send(`Welcome <@${guildMember.user.id}> to our server! Make sure to check out the rules channel!`)
});

  client.commands = new Discord.Collection();
  client.events = new Discord.Collection();
['command_handler', 'event_handler'].forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord)
});


client.login(config.token)
