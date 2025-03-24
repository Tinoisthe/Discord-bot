module.exports = {
  name: 'talk',
  description: 'Make the bot talk!',
  async execute(client, message, args) {
    try {
      // Check if args are provided for the message
      if (!args.length) {
        return message.reply("Please provide a message for me to talk!");
      }

      // Join the arguments and form a response
      const response = args.join(" ");
      
      // Send a reply
      await message.reply(response);
    } catch (error) {
      console.error('❌ Error in talk command:', error);
      await message.reply('There was an error executing the command.');
    }
  }
};
