const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message-lb')
        .addStringOption(option =>
            option.setName('limit')
                .setDescription('Number of top users to display (default 5)')
                .addChoices(
                    { name: '5', value: '5' },
                    { name: '10', value: '10' },
                    { name: '15', value: '15' },
                ).setRequired(false)
        )
        .setDescription('Displays the message leaderboard.'),
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.deferReply();


        const limit = interaction.options.getString('limit') || '5';
        const msgs = await client.db.prepare(`SELECT * FROM msg ORDER BY count DESC LIMIT ${limit}`).all();

        const embed = new EmbedBuilder()
            .setTitle('📊 Message Leaderboard')
            .setColor(0x00AE86)
            .setTimestamp();

        let description = '';

        msgs.forEach((msg, index) => {
            description += `${index + 1} <@${msg.userID}>: ${msg.count} messages\n`;
        });

        embed.setDescription(description);

        return interaction.editReply({ embeds: [embed] });
    },
};
