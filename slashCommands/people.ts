import { CommandInteraction } from "discord.js";
import { issData } from "../utils/axios";
import { createPeopleEmbed } from "../utils/embeds";

module.exports = {
    name: "people",
    description: "⭐ Current people in space",
    ownerOnly: false,

    run: async (client: any, interaction: CommandInteraction) => {
        // Send a loading message to indicate the command is being processed
        await interaction.reply({ content: "Loading...", ephemeral: true });
        try {
            // Retrieve data about people in space from API    
            const response = await issData.get('/astros');
            const data = response?.data;

            // If the data was successfully retrieved, create and send an embed
            if (data) {
                await interaction.editReply({ content: " ", embeds: [createPeopleEmbed(data)] });
            } else {
                // If the data could not be retrieved, send an error message
                await interaction.editReply({ content: 'Hmmm... something went wrong.' });
            }
        } catch (error: any) {
            // Handle errors
            await interaction.editReply({ content: "Something went wrong while getting data, try again later!" });
            console.error(error);
        }
    },
};
