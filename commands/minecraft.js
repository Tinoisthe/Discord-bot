const { exec } = require('child_process');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'rminecraft', // Command name
  description: 'Restarts the Minecraft server with 7GB of RAM.', // Command description
  execute(client, message, args) {
    // List of allowed users who can restart the server
    const allowedUsers = ['412011486953865227', 'USER_ID_2']; // Replace with actual user IDs

    // Check if the user is allowed to restart the server
    if (!allowedUsers.includes(message.author.id)) {
      return message.reply('You do not have permission to restart the Minecraft server.');
    }

    // Create an embed for the restart message
    const restartEmbed = new EmbedBuilder()
      .setColor(0xFFA500) // Orange color
      .setTitle('🔄 Restarting Minecraft Server...')
      .setDescription('The Minecraft server is restarting with 7GB of RAM. Please wait a moment.')
      .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();

    message.reply({ embeds: [restartEmbed] });

    // Execute the restart script
    exec('/opt/minecraft/vanilla/restart_minecraft.sh', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error restarting Minecraft server: ${error.message}`);
        message.reply('There was an error restarting the Minecraft server.');
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        message.reply('There was an error restarting the Minecraft server.');
        return;
      }

      console.log(`Minecraft server restarted. Output: ${stdout}`);
      message.reply('Minecraft server has been restarted successfully with 7GB of RAM!');
    });
  },
};