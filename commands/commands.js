const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'help',
    description: "Sets up a reaction role message!",
   async execute(client,message, args, cmd, Discord) { 
const newEmbed = new Discord.MessageEmbed()
.setColor('#304281')
.setTitle('Commands')
	.setAuthor('Anime Archive', 'https://pbs.twimg.com/media/EcVoipsXQAUiP_N?format=jpg&name=medium')
.addFields(
    {name: 'Bot Prefix ', value: '>'},
    {name: 'Command 1', value: '>kick'},
    {name: 'Command 2', value: '>ban'},
    {name: 'Command 3', value: '>mute'},
    {name: 'Command 4', value: '>unmute'},
    {name: 'Command 5', value: '>clear'},
    {name: 'Command 6', value: '>report'},
    {name: 'Command 7', value: '>server'},
    {name: 'Command 8', value: '>user'},
    {name: 'Command 9', value: '>ping'},
    {name: 'Command 10', value: '>new'},

 
)
.setImage('https://images-ext-1.discordapp.net/external/-MVhgR0pYG4oS4Hh_es7-pARahzCNki0VPjf3xnakYE/%3Fformat%3Djpg%26name%3Dmedium/https/pbs.twimg.com/media/EcVoipsXQAUiP_N?width=397&height=472')
message.channel.send(newEmbed);
    }


    }