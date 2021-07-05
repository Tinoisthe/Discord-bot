
module.exports = {
    name: 'unmute',
    description: "this unmutes a member",
    execute(message, args){
        const target = message.mentions.users.first();    
        if(target){
let mainRole = message.guild.roles.cache.find(role => role.name ==='Beautiful People');
let muteRole = message.guild.roles.cache.find(role => role.name ==='Muted');
       let memberTarger= message.guild.members.cache.get(target.id);

       memberTarger.roles.remove(muteRole.id);
       memberTarger.roles.add(mainRole.id);
       message.channel.send(`<@${memberTarger.user.id}> has been unmuted`)
        }else{ 
            message.reply('Cant find User')

        }
    }
    }
    
     
