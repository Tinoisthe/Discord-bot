
module.exports = {
    name: 'unmute',
    description: "this unmutes a member",
    permission: ["ADMINISTRATOR","MUTE_MEMBERS"],
    async execute(client,message, args, cmd, Discord) { 
        const target = message.mentions.users.first();    
        if(target){

let muteRole = message.guild.roles.cache.find(role => role.name ==='Muted');
       let memberTarger= message.guild.members.cache.get(target.id);

       memberTarger.roles.remove(muteRole.id);

       message.channel.send(`<@${memberTarger.user.id}> has been unmuted`)
      
    }
    
     
}}