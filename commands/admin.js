module.exports = {
    name: 'admin',
    description: "this command get admin commands",
    execute(message, args){

        if(message.member.roles.cache.has('786517237703639080')){
            message.channel.send('You cant use that so i will send this');
            message.channel.send("HI");
        }else{
      
        if(message.member.roles.cache.has('808044039282622544')){
            message.channel.send('You cant use that so i will send this');
            message.channel.send("HI");
        }else{
                if(message.member.roles.cache.has('786517329981866015')){
                message.channel.send(">kick command");
                message.channel.send(">ban command");
             }else{
                   message.channel.send('You cant use that');
   
                       
                      
                            
                   }
               }
   
    }

}
}