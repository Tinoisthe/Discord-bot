const { EmbedBuilder } = require('discord.js'); // Use EmbedBuilder instead of MessageEmbed

module.exports = {
  name: 'help',
  description: "Displays a list of available commands.",
  permissions: ["SEND_MESSAGES"],
  async execute(client, message, args, cmd, Discord) {
    const newEmbed = new EmbedBuilder() // Use EmbedBuilder
      .setColor('#304281')
      .setTitle('Help Commands')
      .setAuthor({
        name: 'Tino',
        iconURL: 'https://pbs.twimg.com/media/EcVoipsXQAUiP_N?format=jpg&name=medium',
      })
      .addFields(
        { name: 'Minecraft Server Status', value: '>mc' },
         { name: 'Restart Bot', value: '>rbot' },
          { name: 'Restart Mincraft', value: '>rminecraft' },
        { name: 'Bot Uptime', value: '>uptime' },
        { name: 'Ping Bot', value: '>ping' },
        { name: 'Developer Team:', value: '<@412011486953865227>' }
      );

    message.channel.send({ embeds: [newEmbed] }); // Send the embed
  },
};