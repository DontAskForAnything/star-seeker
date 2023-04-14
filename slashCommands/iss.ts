import { CommandInteraction } from "discord.js";
import { issData } from "../utils/axios";
import { ISSPosition } from "../interfaces";
import { createISSPositionEmbed } from "../utils/embeds";

module.exports = {
    name: "iss",
    description: "⭐ Get current location of ISS",
    ownerOnly: false,

    run: async (client: any, interaction: CommandInteraction) => {
        // Send a loading message to indicate the command is being processed
        await interaction.reply({ content: "Loading...", ephemeral: true });

        try {
            // Retrieve the current position of the ISS from the API
            const response = await issData.get('/iss-now');
            const data: ISSPosition = response?.data;

            if (data) {
                // If data is available, create and send an embed with the current ISS position
                await interaction.editReply({ content: " ", embeds: [createISSPositionEmbed(data)] });
            } else {
                // If data is not available, send an error message
                await interaction.editReply({ content: 'Hmmm... something went wrong during retrieving the data.' });
            }
        } catch (error: any) {
            // Handle errors
            await interaction.editReply({ content: "Something went wrong while getting ISS position, try again later!" });
            console.error(error);
        }
    }
};
