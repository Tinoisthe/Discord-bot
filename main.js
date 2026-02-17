// most of the code here has been update or is stilll on the list to update 
// always keep backup of code before editing it raw could use GIT 🫩 
// bots so broken dont know how it workikgn
// have brkoen code down so when i come back in 2-5months still know what it does





// 🫩 Import Discord.js and necessary classes
const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');

// Node.js built-in modules
const path = require('path');
const fs = require('fs');

//  Load environment variables
require('dotenv-flow').config();

// Import MySQL connection and logger
const { connection, logErrorToDatabase, logDirectMessage } = require('./handlers/logger');

//  Bot prefix planing to remove as it in env but planing to move to DB
const prefix = '>';

// Initialize Discord Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// Command collection
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');

if (!fs.existsSync(commandsPath)) {
  console.error(`❌ ERROR: Commands folder does not exist at: ${commandsPath}`);
  process.exit(1);
}

// Load commands dynamically
// i have know idea how this works there snother one of this in a handelr somewhere
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  try {
    console.log(`🔹 Loading command: ${file}`);
    const command = require(path.join(commandsPath, file));
    if (!command.name) {
      console.warn(`⚠️ Skipping ${file}: Missing "name" property.`);
      continue;
    }
    client.commands.set(command.name, command);
    console.log(`✅ Loaded command: ${command.name}`);
  } catch (error) {
    console.error(`❌ Error loading command ${file}:`, error);
    logErrorToDatabase(error, 'commandLoad');
  }
}

// Register handlers should be find go leave 
require('./handlers/messageHandler')(client, connection, logErrorToDatabase, prefix);
require('./handlers/autoRole')(client, logErrorToDatabase);
require('./handlers/messageCleanup')(client, logErrorToDatabase);

//  Log deleted messages  another one in messagecreate if im remenber right
client.on('messageDelete', async (message) => {
  connection.query(
    'UPDATE messages SET deleted_at = NOW() WHERE message_id = ?',
    [message.id],
    (err, results) => {
      if (err) {
        console.error('Error updating deleted message timestamp:', err);
        logErrorToDatabase(err, 'messageDelete');
      } else console.log('✅ Message marked as deleted:', results);
    }
  );
});

// Automatic DM logging working on upddting also need to update handelr 
client.on('messageCreate', async (message) => {
  if (message.channel.type === 1 && !message.author.bot) { // DM channel
    try {
      logDirectMessage(message.author.id, message.author.tag, message.content);
      console.log(`📩 Logged DM from ${message.author.tag}: ${message.content}`);
    } catch (err) {
      console.error('❌ Failed to log DM:', err);
      logErrorToDatabase(err, 'dmLog');
    }
  }
});

//  Error, warning, and shard handlers 🫠
client.on('error', (error) => { console.error('❌ Discord Client Error:', error); logErrorToDatabase(error, 'clientError'); });
client.on('warn', (info) => { console.warn('⚠️ Discord Client Warning:', info); logErrorToDatabase(info, 'clientWarning'); });
client.on('shardError', (error) => { console.error('❌ Shard Error:', error); logErrorToDatabase(error, 'shardError'); });

// Global process error handlers
process.on('unhandledRejection', (reason) => { console.error('❌ Unhandled Rejection:', reason); logErrorToDatabase(reason, 'unhandledRejection'); });
process.on('uncaughtException', (error) => { console.error('❌ Uncaught Exception:', error); logErrorToDatabase(error, 'uncaughtException'); });

//  Graceful shutdown
process.on('SIGINT', () => {
  console.log('🛑 Gracefully shutting down...');
  connection.end(err => {
    if (err) console.error('❌ Error closing DB connection:', err);
    else console.log('✅ DB connection closed.');
    process.exit();
  });
});

//  Log in to Discord and DB pending updrate 
client.login(process.env.TOKEN)
  .then(() => console.log('✅ Bot is successfully logged in!'))
  .catch((err) => { console.error('❌ Failed to log in:', err); logErrorToDatabase(err, 'loginError'); });
