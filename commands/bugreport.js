const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 't',
  description: 'Guidelines for reporting bugs.',
  async execute(client, message, args, cmd, Discord) {
    const bugReportEmbed = new EmbedBuilder()
      .setColor('#FFA500') // Orange color for attention
      .setTitle('Please Use >invite to get Invited to the KAA community ')
      .setDescription('Bot will Dm you the Invite link')
      .addFields(
        
      )
      .setFooter({ text: 'Thank you for helping us improve KAA!' });

    // Send the embed
    message.channel.send({ embeds: [bugReportEmbed] });
  },
};