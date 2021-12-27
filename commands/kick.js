module.exports = {
     name: 'kick',
     description: "this command kick a member!",
     permissions: ["KICK_MEMBERS"],
     async execute(client, message, args, cmd, Discord, profileData) { 
            const member = message.mentions.users.first();
                  console.log
                 const memberTarger = message.guild.members.cache.get(member.id)
                 memberTarger.kick();
                 message.channel.send("User has been kick");
                }
    
     }
   
   