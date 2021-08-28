module.exports = {
    name: 'ping',
     description: "this is a ping command!",
     async execute(client,message, args, cmd, Discord) { 
       
       message.channel.send('pong!')
         
   }
}
