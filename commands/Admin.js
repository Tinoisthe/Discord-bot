const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'admin',
    description: "Sets up a reaction role message!",
    permissions: ["SEND_MESSAGES"],
    Category: 'admin',
   async execute(client, message, args, cmd, Discord, profileData) { 
const newEmbed = new Discord.MessageEmbed()
.setColor('#304281')
.setTitle('Admin commands')
	.setAuthor('Anime Archive', 'https://pbs.twimg.com/media/EcVoipsXQAUiP_N?format=jpg&name=medium')
.addFields(
    {name: 'Command 1', value: '>kick'},
    {name: 'Command 2', value: '>ban'},
    {name: 'Command 3', value: '>mute <Time if you want>/ Must have role called Muted'},
    {name: 'Command 4', value: '>unmute'},
    {name: 'Command 5', value: '>clear chat'},
    {name: 'Command Rules', value:'>Rules a Set of Rules already made if you want to use them'},
)
.addField('Developer Team: ','<@412011486953865227>')
message.channel.send(newEmbed);
    }


    }