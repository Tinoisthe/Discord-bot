const Discord = require('discord.js');
const path = require('path')
const fs = require('fs')
const client = new Discord.Client({ partials: ['MESSAGE','CHANNEL','REACTION']});
const { env, send, off } = require('process');
const ytdl = require("ytdl-core");
const mongoose = require("mongoose")
require('dotenv-flow').config();
const config = { 
  token: process.env.TOKEN,
  
 };
 const actvs = [
  "with code.",
  "with the developers console",
  "with the >help command.",
  "with Music"
];

 client.on("ready",  () => {
  client.user.setActivity({name: actvs[Math.floor(Math.random() * actvs.length)], type: "PLAYING"});
  setInterval(() => {
      client.user.setActivity({name: actvs[Math.floor(Math.random() * actvs.length)], type: "PLAYING"});
  }, 1000*30);

});
client.on('messageDelete', async message => {
	// Ignore direct messages
	if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	// Since there's only 1 audit log entry in this collection, grab the first one
	const deletionLog = fetchedLogs.entries.first();

	// Perform a coherence check to make sure that there's *something*
	if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

	// Now grab the user object of the person who deleted the message
	// Also grab the target of this action to double-check things
	const { executor, target } = deletionLog;

	// Update the output with a bit more information
	// Also run a check to make sure that the log returned was for the same author's message
	if (target.id === message.author.id) {
		console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
	} else {
		console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
	}
});
client.on('guildMemberRemove', async member => {
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});

	  
	// Since there's only 1 audit log entry in this collection, grab the first one
	const kickLog = fetchedLogs.entries.first();

	// Perform a coherence check to make sure that there's *something*
	if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);

	// Now grab the user object of the person who kicked the member
	// Also grab the target of this action to double-check things
	const { executor, target } = kickLog;

	// Update the output with a bit more information
	// Also run a check to make sure that the log returned was for the same kicked member
	if (target.id === member.id) {
		console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
	} else {
		console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
	}
});
client.on('guildBanAdd', async ban => {
	const fetchedLogs = await ban.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
	// Since there's only 1 audit log entry in this collection, grab the first one
	const banLog = fetchedLogs.entries.first();

	// Perform a coherence check to make sure that there's *something*
	if (!banLog) return console.log(`${ban.user.tag} was banned from ${ban.guild.name} but no audit log could be found.`);

	// Now grab the user object of the person who banned the member
	// Also grab the target of this action to double-check things
	const { executor, target } = banLog;

	// Update the output with a bit more information
	// Also run a check to make sure that the log returned was for the same banned member
	if (target.id === ban.user.id) {
		console.log(`${ban.user.tag} got hit with the swift hammer of justice in the guild ${ban.guild.name}, wielded by the mighty ${executor.tag}`);
	} else {
		console.log(`${ban.user.tag} got hit with the swift hammer of justice in the guild ${ban.guild.name}, audit log fetch was inconclusive.`);
	}
});
  client.commands = new Discord.Collection();
  client.events = new Discord.Collection();
['command_handler','event_handler'].forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord)
});

mongoose.connect(process.env.MONGODB_SRV,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(()=>{
	console.log("connected to database");
}).catch((err) =>{
	console.log(err);
})
client.login(config.token)
