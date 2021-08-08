module.exports = {
    name: 'new',
    description: "Sets up a reaction role message!",
    execute(client,message, args, Discord) { 
const newEmbed = new Discord.MessageEmbed()
.setColor('#304281')
.setTitle('Rules')
	.setAuthor('Anime Archive', 'https://pbs.twimg.com/media/EcVoipsXQAUiP_N?format=jpg&name=medium')
.addFields(
    {name: 'Rule 1', value: 'All users must abide by the Discord ToS and community guidelines.'},
    {name: 'Rule 2', value: 'Do not discriminate or be disrespectful to users of our server. We do not accept the use of racial slurs or any pejorative terms that could be aimed at a specific group of people. A bad word filter is in place and attempts to bypass it are not tolerated.'},
    {name: 'Rule 3', value: 'Do not attempt to spam or flood channels(including emotes).'},
    {name: 'Rule 4', value: 'Do not attempt to create drama.'},
    {name: 'Rule 5', value: 'Offensive or NSFW avatars, names, and statuses are not tolerated.'},
    {name: 'Rule 6', value: 'Only ENGLISH is allowed in text-channels (except #international-chat).'},
    {name: 'Rule 7', value: 'Do not use alternative accounts to cause problems, get ahead in any games, or avoid punishments. Do not create alt accounts for other users attempting to avoid punishments.'},
    {name: 'Rule 8', value: 'Do not advertise or promote other servers without permission from a staff member. '},
    {name: 'Rule 9', value: 'Do not spam mentions of roles, mass mention, or ping large roles.'},
    {name: 'Rule 10', value: ' Do not disrespect any staff member. They are here to help!'},
    {name: 'Rule 11', value: 'Mutes, kicks and bans are entirely up to staff discretion. We reserve the right to ban for anything we forgot to list here.'},
    {name: 'Rule 12', value: 'Any messages that possess spoilers must include spoiler bars that can be used by typing "/spoiler" before the message or by putting "||" on both sides of the message. All spoilers must inlude a description of what the spoiler is about, outside of the spoiler bars.'},
    {name: 'Rule 13', value: 'Do not share any personal information of yourselves or others on the server.'},
    {name: 'Rule 14', value: 'The use of self bots is prohibited.'},
    {name: 'Rule 15', value: ' Do not impersonate staff.'},
)
.setImage('https://pbs.twimg.com/media/EcVnwmhWAAAgekx?format=jpg&name=large')
.setFooter('make sure to read Rules')
message.channel.send(newEmbed);
    }


    }