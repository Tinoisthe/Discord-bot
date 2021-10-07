module.exports = {
    name: 'leave',
    aliases:['leave','stop'],
    describe: 'makes bot leave channel.',
    permissions: ["CONNECT","SPEAK"],
    async execute(client, message, args, cmd, Discord) {
        if (message.content.startsWith(prefix + "leave")) {
            // check if the bot is connected to a voice channel
            if (message.guild.me.voiceChannel !== undefined) {
              message.guild.me.voiceChannel.leave();
              message.reply("I have successfully left the voice channel!");
            } else {
              message.reply("I'm not connected to a voice channel!");
            }
          }
       
    }



}