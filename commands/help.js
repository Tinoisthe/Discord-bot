const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'help',
    description: "Sets up a reaction role message!",
    permissions: ["SEND_MESSAGES"],
   async execute(client,message, args, cmd, Discord) { 
const newEmbed = new Discord.MessageEmbed()
.setColor('#304281')
.setTitle('Commands')
	.setAuthor('Anime Archive', 'https://pbs.twimg.com/media/EcVoipsXQAUiP_N?format=jpg&name=medium')
.addFields(
    {name: 'Command 1', value: '>admin'},
    {name: 'Command 2', value: '>music'},
    {name: 'Command 3', value: '>all'},
    {name: 'Command 4', value: '>fun'},
    {name: 'Command 5', value: '>invite .to our Discord Server!'},
    {name: 'Command 6', value: '>bring .the bot to your Discord server!'},


)
message.channel.send(newEmbed);
    }


    }