// handlers/autoRole.js
const { Events } = require('discord.js');

// Replace with your actual role ID
const ROLE_ID = '1351395622653136909';

module.exports = (client, logErrorToDatabase) => {
  client.on(Events.GuildMemberAdd, async (member) => {
    const role = member.guild.roles.cache.get(ROLE_ID);
    if (!role) {
      console.error(`❌ Role with ID ${ROLE_ID} not found.`);
      return;
    }

    try {
      await member.roles.add(role);
      console.log(`✅ Assigned role ${role.name} to ${member.user.tag}`);
    } catch (error) {
      console.error(`❌ Failed to assign role:`, error);
      logErrorToDatabase(error);
    }
  });
};
