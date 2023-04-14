import { CommandInteraction } from "discord.js";
import { imagesSearch } from "../utils/axios";
import { createImageEmbed } from "../utils/embeds";

module.exports = {
    name: "image",
    description: "⭐ Find space img from NASA library",
    ownerOnly: false,
    options: [
        {
            name: "query",
            description: "What are you looking for?",
            type: "STRING",
            required: true,
        },
    ],

    run: async (client: any, interaction: CommandInteraction) => {
        // Send a loading message to indicate the command is being processed
        await interaction.reply({ content: "Loading...", ephemeral: true });

        try {
            // Get the "query" option from the user's input
            const query = interaction.options.getString("query");

            // Call the images API with the user's query
            const response = await imagesSearch.get("/search", { params: { q: query } });

            // Get the first search result from the response
            const searchData = response?.data?.collection?.items?.[0];

            // If there is a search result and a query was provided, send an embed with the image
            if (searchData && query) {
                await interaction.editReply({
                    content: " ",
                    embeds: [createImageEmbed(query, searchData)],
                });
            } else {
                // If there is no search result or no query was provided, send an error message
                await interaction.editReply({
                    content: "Hmmm... something with API is wrong.",
                });
            }
        } catch (error: any) {
            // Handle errors
            await interaction.editReply({
                content: "Something went wrong while finding images, try again later!",
            });
            console.error(error);
        }
    },
};
