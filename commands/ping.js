module.exports = {
    name: 'ping',
     description: "this is a ping command!",
     permissions: ["SEND_MESSAGES"],
     async execute(client,message, args, cmd, Discord) { 
       
       message.channel.send('pong!')
         
   }
}
