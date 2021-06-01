const commando = require("discord.js-commando");

class DiceRollCommand extends commando.Command {
	constructor() {
		super(client, {
			name: "roll",
			group: "random",
			memberName: "roll",
			description: "Rolls a die"
	});
	}
	
	async run(message, args) {
		var roll = Math.floor(Math.random(0, 30) * 6) + 1;
		message.reply("You rolled a " + roll);
		
	}
	
}

module.exports = DiceRollCommand;