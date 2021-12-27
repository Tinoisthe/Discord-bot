module.exports = {
  name: 'leave',
  aliases:['leave'],
  describe: 'makes bot leave channel.',
  permissions: ["CONNECT","SPEAK"],
  async execute(client, message, args, cmd, Discord) {
    const voiceChannel = message.member.voice.channel;
    const connection = await voiceChannel.join()
    setTimeout(() => {
       voiceChannel.leave();
    message.channel.send('leaving channel :smiling_face_with_tear:')
    }, 1600)
   
    console.log('Disconnected from voice!');
}


  }