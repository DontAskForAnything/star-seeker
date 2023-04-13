const { Client, Collection, Intents } = require('discord.js');
const Discord = require('discord.js');
require('dotenv').config();

const loader = require('./loader');

const myIntents = new Intents();
myIntents.add(
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
);

const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: myIntents
});

module.exports = client;

client.discord = Discord;
client.commands = new Collection();
client.slashCommands = new Collection();

loader.loadSlashCommands(client, "slashCommands");

loader.loadEvents(client, "events");

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: " + err);
});

process.on("unhandledRejection", (reason: any, promise) => {
    console.log("[REJECTION] Promise ", promise, " reason: ", reason.message);
});

client.login(process.env.BOT_TOKEN);
