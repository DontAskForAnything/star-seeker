const fs = require("node:fs");

/**
 * Loads all slash commands in the specified folder and sets them for the client application.
 * @param {Client} client The Discord.js client object.
 * @param {string} folderName The name of the folder containing the slash command files.
 */
const loadSlashCommands = async function (client: any, folderName: any) {
    let slashCommands: any[] = [];

    // Read all files in the folder that end with ".ts"
    const commandFiles = fs
        .readdirSync(`./${folderName}`)
        .filter((file: string) => file.endsWith(".ts"));

    // For each file, require and add the command to the client's collection
    for (const file of commandFiles) {
        const command = require(`./${folderName}/${file}`);

        client.slashCommands.set(command.name, command);
        slashCommands.push(command)
    }

    // Once the client is ready, set the loaded slash commands
    client.on("ready", async () => {
        await client.application.commands.set(slashCommands);
        console.log(`Loaded ${slashCommands.length} slash commands.`);
    });
};

/**
 * Loads all event files in the specified folder and sets them to the client object.
 * @param {Client} client The Discord.js client object.
 * @param {string} folderName The name of the folder containing the event files.
*/
const loadEvents = async function (client: any, folderName: any) {
    // Read all files in the folder that end with ".ts"
    const eventFiles = fs
        .readdirSync(`./${folderName}`)
        .filter((file: string) => file.endsWith(".ts"));

    // For each file, require and add the event to the client
    for (const file of eventFiles) {
        const event = require(`./${folderName}/${file}`);

        // console.log(`Event ${file} loaded.`);

        // Check if the event is a one-time event or not
        if (event.once) {
            // If it's a one-time event, add a listener using client.once
            client.once(event.name, (...args: any) => event.execute(...args, client));
        } else {
            // If it's not a one-time event, add a listener using client.on
            client.on(event.name, (...args: any) => event.execute(...args, client));
        }
    }
}

// Export the functions
module.exports = {
    loadEvents,
    loadSlashCommands,
};
