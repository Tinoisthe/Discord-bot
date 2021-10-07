module.exports = {
    name: 'invite',
     description: "this is a link command!",
     permissions: ["SEND_MESSAGES"],
     async execute(client,message, args, cmd, Discord) { 


      message.channel.send('join our Discord')
       message.channel.send('https://discord.gg/8RjFY4sw4N')
         
   }
}