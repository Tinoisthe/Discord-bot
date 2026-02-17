// whole code need updating as 30% of the time it logs then jt slowlyy logs after 


// utils/logger.js
const mysql = require('mysql2');

// Setup connection need to move to the DB 
const connection = mysql.createConnection({
    host: '23.150.161.140',
    user: 'neonnext2_Tino',
    password: 'Sj@593707s',
    database: 'neonnext2_logs',
    charset: 'utf8mb4'
});

connection.connect(err => {
    if (err) {
        console.error('❌ Error connecting to MySQL:', err.stack);
    } else {
        console.log('✅ Connected to MySQL as id ' + connection.threadId);
    }
});

// Helper: safe query
function safeQuery(query, params, description = 'Query') {
    connection.query(query, params, (err) => {
        if (err) console.error(`❌ Failed to execute ${description}:`, err);
        else console.log(`📦 ${description} logged successfully.`);
    });
}

// === ERROR LOGGING ===
function logErrorToDatabase(error, eventType = 'unhandled') {
    try {
        const message = error?.message || String(error);
        const stack = error?.stack || 'No stack trace';
        safeQuery(
            'INSERT INTO bot_errors (error_message, stack_trace, event_type) VALUES (?, ?, ?)',
            [message, stack, eventType],
            `Error (${eventType})`
        );
    } catch (e) {
        console.error('❌ Exception in logErrorToDatabase:', e);
    }
}

// === BOT EVENT LOGGING ===
function logBotEvent(event, details = '') {
    try {
        safeQuery(
            'INSERT INTO bot_status_logs (event, details) VALUES (?, ?)',
            [event, details],
            `Bot event: ${event}`
        );
    } catch (e) {
        console.error('❌ Exception in logBotEvent:', e);
    }
}

// === COMMAND USAGE LOGGING ===
function logCommandUsage(userId, username, commandName, guildId = null) {
    try {
        safeQuery(
            'INSERT INTO command_logs (user_id, username, command_name, guild_id) VALUES (?, ?, ?, ?)',
            [userId, username, commandName, guildId],
            `Command usage: ${commandName} by ${username}`
        );
    } catch (e) {
        console.error('❌ Exception in logCommandUsage:', e);
    }
}

// === MESSAGE EDIT LOGGING ===
function logMessageEdit(messageId, userId, oldContent, newContent) {
    try {
        safeQuery(
            'INSERT INTO message_edits (message_id, user_id, old_content, new_content) VALUES (?, ?, ?, ?)',
            [messageId, userId, oldContent, newContent],
            `Message edit for ID: ${messageId}`
        );
    } catch (e) {
        console.error('❌ Exception in logMessageEdit:', e);
    }
}

// === DIRECT MESSAGE LOGGING ===
function logDirectMessage(userId, username, message) {
    try {
        safeQuery(
            'INSERT INTO dm_logs (user_id, username, message) VALUES (?, ?, ?)',
            [userId, username, message],
            `DM from ${username}`
        );
    } catch (e) {
        console.error('❌ Exception in logDirectMessage:', e);
    }
}

// === MESSAGE DELETION LOGGING ===
function logMessageDeletion(messageId, userId, content, channelId) {
    try {
        safeQuery(
            'INSERT INTO message_deletions (message_id, user_id, content, channel_id) VALUES (?, ?, ?, ?)',
            [messageId, userId, content, channelId],
            `Message deletion for ID: ${messageId}`
        );
    } catch (e) {
        console.error('❌ Exception in logMessageDeletion:', e);
    }
}

// === REACTION ADD/REMOVE LOGGING ===
function logReaction(messageId, userId, emoji, action) {
    try {
        safeQuery(
            'INSERT INTO reaction_logs (message_id, user_id, emoji, action) VALUES (?, ?, ?, ?)',
            [messageId, userId, emoji, action],
            `Reaction ${action} for message ID: ${messageId}`
        );
    } catch (e) {
        console.error('❌ Exception in logReaction:', e);
    }
}

// === MEMBER JOIN/LEAVE LOGGING ===
function logMemberAction(userId, username, action, guildId) {
    try {
        safeQuery(
            'INSERT INTO member_logs (user_id, username, action, guild_id) VALUES (?, ?, ?, ?)',
            [userId, username, action, guildId],
            `Member ${action} for ${username}`
        );
    } catch (e) {
        console.error('❌ Exception in logMemberAction:', e);
    }
}

// === ROLE CHANGE LOGGING ===
function logRoleChange(userId, username, roleId, roleName, action, guildId) {
    try {
        safeQuery(
            'INSERT INTO role_changes (user_id, username, role_id, role_name, action, guild_id) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, username, roleId, roleName, action, guildId],
            `Role ${action} for ${username} (${roleName})`
        );
    } catch (e) {
        console.error('❌ Exception in logRoleChange:', e);
    }
}

// === VOICE STATE UPDATE LOGGING ===
function logVoiceStateUpdate(userId, username, guildId, channelId, action) {
    try {
        safeQuery(
            'INSERT INTO voice_state_logs (user_id, username, guild_id, channel_id, action) VALUES (?, ?, ?, ?, ?)',
            [userId, username, guildId, channelId, action],
            `Voice state update ${action} for ${username}`
        );
    } catch (e) {
        console.error('❌ Exception in logVoiceStateUpdate:', e);
    }
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
