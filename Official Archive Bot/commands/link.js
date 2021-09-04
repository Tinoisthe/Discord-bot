module.exports = {
    name: 'link',
     description: "this is a link command!",
     permission: ["ADMINISTRATOR"],
     async execute(client,message, args, cmd, Discord) { 


      
       message.channel.send('https://github.com/Tinoisthe/Discord-bot')
         
   }
}