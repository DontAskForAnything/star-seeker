// Importing necessary modules
const { Client, Collection, Intents } = require('discord.js');
const Discord = require('discord.js');
require('dotenv').config();

// Importing custom module
const loader = require('./loader');

// Define the intents to be used
const myIntents = new Intents();
myIntents.add(
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
);

// Client configuration
const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: myIntents
});

// Exporting client for use in other modules
module.exports = client;

// Setting fields for the client object
client.discord = Discord; // Assigning the Discord.js module to the client object
client.commands = new Collection(); // Creating an empty collection to hold commands
client.slashCommands = new Collection(); // Creating an empty collection to hold slash commands

// Loading all slash commands
loader.loadSlashCommands(client, "slashCommands");

// Loading all events
loader.loadEvents(client, "events");

// Error handling
process.on("uncaughtException", (err) => {
    // console.log("Uncaught Exception: " + err);
    console.log("CHUJH");
});

process.on("unhandledRejection", (reason: any, promise) => {
    console.log("[REJECTION] Promise ", promise, " reason: ", reason.message);
});

// Logging the bot into Discord
client.login(process.env.BOT_TOKEN);
