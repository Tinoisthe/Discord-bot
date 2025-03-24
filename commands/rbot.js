const { exec } = require('child_process');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'rbot',
  description: 'Restart the bot.',
  usage: '', // No arguments needed
  async execute(client, message, args, cmd, Discord) {
    // Send a confirmation embed
    const restartEmbed = new EmbedBuilder()
      .setColor('#00FF00') // Green color for success
      .setDescription('🔄 Restarting the bot...')
      .setTimestamp();

    await message.channel.send({ embeds: [restartEmbed] });

    // Restart the bot using pm2
    exec('pm2 restart rbot', (error, stdout, stderr) => {
      if (error) {
        console.error('Failed to restart bot:', error);
        console.error('stderr:', stderr);

        // Send an error embed
        const errorEmbed = new EmbedBuilder()
          .setColor('#FF0000') // Red color for errors
          .setDescription('❌ Failed to restart the bot. Please check the logs.')
          .setTimestamp();

        message.channel.send({ embeds: [errorEmbed] });
        return;
      }

      console.log('Bot restarted successfully:', stdout);
    });
  },
};