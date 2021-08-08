
module.exports = {
    name: 'user',
     description: "this gets user!",
      execute( client, message, args , Discord){

    message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
}}