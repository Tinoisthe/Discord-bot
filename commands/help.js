const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'help',
    description: "Sets up a reaction role message!",
    permissions: ["SEND_MESSAGES"],
   async execute(client,message, args, cmd, Discord) { 
const newEmbed = new Discord.MessageEmbed()
.setColor('#304281')
.setTitle('Help Commands')
	.setAuthor('Anime Archive', 'https://pbs.twimg.com/media/EcVoipsXQAUiP_N?format=jpg&name=medium')
.addFields(
    {name: 'Command 1', value: '>admin'},
    {name: 'Command 2', value: '>music'},
    {name: 'Command 3', value: '>fun'},
    {name: 'Command 4', value: '>invitebot'},
    {name: 'Command 5', value: '>support'},
    {name: 'Command 6', value: '>uptime'},
    {name: 'Command 7', value: '>ping'},
    
)
.addField('Developer Team: ','<@412011486953865227>')
message.channel.send(newEmbed);
    }


    }