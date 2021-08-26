module.exports = {
    name: 'clear',
    description: "Clear messages!",
    async execute( client, message, args , Discord){
    if(message.member.roles.cache.has('880362875674308648')){
        if (!args[0]) return message.reply("Please enter the amount of messages to clear!");
 
        if(isNaN(args[0])) return message.reply("Please type a real number!");
 
        if(args[0] > 100) return message.reply("You can't remove more than 100 messages!");
        
        if(args[0] < 1) return message.reply("You have to delete at least one message!");
 
        await message.channel.messages.fetch({ limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages)
            message.reply('Done.')
            
  .then(msg => {
    setTimeout(() => msg.delete(), 1000)
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
 
    });
}else{ 
    message.reply('You cant use that')
 
}}}
