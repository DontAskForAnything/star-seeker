module.exports = {
    name: 'interaction', // Name of the event

    // This function is executed when an interaction occurs (i.e. a user interacts with a slash command)
    async execute(interaction: any, client: any) {

        // Check if the interaction is a command
        if (!interaction.isCommand()) return;

        // Get the command from the client's slashCommands collection
        const command = client.slashCommands.get(interaction.commandName);

        // If the command doesn't exist, reply with an error message
        if (!command) return interaction.reply({ content: 'This command do not exist!', ephemeral: true });

        // Execute the command's run function with the client and interaction as arguments
        command.run(client, interaction)
    }
}
