import { CommandInteraction } from "discord.js";
import { nasaApi } from "../utils/axios";
import { isValidDate } from "../utils/date";
import { createApodEmbed } from "../utils/embeds";

module.exports = {
    name: "apod",
    description: "⭐ Astronomy Picture of the Day",
    ownerOnly: false,
    options: [
        {
            name: "date",
            description: "The date of the Astronomy Picture of the Day in YYYY-MM-DD format. Default: today's date",
            type: "STRING",
            required: false,
        },
    ],

    run: async (client: any, interaction: CommandInteraction) => {
        try {
            // Get the date parameter from the user's input
            const dateParam = interaction.options.getString("date");

            // If the user specified a date, check if it's a valid date
            if (dateParam) {
                if (isValidDate(dateParam)) {
                    // If the date is valid, call the APOD API with the specified date
                    const response = await nasaApi.get('/planetary/apod', { params: { start_date: dateParam, end_date: dateParam } });
                    // Send the response as an embed message to the user
                    await interaction.reply({ embeds: [createApodEmbed(response.data[0])], ephemeral: true });

                    return;
                }
                // If the date is not valid, reply to the user with an error message
                await interaction.reply({ content: `Given date is not valid.`, ephemeral: true });
                return;
            }

            // If the user didn't specify a date, call the APOD API with today's date
            const response = await nasaApi.get('/planetary/apod');
            // Send the response as an embed message to the user
            await interaction.reply({ embeds: [createApodEmbed(response.data)], ephemeral: true });
        } catch (error: any) {
            // Handle errors
            if (error.response && error.response.status === 400) {
                await interaction.reply({ content: error.response.data.msg, ephemeral: true });
            } else {
                await interaction.reply({ content: "Something went wrong while getting apod, try again later!", ephemeral: true });
            }
            console.error(error);
        }
    },
};
