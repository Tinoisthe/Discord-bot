module.exports = {
    name: 'bring',
     description: "this can invite bot to your server",
     permissions: ["SEND_MESSAGES"],
     async execute(client,message, args, cmd, Discord) { 


      message.channel.send('invite bot')
       message.channel.send('https://discord.com/oauth2/authorize?client_id=793734987513856020&permissions=278534417654&scope=bot')
         
   }
}