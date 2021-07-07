
module.exports = {
    name: 'unmute',
    description: "this unmutes a member",
    execute(message, args){
        if(message.member.roles.cache.has('688214236765356044')){
        }else if (message.member.roles.cache.has('686625920861339685')){ 
        }else if (message.member.roles.cache.has('795932192986365972')){ 
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