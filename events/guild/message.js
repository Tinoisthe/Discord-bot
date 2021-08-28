module.exports = (Discord, client, message) => {
    const prefix = '>';
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    if(cmd.length===0) return; //return if it's only prefix without command
    let command = client.commands.get(cmd) //get command from command folder
    || client.commands.get(client.aliases.get(cmd)); //get command if command's alias is used
    if(command) command.execute(client, message, args, cmd, Discord);
}