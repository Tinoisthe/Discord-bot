module.exports = {
    name: 'leave',
    aliases:['leave'],
    describe: 'makes bot leave channel.',
    async execute(client, message, args, cmd, Discord) {
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to stop music!");
        await voiceChannel.leave();
        await message.channel.send('leaving channel :smiling_face_with_tear:')
    }



}