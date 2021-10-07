const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'admin',
    description: "Sets up a reaction role message!",
    permissions: ["ADMINISTRATOR","MANAGE_CHANNELS","MANAGE_GUILD","KICK_MEMBERS"],
   async execute(client,message, args, cmd, Discord) { 
const newEmbed = new Discord.MessageEmbed()
.setColor('#304281')
.setTitle('Commands')
	.setAuthor('Anime Archive', 'https://pbs.twimg.com/media/EcVoipsXQAUiP_N?format=jpg&name=medium')
.addFields(
    {name: 'Command 1', value: '>kick'},
    {name: 'Command 2', value: '>ban'},
    {name: 'Command 3', value: '>mute <Time if you want>'},
    {name: 'Command 4', value: '>unmute'},
    {name: 'Command 5', value: '>clear chat'},
    {name: 'Command Rules', value:'>Rules a Set of Rules already made if you want to use them'},
)
message.channel.send(newEmbed);
    }


    }