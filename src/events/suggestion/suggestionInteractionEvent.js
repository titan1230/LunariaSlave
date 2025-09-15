const { EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
    sub: "SuggestionInteraction",
    name: 'interactionCreate',
    once: false,
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').ButtonInteraction} interaction
     */
    async execute(client, interaction) {
        if (!interaction.isButton()) return;

        const customID = interaction.customId;
        const message = interaction.message;

        if (customID === 'suggestion_accept') {
            const newEmbed = EmbedBuilder.from(message.embeds[0])
                .setColor('Green')
            interaction.reply({ content: 'Suggestion Approved', flags: MessageFlags.Ephemeral });

            const suggestionChannel = await client.suggestionChannel;

            if (suggestionChannel) {
                const sent = await suggestionChannel.send({ embeds: [newEmbed] });

                if (sent) {
                    await sent.react('👍');
                    await sent.react('👎');
                }
            }

            newEmbed.setFooter({ text: `Suggestion Approved by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
            await message.edit({ embeds: [newEmbed], components: [] });
        } else if (customID === 'suggestion_deny') {
            const newEmbed = EmbedBuilder.from(message.embeds[0])
                .setColor('Red')
                .setFooter({ text: `Suggestion Denied by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

            message.edit({ embeds: [newEmbed], components: [] });
            return interaction.reply({ content: 'Suggestion Denied', flags: MessageFlags.Ephemeral });
        }
    }
};
