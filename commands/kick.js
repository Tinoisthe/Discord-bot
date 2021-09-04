module.exports = {
 name: 'kick',
 description: "this command kicks a member!",
 permissions: ["KICK_MEMBERS"],
 async execute(client,message, args, cmd, Discord) { 
        const member = message.mentions.users.first();
                
             const memberTarger = message.guild.members.cache.get(member.id)
             memberTarger.kick();
             message.channel.send("User has been kicked");         
  }
            
            }

 