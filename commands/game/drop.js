const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
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
            const messageContent = `Oh, ${interaction.user.username}! Here's your card: ${myImage}.`;
            
            await interaction.editReply({
              content: messageContent,
              files: [`C:/Users/ASUS/Desktop/crashofcars-bot/commands/game/cards/${myImage}`]
            });
          } catch (error) {
            console.error('An error occurred:', error);
          }
      },
        
};