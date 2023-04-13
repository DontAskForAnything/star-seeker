module.exports = {
    name: 'interaction',

    async execute(interaction: any, client: any) {
        if (!interaction.isCommand()) return;

        const command = client.slashCommands.get(interaction.commandName);

        if (!command) return interaction.reply({ content: 'This command do not exist!', ephemeral: true });
        
        command.run(client, interaction)
    }
}
