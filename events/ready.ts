module.exports = {
    name: 'ready', // Name of the event
    once: true, // Indicates that this event should only be executed once

    // This function is executed once after the bot has started.
    async execute(client: any) { // Function to be executed when the event occurs
        client.user.setActivity('Use /space for help!', { type: 'LISTENING' }); // Set the bot's activity to "Use /space for help!" and display "LISTENING" status
        
        console.log(`⭐ ${client.user.tag} started!`); // Log that the bot has started and display its username and tag
        console.log(`⭐ Active servers:${client.guilds.cache.size}!`); // Log the number of active servers that the bot is a part of
    }
}
