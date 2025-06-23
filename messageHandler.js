const { Events } = require('discord.js');

// Channel IDs used for moderation and logging
const AUTO_DELETE_CHANNEL_ID = '1351399908254679061'; // Special channel: auto-delete after 4.5s
const TARGET_CHANNELS = ['1351396038610518047']; // Other channels to auto-delete
const LINK_BLOCKED_CHANNELS = [
  '1351399908254679061',
  '1351397888009437266',
  '1352491677994057792',
  '1351405807073493082',
  '1351405009106898985'
]; // Channels where links are blocked
const REPORT_CHANNEL_ID = '1351396038610518047'; // Report channel
const REPORTED_CHANNEL_ID = '1353190164054413322'; // Where reports are forwarded

// Send a warning message that deletes itself after a timeout (default 4.5s)
async function sendTempWarning(channel, content, timeout = 4500) {
  try {
    const msg = await channel.send(content);
    setTimeout(() => msg.delete().catch(() => {}), timeout);
  } catch (err) {
    console.warn('⚠️ Failed to send temporary message:', err.message);
  }
}

// Log message into the database with correct column order matching schema
function logMessageToDatabase(message, connection, logErrorToDatabase) {
  const values = [
    message.id,                                   // message_id bigint(20) NOT NULL
    message.author.id,                            // user_id varchar(255) NOT NULL
    message.guild?.id ?? null,                    // server_id bigint(20) NULL
    message.content,                              // content text NULL
    'sent',                                      // message_type enum('sent','deleted') NOT NULL
    message.guild?.name ?? 'Unknown',             // server_name varchar(255) NULL
    message.channel.id,                           // channel_id varchar(255) NULL
    message.channel.name,                         // channel_name varchar(255) NULL
    message.mentions.users.map(u => u.id).join(', ') || 'None',   // mentioned_users mediumtext NULL
    message.mentions.roles.map(r => r.id).join(', ') || 'None',   // mentioned_roles mediumtext NULL
    message.attachments.size > 0 ? message.attachments.map(a => a.url).join(', ') : null, // attachments mediumtext NULL
    message.guild ? 0 : 1,                        // is_dm tinyint(1) NULL default 0
    message.author.tag                            // user_mention varchar(255) NULL
  ];

  const sql = `INSERT INTO messages
    (message_id, user_id, server_id, content, message_type, server_name, channel_id, channel_name,
     mentioned_users, mentioned_roles, attachments, is_dm, user_mention)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(sql, values, (err) => {
    if (err) {
      console.error('❌ Failed to log message to DB:', err);
      logErrorToDatabase(err);
    } else {
      console.log(`📦 Logged message ID: ${message.id}`);
    }
  });
}

module.exports = (client, connection, logErrorToDatabase) => {
  client.on(Events.MessageCreate, async (message) => {
    try {
      if (message.author.bot) return;

      // Log every message unconditionally for testing
      console.log(`🔍 Attempting to log message ID: ${message.id}`);
      logMessageToDatabase(message, connection, logErrorToDatabase);

      // Forward reports
      if (message.channel.id === REPORT_CHANNEL_ID) {
        const reportedLinksChannel = client.channels.cache.get(REPORTED_CHANNEL_ID);
        if (reportedLinksChannel) {
          await reportedLinksChannel.send(
            `📢 **New Report!**\n👤 **User:** <@${message.author.id}>\n📌 **Message:** ${message.content}`
          );
        } else {
          console.error(`❌ Could not find the reported-links channel (ID: ${REPORTED_CHANNEL_ID})`);
        }
      }

      // Block links only in LINK_BLOCKED_CHANNELS
      const linkRegex = /(https?:\/\/[^\s]+)/gi;
      if (LINK_BLOCKED_CHANNELS.includes(message.channel.id) && linkRegex.test(message.content)) {
        try {
          await message.delete();
        } catch (err) {
          console.warn('⚠️ Could not delete message containing link:', err.message);
        }
        await sendTempWarning(
          message.channel,
          `${message.author}, links are not allowed here. Please post them in <#${REPORT_CHANNEL_ID}>.`
        );
        return;
      }

      // Command handling
      if (message.content.startsWith('>')) {
        const args = message.content.slice(1).trim().split(/\s+/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);
        if (command) {
          try {
            await command.execute(client, message, args);
            setTimeout(() => message.delete().catch(() => {}), 4500);
          } catch (error) {
            logErrorToDatabase(error);
            const errMsg = await message.reply('There was an error executing that command.');
            setTimeout(() => errMsg.delete().catch(() => {}), 4500);
          }
        }
      }

      // Auto-delete messages in AUTO_DELETE_CHANNEL_ID after 4.5 seconds
      if (message.channel.id === AUTO_DELETE_CHANNEL_ID) {
        setTimeout(async () => {
          try {
            await message.delete();
            console.log(`🗑️ Deleted message from ${message.author.tag} in auto-delete channel.`);
          } catch (err) {
            console.error('❌ Failed to delete message:', err);
          }
        }, 4500);
        return;
      }

      // Auto-delete and notify in other restricted channels after 4.5 seconds
      if (TARGET_CHANNELS.includes(message.channel.id)) {
        setTimeout(async () => {
          try {
            await message.delete();
            console.log(`🗑️ Deleted message from ${message.author.tag} in restricted channel.`);
          } catch (err) {
            console.error('❌ Failed to delete restricted message:', err);
          }
          await sendTempWarning(message.channel, `${message.author}, Report was sent.`);
        }, 4500);
      }

    } catch (error) {
      console.error('❌ Unexpected error in messageCreate:', error);
      logErrorToDatabase(error);
    }
  });
};
