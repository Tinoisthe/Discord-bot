module.exports = (Discord, client, message) => {
    const prefix = '>';
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    if(cmd.length===0) return; //return if it's only prefix without command
    let command = client.commands.get(cmd) //get command from command folder
    || client.commands.get(client.aliases.get(cmd)); //get command if command's alias is used
    // In your command.js event file.
const validPermissions = [
  "CREATE_INSTANT_INVITE",
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "ADMINISTRATOR",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "ADD_REACTIONS",
  "VIEW_AUDIT_LOG",
  "PRIORITY_SPEAKER",
  "STREAM",
  "VIEW_CHANNEL",
  "SEND_MESSAGES",
  "SEND_TTS_MESSAGES",
  "MANAGE_MESSAGES",
  "EMBED_LINKS",
  "ATTACH_FILES",
  "READ_MESSAGE_HISTORY",
  "MENTION_EVERYONE",
  "USE_EXTERNAL_EMOJIS",
  "VIEW_GUILD_INSIGHTS",
  "CONNECT",
  "SPEAK",
  "MUTE_MEMBERS",
  "DEAFEN_MEMBERS",
  "MOVE_MEMBERS",
  "USE_VAD",
  "CHANGE_NICKNAME",
  "MANAGE_NICKNAMES",
  "MANAGE_ROLES",
  "MANAGE_WEBHOOKS",
  "MANAGE_EMOJIS",
]

if(command.permissions.length){
  let invalidPerms = []
  for(const perm of command.permissions){
    if(!validPermissions.includes(perm)){
      return console.log(`Invalid Permissions ${perm}`);
    }
    if(!message.member.hasPermission(perm)){
      invalidPerms.push(perm);
    }
  }
  if (invalidPerms.length){
    return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
  }
}




    if(command) command.execute(client, message, args, cmd, Discord);
}
