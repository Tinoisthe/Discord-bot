// ✅ Import Discord.js and necessary classes
const Discord = require('discord.js');
const { Client, GatewayIntentBits, Collection, Partials } = Discord;

// ✅ Node.js built-in modules for path handling and file system operations
const path = require('path');
const fs = require('fs');

// ✅ Load environment variables from .env/.env.local/etc.
require('dotenv-flow').config();

// ✅ Import the MySQL connection and error logging function from a custom handler
const { connection, logErrorToDatabase } = require('./handlers/logger');

// ✅ Define a simple command prefix for the bot
const prefix = '>';

// ✅ Initialize a new Discord Client instance with required intents and partials
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,                  // Enables bot to access guild-level events
    GatewayIntentBits.GuildMessages,           // Enables reading messages in text channels
    GatewayIntentBits.MessageContent,          // Enables access to the actual message content
    GatewayIntentBits.GuildMembers,            // Enables member join/leave/update events
    GatewayIntentBits.GuildMessageReactions,   // Enables reaction add/remove events
    GatewayIntentBits.DirectMessages,          // Enables receiving DMs (optional, depends on your use case)
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction], // Required for DM or uncached events to work correctly
});

// ✅ Initialize a Collection to store all commands
client.commands = new Collection();

// ✅ Path to the command folder
const commandsPath = path.join(__dirname, 'commands');

// ✅ Ensure commands directory exists before trying to load files
if (!fs.existsSync(commandsPath)) {
  console.error(`❌ ERROR: Commands folder does not exist at: ${commandsPath}`);
  process.exit(1); // Gracefully stop the bot if folder is missing
}

// ✅ Dynamically load all command files ending in `.js`
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  try {
    console.log(`🔹 Loading command: ${file}`);
    const command = require(path.join(commandsPath, file));

    // ✅ Ensure the command file exports a "name" property
    if (!command.name) {
      console.warn(`⚠️ Skipping ${file}: Missing "name" property.`);
      continue;
    }

    // ✅ Store the command in the bot's command collection
    client.commands.set(command.name, command);
    console.log(`✅ Loaded command: ${command.name}`);
  } catch (error) {
    console.error(`❌ Error loading command ${file}:`, error);
    logErrorToDatabase(error, 'commandLoad'); // Log any loading errors
  }
}

// ✅ Register message handler module (e.g. command processing, filtering, etc.)
require('./handlers/messageHandler')(client, connection, logErrorToDatabase, prefix);

// ✅ Register auto-role module to give roles to new users
require('./handlers/autoRole')(client, logErrorToDatabase);

// ✅ Register a message cleanup module (e.g. auto-deleting old messages)
require('./handlers/messageCleanup')(client, logErrorToDatabase);

// ✅ Track deleted messages and mark them in the database
client.on('messageDelete', async (message) => {
  // Update message record to reflect deletion
  connection.query(
    'UPDATE messages SET deleted_at = NOW() WHERE message_id = ?',
    [message.id],
    (err, results) => {
      if (err) {
        console.error('Error updating deleted message timestamp:', err);
        logErrorToDatabase(err, 'messageDelete');
        return;
      }
      console.log('✅ Message marked as deleted:', results);
    }
  );
});

// ✅ Listen for low-level client errors and log them
client.on('error', (error) => {
  console.error('❌ Discord Client Error:', error);
  logErrorToDatabase(error, 'clientError');
});

client.on('warn', (info) => {
  console.warn('⚠️ Discord Client Warning:', info);
  logErrorToDatabase(info, 'clientWarning');
});

client.on('shardError', (error) => {
  console.error('❌ Shard Error:', error);
  logErrorToDatabase(error, 'shardError');
});

// ✅ Global process error handlers to catch uncaught or unhandled issues
process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
  logErrorToDatabase(reason, 'unhandledRejection');
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  logErrorToDatabase(error, 'uncaughtException');
});

// ✅ Optional: Clean shutdown - close DB connection properly
process.on('SIGINT', () => {
  console.log('🛑 Gracefully shutting down...');
  connection.end(err => {
    if (err) console.error('❌ Error closing DB connection:', err);
    else console.log('✅ DB connection closed.');
    process.exit();
  });
});

// ✅ Finally, log in to Discord using the bot token
client.login(process.env.TOKEN)
  .then(() => {
    console.log('✅ Bot is successfully logged in!');
  })
  .catch((err) => {
    console.error("❌ Failed to log in:", err);
    logErrorToDatabase(err, 'loginError');
  });
