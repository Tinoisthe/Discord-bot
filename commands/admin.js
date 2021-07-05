module.exports = {
    name: 'admin',
    description: "this command get admin commands",
    execute(message, args){
      
            if(message.member.roles.cache.has('688214236765356044')){
                if(message.member.roles.cache.has('694569352502181899')){
                message.channel.send(">kick command");
                message.channel.send(">ban command");
                   }else{ 
                 message.channel.send('You cant use that');
            }
        }
    }
}
