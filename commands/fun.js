const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'fun',
    description: "Sets up a reaction role message!",
    permissions: ["SEND_MESSAGES"],
   async execute(client, message, args, cmd, Discord, profileData) { 
const newEmbed = new Discord.MessageEmbed()
.setColor('#304281')
.setTitle('fun commands')
	.setAuthor('Anime Archive', 'https://pbs.twimg.com/media/EcVoipsXQAUiP_N?format=jpg&name=medium')
.addFields(
    {name: 'Command 1', value: '>beg'},
    {name: 'Command 2', value: '>bl'},
    {name: 'Command 3', value: '>av'},
    {name: 'Command 4', value: '>whois'},
    {name: 'Command 5', value: '>8ball'},
    {name: 'Command 6', value: '>flip'},
    {name: 'Command 7', value: '>roll'},
    {name: 'Command 8', value: '>user'},
    {name: 'Command 9', value: '>server'},
    {name: 'Command 10', value: '>random'},
)
.addField('Developer Team: ','<@412011486953865227>')
message.channel.send(newEmbed);
    }


    }