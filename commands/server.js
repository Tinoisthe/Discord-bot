
module.exports = {
    name: 'server',
     description: "this gets the server info!",
     async execute( client, message, args , Discord){
       
        message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
         
   }
}


