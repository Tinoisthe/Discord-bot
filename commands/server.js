
module.exports = {
    name: 'server',
     description: "this gets the server info!",
     permissions: ["SEND_MESSAGES"],
     async execute(client,message, args, cmd, Discord) { 
       
        message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
         
   }
}


