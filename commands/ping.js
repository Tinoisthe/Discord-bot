module.exports = {
    name: 'ping',
     description: "this is a ping command!",
     execute(message, args){


      if(message.member.roles.cache.has('<@412011486953865227>')){
           
       message.channel.send('pong!')
       } else {
             message.channel.send("you can't send this Because you don't have the Authorisation ");

       }
  
 }
 
}
