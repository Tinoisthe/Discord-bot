// utils/logger.js
const mysql = require('mysql2');

// Setup connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'logs',
  password: '1Maxwoof',
  database: 'logs',
  charset: 'utf8mb4'
});

connection.connect(err => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.stack);
  } else {
    console.log('✅ Connected to MySQL as id ' + connection.threadId);
  }
});

// === ERROR LOGGING ===
function logErrorToDatabase(error, eventType = 'unhandled') {
  try {
    const message = error?.message || String(error);
    const stack = error?.stack || 'No stack trace';

    connection.query(
      'INSERT INTO bot_errors (error_message, stack_trace, event_type) VALUES (?, ?, ?)',
      [message, stack, eventType],
      (err) => {
        if (err) console.error('❌ Failed to log error to DB:', err);
        else console.log(`📦 Logged error (${eventType}) to database.`);
      }
    );
  } catch (e) {
    console.error('❌ Exception in logErrorToDatabase:', e);
  }
}

// === BOT EVENT LOGGING ===
function logBotEvent(event, details = '') {
  connection.query(
    'INSERT INTO bot_status_logs (event, details) VALUES (?, ?)',
    [event, details],
    (err) => {
      if (err) console.error('❌ Failed to log bot event:', err);
      else console.log(`📦 Logged bot event: ${event}`);
    }
  );
}

// === COMMAND USAGE LOGGING ===
function logCommandUsage(userId, username, commandName, guildId = null) {
  connection.query(
    'INSERT INTO command_logs (user_id, username, command_name, guild_id) VALUES (?, ?, ?, ?)',
    [userId, username, commandName, guildId],
    (err) => {
      if (err) console.error('❌ Failed to log command usage:', err);
      else console.log(`📦 Logged command usage: ${commandName} by ${username}`);
    }
  );
}

// === MESSAGE EDIT LOGGING ===
function logMessageEdit(messageId, userId, oldContent, newContent) {
  connection.query(
    'INSERT INTO message_edits (message_id, user_id, old_content, new_content) VALUES (?, ?, ?, ?)',
    [messageId, userId, oldContent, newContent],
    (err) => {
      if (err) console.error('❌ Failed to log message edit:', err);
      else console.log(`📦 Logged message edit for message ID: ${messageId}`);
    }
  );
}

// === DIRECT MESSAGE LOGGING ===
function logDirectMessage(userId, username, message) {
  connection.query(
    'INSERT INTO dm_logs (user_id, username, message) VALUES (?, ?, ?)',
    [userId, username, message],
    (err) => {
      if (err) console.error('❌ Failed to log DM:', err);
      else console.log(`📦 Logged DM from user: ${username}`);
    }
  );
}

// === MESSAGE DELETION LOGGING ===
function logMessageDeletion(messageId, userId, content, channelId) {
  connection.query(
    'INSERT INTO message_deletions (message_id, user_id, content, channel_id) VALUES (?, ?, ?, ?)',
    [messageId, userId, content, channelId],
    (err) => {
      if (err) console.error('❌ Failed to log message deletion:', err);
      else console.log(`📦 Logged message deletion for message ID: ${messageId}`);
    }
  );
}

// === REACTION ADD/REMOVE LOGGING ===
function logReaction(messageId, userId, emoji, action) {
  connection.query(
    'INSERT INTO reaction_logs (message_id, user_id, emoji, action) VALUES (?, ?, ?, ?)',
    [messageId, userId, emoji, action], // action: 'add' or 'remove'
    (err) => {
      if (err) console.error('❌ Failed to log reaction:', err);
      else console.log(`📦 Logged reaction ${action} for message ID: ${messageId}`);
    }
  );
}

// === MEMBER JOIN/LEAVE LOGGING ===
function logMemberAction(userId, username, action, guildId) {
  connection.query(
    'INSERT INTO member_logs (user_id, username, action, guild_id) VALUES (?, ?, ?, ?)',
    [userId, username, action, guildId], // action: 'join' or 'leave'
    (err) => {
      if (err) console.error('❌ Failed to log member action:', err);
      else console.log(`📦 Logged member ${action} for user: ${username}`);
    }
  );
}

// === ROLE CHANGE LOGGING ===
function logRoleChange(userId, username, roleId, roleName, action, guildId) {
  connection.query(
    'INSERT INTO role_changes (user_id, username, role_id, role_name, action, guild_id) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, username, roleId, roleName, action, guildId], // action: 'add' or 'remove'
    (err) => {
      if (err) console.error('❌ Failed to log role change:', err);
      else console.log(`📦 Logged role ${action} for user: ${username} role: ${roleName}`);
    }
  );
}

// === VOICE STATE UPDATE LOGGING ===
function logVoiceStateUpdate(userId, username, guildId, channelId, action) {
  connection.query(
    'INSERT INTO voice_state_logs (user_id, username, guild_id, channel_id, action) VALUES (?, ?, ?, ?, ?)',
    [userId, username, guildId, channelId, action], // action examples: 'join', 'leave', 'mute', 'unmute', 'deaf', 'undeaf'
    (err) => {
      if (err) console.error('❌ Failed to log voice state update:', err);
      else console.log(`📦 Logged voice state update: ${action} for user: ${username}`);
    }
  );
}

module.exports = {
  connection,
  logErrorToDatabase,
  logBotEvent,
  logCommandUsage,
  logMessageEdit,
  logDirectMessage,
  logMessageDeletion,
  logReaction,
  logMemberAction,
  logRoleChange,
  logVoiceStateUpdate,
};
