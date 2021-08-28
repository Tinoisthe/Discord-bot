
module.exports = {
    name: 'user',
     description: "this gets user!",
     async execute(client,message, args, cmd, Discord) { 

    message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
}}