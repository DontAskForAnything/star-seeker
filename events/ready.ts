module.exports = {
    name: 'ready', 
    once: true,

    async execute(client: any) { 
        client.user.setActivity('Use /space for help!', { type: 'LISTENING' }); 
        
        console.log(`⭐ ${client.user.tag} started!`);
        console.log(`⭐ Active servers:${client.guilds.cache.size}!`);
    }
}
