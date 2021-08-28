
    module.exports = {
        name: 'react',
        description: "Sets up a reaction role message!",
        async execute(client,message, args, cmd, Discord) { 
            const channel = '873832687482322954';
            const ArchiveMember = message.guild.roles.cache.find(role => role.name === "Archive  Member");
            const SuperArchive = message.guild.roles.cache.find(role => role.name === "Super Archive");
     
            const ArchiveMemberEmoji = '<:KAACuteAsHecc2:873210685885153281>';
            const SuperArchiveEmoji = '<:happicat:873207672307089418>';
     
            let embed = new Discord.MessageEmbed()
                .setColor('#e42643')
                .setTitle('Grab a role!')
                .setDescription('Pick some Roles!\n\n'
                    + `${ArchiveMemberEmoji} ArchiveMember\n`
                    + `${SuperArchiveEmoji} SuperArchive`);
     
            let messageEmbed = await message.channel.send(embed);
            messageEmbed.react(ArchiveMemberEmoji);
            messageEmbed.react(SuperArchiveEmoji);
     
            client.on('messageReactionAdd', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;
     
                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === ArchiveMemberEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add('Archive  Member');
                    }
                    if (reaction.emoji.name === SuperArchiveEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add('Super Archive');
                    }
                } else {
                    return;
                }
     
            });
     
            client.on('messageReactionRemove', async (reaction, user) => {
     
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;
     
     
                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === ArchiveMemberEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.remove('Archive Member');
                    }
                    if (reaction.emoji.name === SuperArchiveEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.remove('Super Archive');
                    }
                } else {
                    return;
                }
            });
        }
     
    }   