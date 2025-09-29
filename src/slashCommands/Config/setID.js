const { SlashCommandBuilder, PermissionsBitField, MessageFlags, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-id')
        .addStringOption(option =>
            option.setName('channel-type').addChoices(
                { name: 'Suggestion Channel', value: 'suggestion' },
                { name: 'Logging Channel', value: 'logging' },
                { name: 'Suggestion Approval Channel', value: 'approval' },
            )
                .setDescription('The type of channel to set.')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('channel').setDescription('The channel to set.').setRequired(true).addChannelTypes([ChannelType.GuildText])
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription('Set the ID for the channels.'),
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const channelType = interaction.options.getString('channel-type');
        const channel = interaction.options.getChannel('channel');

        try {
            switch (channelType) {
                case 'suggestion':
                    await client.db.prepare("UPDATE serverChannels SET suggestionChannel = ? WHERE id = 1").run(channel.id);
                    client.suggestionChannel = channel;
                    break;
                case 'logging':
                    await client.db.prepare("UPDATE serverChannels SET loggingChannel = ? WHERE id = 1").run(channel.id);
                    client.loggingChannel = channel;
                    break;
                case 'approval':
                    await client.db.prepare("UPDATE serverChannels SET suggestionApprovalChannel = ? WHERE id = 1").run(channel.id);
                    client.suggestionApprovalChannel = channel;
                    break;
                default:
                    return interaction.reply({ content: 'Invalid channel type.', flags: MessageFlags.Ephemeral });
            }

            return interaction.reply({ content: `Successfully set the ${channelType} channel to <#${channel.id}>.`, flags: MessageFlags.Ephemeral });
        } catch (err) {
            console.error("[DB ERROR]", err);
            return interaction.reply({ content: 'There was an error while accessing the database.', flags: MessageFlags.Ephemeral });
        }
    },
};
