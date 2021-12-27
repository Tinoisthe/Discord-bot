const Discord = require('discord.js')
module.exports = {
    name: 'support',
    description: 'General Support',
    category:'support',
    async execute(client,message, args, cmd, Discord) { 
        const embed = new Discord.MessageEmbed()
        .setColor('#304281')
                        .setTitle('Support')
                        .addField('Developer Team: ','<@412011486953865227>')
                        .addField('Official Server:','https://discord.gg/GDggchenUZ')
                        .addField('Official Server2:','https://discord.gg/uMKK58jCBc')


        message.channel.send(embed);
               
    }
}