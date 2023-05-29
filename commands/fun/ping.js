const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
        await wait(2000);
        await interaction.editReply('Never Gonna Give You Up');
        await wait(4000);
        await interaction.editReply('hehe u got ||rickrolled!||');
        await interaction.followUp({ content: 'now cry about it!', ephemeral: true});
    },
};