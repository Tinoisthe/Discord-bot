module.exports = {
  name: 'ban',
  description: "this command bans a member!",
  execute(message, args){
         const member = message.mentions.users.first();
           if(member){
            if(message.member.roles.cache.has('688214236765356044')){
            }else if (message.member.roles.cache.has('686625920861339685')){ 
            }else if (message.member.roles.cache.has('795932192986365972')){ 
               console.log
              const memberTarger = message.guild.members.cache.get(member.id)
              memberTarger.ban();
              message.channel.send("User has been ban");
            }else{ 
              message.reply('You cant use that')
              
                     
                    
                          
                 }
             }
 
  }
}

