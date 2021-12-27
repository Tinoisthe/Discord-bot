
const Discord = require('discord.js')
module.exports = {
    name: 'invitebot',
    aliases: ["invite"],
    description: 'Invite link to add the bot in your server',
    category:'info',
    async execute(client,message, args, cmd, Discord) { 
        const embed = new Discord.MessageEmbed()
        .setColor('#304281')
            .setTitle(`${client.user.username}'s invite link`)
            .addField('Developer Team: ','<@412011486953865227>')
            .setDescription(`\[Press HERE For Bot Link\]\(https://discord.com/oauth2/authorize?client_id=793734987513856020&permissions=278534417654&scope=bot)`)
        message.channel.send(embed);       
    }
}