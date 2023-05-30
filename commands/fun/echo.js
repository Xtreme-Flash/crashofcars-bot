const { SlashCommandBuilder, Options } = require('discord.js');
const { execute } = require('./ping');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back')
			// Ensure the text will fit in an embed description, if the user chooses that option
			.setMaxLength(2000)),
	
    async execute(interaction) {
        const input = interaction.option.getString('input');
        await interaction.reply(input);
    },
};