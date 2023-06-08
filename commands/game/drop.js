const { SlashCommandBuilder,ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { execute } = require('../moderation/ban');
const fs = require('node:fs');
const path = require('path');
const { channel } = require('node:diagnostics_channel');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('drop')
        .setDescription('drop a random car card'),
        
        async execute (interaction) {

        try {
            await interaction.deferReply(); // Defer the reply to acknowledge the interaction
        
            const idx = (len) => Math.floor(Math.random() * len);
            const files = fs.readdirSync('C:/Users/ASUS/Desktop/crashofcars-bot/commands/game/cards/');
            const myImage = files[idx(files.length)];
            const messageContent = `Oh, ${interaction.user.username}! you got the ${myImage}.`;
            
            const acceptButton = new ButtonBuilder()
              .setCustomId('accept')
              .setLabel('Accept')
              .setStyle(ButtonStyle.Success);

            const skipButton = new ButtonBuilder()
              .setCustomId('skip')
              .setLabel('Skip')
              .setStyle(ButtonStyle.Secondary);

            const row = new ActionRowBuilder()
              .setComponents(acceptButton,skipButton);  

            const response = await interaction.editReply({
              files: [`C:/Users/ASUS/Desktop/crashofcars-bot/commands/game/cards/${myImage}`],
              components: [row],
              content: messageContent,
            });

            const collectorFilter = i => i.user.id === interaction.user.id;

            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

            if (confirmation.customId === 'accept') {
              await confirmation.update({ content: `${interaction.user.username} took the ${myImage}.`, components: [] });
            } else if (confirmation.customId === 'skip') {
              await confirmation.update({ content: `skipped!` ,components: [] });
            }

          } catch (error) {
            console.error('An error occurred:', error);
          }
      },
        
};