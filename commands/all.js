const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'all',
    description: "Sets up a reaction role message!",
    permissions: ["SEND_MESSAGES"],
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
    {name: 'Command 5', value: '>clear'},
    {name: 'Command 6', value: '>User'},
    {name: 'Command 7', value: '>server'},
    {name: 'Command 8', value: '>Play'},
    {name: 'Command 9', value: '>Leave'},
    {name: 'Command 10', value: '>uptime'},
    {name: 'Command 11', value: '>av'},
    {name: 'Command 12', value: '>whois'},
    {name: 'Command 13', value: '>invite to get a link to our discord'},
    {name: 'Command 13', value: '>bot invite it to your server'},
    {name: 'Command Rules', value:'>Rules a Set of Rules already made if you want to use them'},
)
message.channel.send(newEmbed);
    }


    }