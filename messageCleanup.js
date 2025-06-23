// handlers/messageCleanup.js
module.exports = (client, logErrorToDatabase) => {
  const CHANNEL_ID = '1353190164054413322';
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const CLEANUP_INTERVAL = 24 * 60 * 60 * 1000; // Run every 24 hours

  let cleanupInitialized = false;

  const cleanUpOldMessages = async () => {
    try {
      const channel = await client.channels.fetch(CHANNEL_ID);

      // Ensure the channel is a standard text channel (type 0)
      if (!channel || channel.type !== 0) {
        console.warn(`⚠️ Channel ${CHANNEL_ID} is not a standard text channel.`);
        return;
      }

      console.log(`🔍 Starting cleanup in channel: ${channel.name}`);

      let fetched;
      do {
        try {
          fetched = await channel.messages.fetch({ limit: 100 });

          const messagesToDelete = fetched.filter(
            msg => Date.now() - msg.createdTimestamp > SEVEN_DAYS
          );

          if (messagesToDelete.size === 0) {
            console.log('🧹 No messages found that are older than 7 days.');
            break;
          }

          const deleted = await channel.bulkDelete(messagesToDelete, true);
          console.log(`🗑️ Deleted ${deleted.size} messages older than 7 days.`);

          // Wait to avoid rate limits
          await new Promise(r => setTimeout(r, 1000));
        } catch (innerError) {
          console.error('⚠️ Error fetching or deleting messages:', innerError);
          logErrorToDatabase(innerError);
          break;
        }
      } while (fetched.size === 100);

    } catch (error) {
      console.error('❌ Error during scheduled message cleanup:', error);
      logErrorToDatabase(error);
    }
  };

  client.once('ready', () => {
    if (cleanupInitialized) return;
    cleanupInitialized = true;

    console.log('✅ Message cleanup handler initialized.');
    cleanUpOldMessages(); // Run immediately on startup
    setInterval(cleanUpOldMessages, CLEANUP_INTERVAL); // Schedule cleanup
  });
};
