const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'music',
    description: "Sets up a reaction role message!",
    permissions: ["SEND_MESSAGES"],
   async execute(client,message, args, cmd, Discord) { 
const newEmbed = new Discord.MessageEmbed()
.setColor('#304281')
.setTitle('Commands')
	.setAuthor('Anime Archive', 'https://pbs.twimg.com/media/EcVoipsXQAUiP_N?format=jpg&name=medium')
.addFields(
    {name: 'Command 1', value: '>Play'},
    {name: 'Command 2', value: '>Leave'},
    {name: 'Command 3', value: 'Comming Soon!!'},
)
message.channel.send(newEmbed);
    }


    }