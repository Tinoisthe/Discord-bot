
module.exports = {
    name: 'unmute',
    description: "this unmutes a member",
    async execute(client,message, args, cmd, Discord) { 
        if(message.member.roles.cache.has('880362875674308648')){
        const target = message.mentions.users.first();    
        if(target){

let muteRole = message.guild.roles.cache.find(role => role.name ==='Muted');
       let memberTarger= message.guild.members.cache.get(target.id);

       memberTarger.roles.remove(muteRole.id);

       message.channel.send(`<@${memberTarger.user.id}> has been unmuted`)
        }else{ 
            message.reply('Cant find User')

        }
    }
    }
    
     
}