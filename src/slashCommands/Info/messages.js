const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('messages')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to get messages from')
        )
        .setDescription('Get a user\'s messages'),
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const target = interaction.options.getUser('user') || interaction.user;

        if (target.bot) {
            return interaction.editReply({
                content: '🤖 Bots do not have messages to display.',
            });
        }

        if (target.id !== interaction.user.id && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.editReply({
                content: '❌ You do not have permission to view this user\'s messages.',
            });
        }

        const msgs = await client.db.prepare(`SELECT * FROM msg WHERE userID = ?`).get(target.id);

        const messageCount = msgs ? msgs.count : 0;

        const embed = new EmbedBuilder()
            .setTitle(`📨 Messages for ${target.tag}`)
            .setColor(0x00AE86)
            .addFields(
                { name: 'Total Messages', value: `${messageCount}`, inline: true },
            )
            .setTimestamp();
        return interaction.editReply({ embeds: [embed] });
    },
};
