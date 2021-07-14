const Discord = require('discord.js');
require("dotenv").config();
const client = new Discord.Client();

const config = { 
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX

   };

const prefix = '^';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandfiles =fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandfiles){
    const command = require(`./commands/${file}`);
    // const command = require(./commands/${file});

    client.commands.set(command.name, command);
}

client.once('ready', () => {
 console.log('Haruhi Suzumiya is online!');
 client.user.setActivity('hentai with devil-senpai', { type: "PLAYING"});
});

client.on('message', (message) => {


    const command = args.shift().toLowerCase();

    if(command === 'devil'){
        message.channel.send('if u play shit and also shout on others when they play bad then what is the logic in it, THINK VALI THINK'); 

    } else if(command === 'ping'){
        message.channel.send('ding dong!');

      } else if(command === 'ban'){execute(message, args);
            client.commands.get('ban')
    }
})



client.login(process.env.token);