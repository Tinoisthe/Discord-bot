module.exports = {
  name: 'ban',
  description: "this command bans a member!",
  permission: ["BAN_MEMBERS"],
  async execute(client,message, args, cmd, Discord) { 
         const member = message.mentions.users.first();
               console.log
              const memberTarger = message.guild.members.cache.get(member.id)
              memberTarger.ban();
              message.channel.send("User has been ban");
             }
 
  }

