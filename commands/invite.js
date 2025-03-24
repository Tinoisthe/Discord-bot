module.exports = {
  name: 'invite',
  description: 'Sends the bot invite link in DMs.',
  async execute(client, message, args) {
    const INVITE_LINK = 'https://discord.gg/fg2VV6BqXy'; // 🔹 Replace with your actual invite link

    try {
      await message.author.send(`Here's your invite link: ${INVITE_LINK}`);
      console.log(`📩 Sent invite link to ${message.author.tag}`);

      const botReply = await message.reply('Check your DMs for the invite link!');
      setTimeout(() => botReply.delete().catch(console.error), 5000);
    } catch (error) {
      console.error('❌ Failed to send DM:', error);

      if (error.code === 50007) { // Cannot send messages to this user
        const botReply = await message.reply("I couldn't send you a DM. Please enable your DMs and try again.");
        setTimeout(() => botReply.delete().catch(console.error), 5000);
      }
    }

    // 🔹 Delete the command message after 5 seconds
    setTimeout(() => {
      if (message.deletable) message.delete().catch(console.error);
    }, 5000);
  },
};
