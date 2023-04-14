import { CommandInteraction } from "discord.js";

module.exports = {
    name: "space",
    description: "⭐ Don't know how to use me? Help commend!",
    ownerOnly: false,

    run: async (client: any, interaction: CommandInteraction) => {
        const Embed = {
            color: 0x0099ff,
            title: "Star Seeker Commands",
            description: "Here are the available commands:\n",
            fields: [
                {
                  name: '⭐ `apod`',
                  value: 'Astronomy Picture of the Day! You can add a date parameter to get the APOD from a specific day.',
                },
                {
                  name: '⭐ `image`',
                  value: 'Find an image from NASA\'s library.',
                },
                {
                  name: '⭐ `iss`',
                  value: 'Get the current location of the International Space Station.',
                },
                {
                  name: '⭐ `neo`',
                  value: 'Get Near Earth Objects! You can add a date parameter to get NEO information from a specific day.',
                },
                {
                  name: '⭐ `people`',
                  value: 'Get the current people in space, sorted by spacecraft!',
                },
                {
                  name: '⭐ `black_hole`',
                  value: 'Delete a specified number of messages from the current channel.',
                },
              ],
              
            footer: {
                text: "Bot created by DontAskForAnything aka Misiu#9870",
            },
        };
        await interaction.reply({ embeds: [Embed], ephemeral: true });
    },
};
