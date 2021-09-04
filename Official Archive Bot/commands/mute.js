const ms = require('ms');
module.exports = {
    name: 'mute',
    description: "This mutes a member",
    permission: ["MUTE_MEMBERS"],
    async execute(client,message, args, cmd, Discord) { 
        const target = message.mentions.users.first();
        if (target) {

            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
 
            let memberTarget = message.guild.members.cache.get(target.id);
 
            if (!args[1]) {
             
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted`);
                return
            }
        
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);
 
            setTimeout(function () {
                memberTarget.roles.remove(muteRole.id);
            }, ms(args[1]));
        } else {
            message.channel.send('Cant find that member!');

            const muteRole = message.guild.roles.find(role => role.name.toLowerCase().includes("Muted"));
            const muteChannel = message.guild.channels.find(channel => channel.name.includes("bots"));
            const muteUser = message.mentions.members.first();
            const muteReason = message.content.slice(prefix.length + 27);
        }
    }
}
