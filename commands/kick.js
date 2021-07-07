module.exports = {
 name: 'kick',
 description: "this command kicks a member!",
 execute(message, args){
        const member = message.mentions.users.first();
          if(member){
            if(message.member.roles.cache.has('688214236765356044')){
            }else if (message.member.roles.cache.has('686625920861339685')){ 
            }else if (message.member.roles.cache.has('795932192986365972')){ 
             const memberTarger = message.guild.members.cache.get(member.id)
             memberTarger.kick();
             message.channel.send("User has been kicked");
            }else{ 
              message.reply('You cant use that')

                    
                   
                         
                }
            }

 }

}
