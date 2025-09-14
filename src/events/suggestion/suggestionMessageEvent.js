const { PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    sub: "SuggestionMessage",
    name: 'messageCreate',
    once: false,
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message } message
     */
    async execute(client, message) {
        if (message.author.bot || !message.guild) return;
        if (client.suggestedChannel && message.channelId !== client.suggestedChannel.id) return;

        const ApprovalEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`New Suggestion by - ${message.author.username}`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(message.content)

        const ApprovalButton = new ButtonBuilder()
            .setCustomId('suggestion_accept')
            .setLabel('Approve')
            .setEmoji('✅')
            .setStyle('Primary')
        
            
        const DenialButton = new ButtonBuilder()
            .setCustomId('suggestion_deny')
            .setLabel('Deny')
            .setEmoji('❌')
            .setStyle(ButtonStyle.Danger)

        if (client.suggestionApprovalChannel) {
            client.suggestionApprovalChannel.send({ embeds: [ApprovalEmbed], components: [{ type: 1, components: [ApprovalButton, DenialButton] }] });
        }
    }
};
