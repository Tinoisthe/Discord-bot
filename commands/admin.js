module.exports = {
    name: 'admin',
    description: "this command get admin commands",
    execute(message, args){
        
          
                if(message.member.roles.cache.has('786517329981866015')){
                message.channel.send(">kick command");
                message.channel.send(">ban command");
             }else{
                   message.channel.send('You cant use that');
   
                       
                      
                            
                   }
               }
   
    }

