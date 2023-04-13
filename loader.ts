const fs = require("node:fs");

const loadSlashCommands = async function (client: any, folderName: any) {
    let slashCommands: any[] = [];
    const commandFiles = fs
        .readdirSync(`./${folderName}`)
        .filter((file: string) => file.endsWith(".ts"));

    for (const file of commandFiles) {
        const command = require(`./${folderName}/${file}`);

        client.slashCommands.set(command.name, command);
        slashCommands.push(command);
    }

    client.on("ready", async () => {
        await client.application.commands.set(slashCommands);
        console.log(`Loaded ${slashCommands.length} slash commands.`);
    });
};

const loadEvents = async function (client: any, folderName: any) {
    const eventFiles = fs
        .readdirSync(`./${folderName}`)
        .filter((file: string) => file.endsWith(".ts"));

    for (const file of eventFiles) {
        const event = require(`./${folderName}/${file}`);
        if (event.once) {
            client.once(event.name, (...args: any) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args: any) => event.execute(...args, client));
        }
    }
}


module.exports = {
    loadEvents,
    loadSlashCommands,
};