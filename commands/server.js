const { EmbedBuilder } = require('discord.js'); // Use EmbedBuilder instead of MessageEmbed

module.exports = {
  name: 'serverinfo',
  aliases: ["server"],
  description: 'Shows the info of the server where the command is written in',
  category: 'general',
  permissions: ["SEND_MESSAGES"],
  async execute(client, message, args, cmd, Discord) {
    try {
      const GuildOwner = `<@${message.guild.ownerId}>` || message.guild.owner;
      if (!GuildOwner) GuildOwner = "The server's owner is not cached <:sorry:762202529756872704>";
      const createdAt = new Intl.DateTimeFormat('en-US').format(message.guild.createdAt);

      const embed = new EmbedBuilder() // Use EmbedBuilder
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setAuthor({ name: message.guild.name })
        .setColor('#800080')
        .addFields(
          { name: `ID:`, value: message.guild.id, inline: true },
          { name: `Owner:`, value: GuildOwner, inline: true },
          { name: `Created At:`, value: createdAt, inline: true },
          { name: `Member Count:`, value: message.guild.memberCount.toString(), inline: true },
          { name: `Roles Count:`, value: message.guild.roles.cache.size.toString(), inline: true },
          { name: `Channels Count`, value: message.guild.channels.cache.size.toString(), inline: true },
          { name: `The Server's Region:`, value: message.guild.region || 'N/A', inline: true },
        )
        .setTimestamp()
        .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

      checks(message, embed); // Add additional fields
      await message.channel.send({ embeds: [embed] }); // Send the embed
    } catch (err) {
      console.error(`Error in /general/serverinfo.js: ` + err);
    }
  },
};

function checks(message, embed) {
  if (message.guild.premiumSubscriptionCount > 0) {
    embed.addFields(
      { name: `Boosters Count`, value: message.guild.premiumSubscriptionCount.toString(), inline: true },
      { name: `Boosting Level`, value: message.guild.premiumTier, inline: true }
    );
  }
  if (message.guild.systemChannel) {
    embed.addFields({ name: `System Channel`, value: message.guild.systemChannel.toString(), inline: true });
  }
  if (message.guild.afkChannel) {
    embed.addFields({ name: `AFK Channel`, value: `**\`${message.guild.afkChannel.name}\`**`, inline: true });
  }
  if (message.guild.banner) {
    embed.addFields({ name: "Server's Banner", value: `[Press here](${message.guild.bannerURL()})` });
  }
  if (message.guild.verified) {
    embed.addFields({ name: `Is Verified?`, value: "Yes", inline: true });
  }
  if (message.guild.partnered) {
    embed.addFields({ name: `Is partnered?`, value: "Yes!", inline: true });
  }
  if (message.guild.features) {
    const features = message.guild.features
      .map((f) => {
        const newf = f
          .toLowerCase()
          .replace(/_/g, " ")
          .replace(/_/g, " ")
          .replace(/_/g, " ");
        const capedf = capitalizeFirstLetter(newf);
        return `**${capedf}**`;
      })
      .join(",\n");
    if (features) {
      embed.addFields({ name: "Server's Features", value: features + ".", inline: false });
    }
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}