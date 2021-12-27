const Discord = require('discord.js')
module.exports = {
    name: 'random',
    description: 'gets a number between two numbers',
    category:'fun',
    usage: '[num] [num]',
    async execute(client,message, args, cmd, Discord) { 
        var num1 = 1;
        var num2 = 10;
        if(args != ""){
            if(args[1] == undefined)return message.channel.send("missing the second number")
            if(!isNaN(args[0])){
                num1 = parseInt(args[0]);
            }else{
                message.channel.send(`"${args[0]}" Is Not A Number`)
                return
            }
            if(!isNaN(args[1])){
                num2 = parseInt(args[1]);
            }else{
                message.channel.send(`"${args[1]}" Is Not A Number`)
                return
            }
            if(E(message,check(num1,message),num1)==false)return
            if(E(message,check(num2,message),num2)==false)return
            if(num1>=num2)return message.channel.send(" the first number cannot be larger or equal to the second number")
            
    }

        const embed = new Discord.MessageEmbed()
        .setColor('#304281')
                        .setTitle('Random Number')
                        .setDescription(`A number between ${num1} and ${num2}`)
                        .addField(`You got:`,`${(Math.floor(Math.random() * (num2-num1+1))+num1)}`)
                        .setFooter(`after >random type two numbers to give a range try 1 100`)
                        .addField('Developer Team: ','<@412011486953865227>')
        message.channel.send(embed);
               
    }
}
function check(num){
    if(num > 10000) return (1)
    if(num < 1) return (2)
}
function E(message,data,num){
    if(data == 1){message.channel.send(`"${num}" Is too large of a Number \n The biggest number you can do is 10000`);return (false)}
    if(data == 2){message.channel.send(`"${num}" Is too small of a Number \n The smallest number you can do is 0`);return (false)}
}