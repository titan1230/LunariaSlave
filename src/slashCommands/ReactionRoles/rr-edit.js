const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    PermissionFlagsBits
} = require('discord.js');

const { ageContainer, devicesContainer, genderContainer, pingsContainer } = require('../../constants/ReactionRoles.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('edit-rr')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => option.setName('messageid').setDescription('The ID of the message to edit').setRequired(true))
        .addIntegerOption(option => option.setName('part').addChoices(
            { name: 'Part 1', value: 1 },
            { name: 'Part 2', value: 2 }
        ).setDescription('Select which part to edit').setRequired(true))
        .setDescription('Sends the reaction roles message.'),
    /**
     * @param {import('discord.js').CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const option = interaction.options.getString('messageid').split('-');

        if (option.length !== 2) {
            return interaction.reply({ content: 'Please provide the message ID in the format: channelID-messageID', ephemeral: true });
        }

        const channelID = option[0];
        const messageID = option[1];

        const part = interaction.options.getInteger('part');

        const channel = await interaction.guild.channels.fetch(channelID).catch(() => null);
        if (!channel || channel.type !== 0) {
            return interaction.reply({ content: 'Invalid channel ID or the channel is not a text channel.', ephemeral: true });
        }

        const message = await channel.messages.fetch(messageID).catch(() => null);
        if (!message) {
            return interaction.reply({ content: 'Message not found. Please ensure the message ID is correct and the message is in the specified channel.', ephemeral: true });
        }

        if (message.author.id !== process.env.CLIENTID) {
            return interaction.reply({ content: 'I can only edit messages that I have sent.', ephemeral: true });
        }

        if (part === 1) {
            await message.edit({ components: [genderContainer, ageContainer] });
        } else if (part === 2) {
            await message.edit({ components: [devicesContainer, pingsContainer] });
        }

        await interaction.reply({ content: 'Reaction roles message updated successfully!', ephemeral: true });
    }
};      