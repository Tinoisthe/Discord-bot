const Discord = require('discord.js')
const profileModel = require("../models/rollSchema");
module.exports = {
    name: 'roll',
    description: 'Roll a dice of any size',
    category:'fun',
    usage: '[num]',
    async execute(client,message, args, cmd, Discord) { 
        var num = 6;
        if(args != ""){
            if(!isNaN(args)){
                num = parseInt(args);
            }else{
                message.channel.send(`"${args}" Is Not A Numeber`)
                return
            }
        if(num > 100) return message.channel.send(`"${args}" Is too large of a Number \n The biggest roll you can do is 100`)
        if(num < 0) return message.channel.send(`"${args}" Is too small of a Number \n The smallest roll you can do is 0`)
    }

        const embed = new Discord.MessageEmbed()
        .setColor('#304281')
                        .setTitle('🎲Die Roll🎲')
                        .setThumbnail("https://cdn.discordapp.com/attachments/715192953957515346/731653756835463178/ElatedImpartialArmadillo-max-1mb.gif")
                        .setDescription(`You rolled a ${num} sided die`)
                        .addField(`You got:`,`${(Math.floor(Math.random() * num)+1)}`)
                        .setFooter(`You can roll any number just put a number at the end of roll`)
        message.channel.send(embed);
               
    }
}