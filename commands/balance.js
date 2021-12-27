module.exports = {
    name: "balance",
    aliases: ["bal", "bl"],
    permissions: [],
    description: "Check the user balance",
   async execute(client, message, args, cmd, Discord, profileData) {
      message.channel.send(`Your wallet bal is ${profileData.coins}, you banks bal is ${profileData.bank}`);
    },
  };
  