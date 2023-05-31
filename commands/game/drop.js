const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { execute } = require('../moderation/ban');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drop')
        .setDescription('drop a random car card'),

    async execute(interaction) {
        const idx = (len) => Math.floor(Math.random() * (len));

        // get all the files in the directory
        const files = fs.readdirSync('/cards/');

        // get file from directory
        const myImage = files[idx(files.length)];
        
        // send image to channel
        await interaction.send({ files: [`/cards/${myImage}`] });
    },
        
};