
module.exports = {
    name: 'newEmbed',
    description: "newEmbed",
     execute(message, args, Discord){
const newembed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('Tino')
.setURL('kickassanime.rs')
.setAuthor('Tino', '', '')
.setDescription('This is Tino bots ')
.setThumbnail('')
.addFields(
    { name: 'Regular field title', value: 'Some value here' },
    { name: '\u200B', value: '\u200B' },
    { name: 'do not break the Fucking bot', value: 'Waring you', inline: true },
    { name: 'Inline field title', value: 'Some value here', inline: true },
)
.addField('Inline field title', 'Some value here', true)
.setImage('https://i.imgur.com/wSTFkRM.png')
.setFooter('look at rules', 'https://i.imgur.com/wSTFkRM.png');
message.channel.send(newembed);


}

}
 