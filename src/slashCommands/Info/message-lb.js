const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message-lb')
        .setDescription('Get the leaderboard of users with the most messages'),
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.deferReply();

        const msgs = await client.db.prepare(`SELECT * FROM msg ORDER BY count DESC LIMIT 5`).all();

        const embed = new EmbedBuilder()
            .setTitle('📊 Message Leaderboard')
            .setColor(0x00AE86)
            .setTimestamp();

        msgs.forEach((msg, index) => {
            embed.addFields(
                { name: `#${index + 1} ${msg.userID}`, value: `${msg.count} messages`, inline: true },
            );
        });

        return interaction.editReply({ embeds: [embed] });
    },
};
