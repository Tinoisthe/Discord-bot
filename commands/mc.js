const { EmbedBuilder } = require('discord.js');
const { status } = require('minecraft-server-util');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'mc',
  description: 'Checks the status of the Minecraft server.',
  async execute(client, message, args) {
    if (!message || !message.author) {
      console.error("❌ Error: 'message' or 'message.author' is undefined.");
      return message?.reply("⚠️ An error occurred. Please try again.");
    }

    const serverIP = '162.248.101.196'; // Replace with your server IP
    const serverPort = 25565; // Replace with your server port
    const serverDir = '/opt/minecraft/vanilla'; // Replace with your server directory
    const startTimeFile = path.join(serverDir, 'start_time.txt');

    const serverOwnerDiscordID = '412011486953865227'; 
    const modTeam = '<@412011486953865227>\n<@548891747774758912>'; 

    try {
      const response = await status(serverIP, serverPort);

      let uptime = 'Yes';
      if (fs.existsSync(startTimeFile)) {
        const startTime = parseInt(fs.readFileSync(startTimeFile, 'utf8'));
        const currentTime = Math.floor(Date.now() / 1000);
        const uptimeSeconds = currentTime - startTime;

        const days = Math.floor(uptimeSeconds / 86400);
        const hours = Math.floor((uptimeSeconds % 86400) / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = uptimeSeconds % 60;

        uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }

      const onlinePlayers = response.players.sample
        ? response.players.sample.map(player => player.name).join('\n')
        : 'No players online.';

      const statusEmbed = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle('🟢 Minecraft Server Status')
        .setDescription('The Minecraft server is **online**.')
        .addFields(
          { name: 'Host', value: serverIP, inline: true },
          { name: 'Port', value: serverPort.toString(), inline: true },
          { name: 'MOTD', value: response.motd.clean || 'N/A', inline: false },
          { name: 'Version', value: response.version.name || 'N/A', inline: true },
          { name: 'Players', value: `${response.players.online}/${response.players.max}`, inline: true },
          { name: 'Uptime', value: uptime, inline: true },
          { name: 'Server Owner', value: `<@${serverOwnerDiscordID}>`, inline: true },
          { name: 'Mod/Team', value: modTeam, inline: false },
          { name: 'Online Players', value: onlinePlayers, inline: false }
        )
        .setFooter({ 
          text: `Requested by ${message.author.tag}`, 
          iconURL: message.author.displayAvatarURL() 
        })
        .setTimestamp();

      return message.reply({ embeds: [statusEmbed] });
    } catch (error) {
      console.error("❌ Error fetching Minecraft server status:", error);

      const statusEmbed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('🔴 Minecraft Server Status')
        .setDescription('The Minecraft server is **offline**.')
        .addFields(
          { name: 'Host', value: serverIP, inline: true },
          { name: 'Port', value: serverPort.toString(), inline: true },
          { name: 'Server Owner', value: `<@${serverOwnerDiscordID}>`, inline: true },
          { name: 'Mod/Team', value: modTeam, inline: false }
        )
        .setFooter({ 
          text: `Requested by ${message.author?.tag || "Unknown"}`, 
          iconURL: message.author?.displayAvatarURL() || null 
        })
        .setTimestamp();

      return message.reply({ embeds: [statusEmbed] });
    }
  },
};
