import { CommandInteraction } from "discord.js";
import { nasaApi } from "../utils/axios";
import { isValidDate, currentDay } from "../utils/date";
import { createNeoEmbed } from "../utils/embeds";

module.exports = {
    name: "neo",
    description: "⭐ Near Earth Objects",
    ownerOnly: false,
    options: [
        {
            name: "date",
            description: "The date for which to retrieve data in YYYY-MM-DD format. Default: today's date",
            type: "STRING",
            required: false,
        },
    ],

    run: async (client: any, interaction: CommandInteraction) => {
        // Send a loading message to indicate the command is being processed
        await interaction.reply({ content: "Loading...", ephemeral: true });

        try {
            // Get the date parameter from the interaction options, or use the current date if not provided or invalid
            const dateParam = interaction.options.getString("date");
            const date = dateParam && isValidDate(dateParam) ? dateParam : currentDay();

            // Retrieve near earth object data for the specified date from API
            const response = await nasaApi.get('/neo/rest/v1/feed', { params: { start_date: date, end_date: date } });
            const neoData = response?.data?.near_earth_objects?.[`${date}`];

            // If the data was successfully retrieved, create and send an embed with the data
            if (neoData) {
                await interaction.editReply({ content: " ", embeds: [createNeoEmbed(date, neoData)] });
            } else {
                // If the data could not be retrieved, send an error message
                await interaction.editReply({ content: 'Hmmm... something went wrong during retrieving the data.' });
            }
        } catch (error: any) {
            // Handle errors
            await interaction.editReply({ content: "Something went wrong while getting NEO objects, try again later!" });
            console.error(error);
        }
    },
};
