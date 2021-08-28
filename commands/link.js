module.exports = {
    name: 'link',
     description: "this is a link command!",
     async execute(client,message, args, cmd, Discord) { 


      
           
       message.channel.send('https://dashboard.heroku.com/apps/tino-bot/logs')
       message.channel.send('https://github.com/Tinoisthe/Discord-bot')
         
   }
}