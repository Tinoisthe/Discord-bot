const Discord = require('discord.js');
const { Client, GatewayIntentBits, Collection, Partials } = Discord;
const path = require('path');
const fs = require('fs');
require('dotenv-flow').config();

// ✅ Bot prefix
const prefix = '>';

// ✅ Initialize bot client with required intents
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

// ✅ Load bot token from environment variables
const config = {
  token: process.env.TOKEN,
};

// ✅ Bot activity messages
const actvs = [
  "with code.",
  "with the developers console.",
  "with the >help command.",
  "with Music."
];

// ✅ Event: When bot is ready
client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const setRandomActivity = () => {
    const activity = actvs[Math.floor(Math.random() * actvs.length)];
    client.user.setActivity({ name: activity, type: "PLAYING" });
  };

  setRandomActivity();
  setInterval(setRandomActivity, 1000 * 30); // Change activity every 30 seconds
});

// ✅ Load commands dynamically from "commands" folder
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');

if (!fs.existsSync(commandsPath)) {
  console.error(`❌ ERROR: Commands folder does not exist at: ${commandsPath}`);
  process.exit(1);
}

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
  }
}

// ✅ Load event handlers
['command_handler', 'event_handler'].forEach(handler => {
  try {
    require(`./handlers/${handler}`)(client, Discord, prefix);
    console.log(`✅ Loaded handler: ${handler}`);
  } catch (error) {
    console.error(`❌ Failed to load handler: ${handler}`, error);
  }
});

// ✅ Event: Assign role to new members
client.on('guildMemberAdd', async (member) => {
  const ROLE_ID = '1351395622653136909'; // Change to your role ID
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
  }
});

// ✅ Define restricted channels
const TARGET_CHANNELS = [
  '1351399908254679061', 
  '1351396038610518047',
];
const LINK_CHANNEL_ID = '1351397888009437266';
const REPORT_LINKS_CHANNEL = '<#1351396038610518047>'; 

// ✅ Event: Message handling
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const linkRegex = /(https?:\/\/[^\s]+)/gi; 

  // 🔹 Delete links in the restricted channel
  if (message.channel.id === LINK_CHANNEL_ID && linkRegex.test(message.content)) {
    try {
      await message.delete();
      const warningMessage = await message.channel.send(
        `${message.author}, links are not allowed here. Please post them in ${REPORT_LINKS_CHANNEL}.`
      );
      setTimeout(() => warningMessage.delete().catch(console.error), 5000);
    } catch (error) {
      console.error(`❌ Failed to delete link message:`, error);
    }
    return;
  }

  // 🔹 Handle commands
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (command) {
      try {
        await command.execute(client, message, args); // ✅ Corrected: Pass `client`
        setTimeout(() => message.delete().catch(console.error), 5000);
      } catch (error) {
        console.error(`❌ Error executing ${commandName}:`, error);
        const errorReply = await message.reply('There was an error executing that command.');
        setTimeout(() => errorReply.delete().catch(console.error), 5000);
      }
      return;
    }
  }

  // 🔹 Delete unauthorized messages in target channels
  if (TARGET_CHANNELS.includes(message.channel.id)) {
    try {
      await message.delete();
      const warningMessage = await message.channel.send(
        `${message.author}, Report was sent `
      );
      setTimeout(() => warningMessage.delete().catch(console.error), 5000);
    } catch (error) {
      console.error(`❌ Failed to delete unauthorized message:`, error);
    }
  }
});

// ✅ Log in to Discord
client.login(config.token)
  .then(() => {
    console.log('✅ Bot is successfully logged in!');
  })
  .catch((err) => {
    console.error("❌ Failed to log in:", err);
  });
