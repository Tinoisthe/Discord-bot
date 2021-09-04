module.exports = {
    name: 'leave',
    aliases:['leave'],
    describe: 'makes bot leave channel.',
    permission: ["CONNECT","SPEAK"],
    async execute(client, message, args, cmd, Discord) {
        const voiceChannel = message.member.voice.channel;
        message.channel.send('leaving channel :smiling_face_with_tear:')
        await voiceChannel.leave();
       
    }



}