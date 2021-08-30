module.exports = {
    name: 'tino',
     description: "Send tino!",
     permission: ["SEND_MESSAGES"],
     async execute(client,message, args, cmd, Discord) { 
       message.channel.send('<@412011486953865227> you have been ping by someone'); 
  
 }
 
 }