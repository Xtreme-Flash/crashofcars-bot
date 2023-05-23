//require the necessary discord classes.
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');

//creating new client instance.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFile = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

client.once(Events.ClientReady, c => {
    console.log('Ready! Logged in as ${c.user.tag}');
});

client.login(token);