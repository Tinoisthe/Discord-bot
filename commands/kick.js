module.exports = {
 name: 'kick',
 description: "this command kicks a member!",
 execute(client, message, args, Discord){
  if(member){
    if(message.member.roles.cache.has('871298883379142666')){
        const member = message.mentions.users.first();
                
             const memberTarger = message.guild.members.cache.get(member.id)
             memberTarger.kick();
             message.channel.send("User has been kicked");
             
            }else{ 
              message.reply('You cant use that')
       
  

                    
                   
                         
                }
  }
              }
            }

 