const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription('Initialize the database.'),
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        if (interaction.user.id !== '462203190298017793') return interaction.reply({ content: 'This command can only be used by the bot owner.', ephemeral: true });

        try {
            await client.db.exec("INSERT OR IGNORE INTO serverChannels (id) VALUES (1)");
            return interaction.reply({ content: 'Database initialized successfully.', ephemeral: true });
        } catch (err) {
            console.error("[DB ERROR]", err);
            return interaction.reply({ content: 'There was an error while accessing the database.', ephemeral: true });
        }
    },
};
