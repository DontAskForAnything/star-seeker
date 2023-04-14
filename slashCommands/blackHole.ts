import { CommandInteraction, TextChannel, GuildMember } from "discord.js";

module.exports = {
  name: "black_hole",
  description: "⭐ Delete a specified number of messages from the current channel.",
  ownerOnly: false,
  options: [
    {
      name: "number",
      description: "The number of messages to delete. Maximum is 100.",
      type: "INTEGER",
      required: true,
    },
  ],

  run: async (client: any, interaction: CommandInteraction) => {
    // Get the number of messages to delete from the user's input
    const deleteCount = interaction.options.getInteger("number");

    // Check if the number of messages is valid
    if (!deleteCount || deleteCount <= 0 || deleteCount > 100) {
      // If the number of messages is not valid, reply to the user with an error message
      interaction.reply({ content: "Invalid number. Number must be between (1-100)", ephemeral: true, });
      return;
    }

    // Check if the command is being used in a text channel
    if (interaction.channel?.type !== "GUILD_TEXT") {
      // If the command is not being used in a text channel, reply to the user with an error message
      interaction.reply({ content: "This command can only be used in a text channel.", ephemeral: true, });
      return;
    }

    // Get the channel and member objects from the interaction object
    const channel = interaction.channel as TextChannel;
    const member = interaction.member as GuildMember;

    // Check if the user has permission to delete messages
    if (!channel.permissionsFor(member)?.has("MANAGE_MESSAGES")) {
      // If the user doesn't have permission, reply to the user with an error message
      interaction.reply({ content: "You do not have permission to use this command.", ephemeral: true, });
      return;
    }

    try {
      // Bulk delete messages from the channel
      const messages = await channel.bulkDelete(deleteCount);
      // Reply to the user with the number of messages that were deleted
      interaction.reply({ content: `Deleted \`${messages?.size}\` messages.`, ephemeral: true, });
    } catch (error:any) {
      // Handle errors that occur during message deletion
      console.error(error);
      interaction.reply({ content: "An error occurred while trying to delete the messages.", ephemeral: true, });
    }
  },
};
