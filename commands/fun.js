const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'fun',
    description: "Sets up a reaction role message!",
    permissions: ["SEND_MESSAGES"],
   async execute(client,message, args, cmd, Discord) { 
const newEmbed = new Discord.MessageEmbed()
.setColor('#304281')
.setTitle('Commands')
	.setAuthor('Anime Archive', 'https://pbs.twimg.com/media/EcVoipsXQAUiP_N?format=jpg&name=medium')
.addFields(
    {name: 'Command 1', value: '>User'},
    {name: 'Command 2', value: '>server'},
    {name: 'Command 3', value: '>uptime'},
    {name: 'Command 4', value: '>av'},
    {name: 'Command 5', value: '>whois'},
    {name: 'Command 6', value: '>invite to get a link to our discord'},
    {name: 'Command 7', value: '>bot can invite it to your server'},
)
message.channel.send(newEmbed);
    }


    }