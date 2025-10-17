const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wall')
        .setDescription('DEV ONLY'),
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        if (interaction.user.id !== "462203190298017793") return interaction.reply({ content: 'This command disabled.', flags: MessageFlags.Ephemeral });

        await interaction.deferReply();

        interaction.editReply(`
        .
        .
        .
        .
        .
        .
        .
        .
        .
        .
        .
        .
        .
        .
        .
        .
        .
        .
        .
        .
        .
        .
        .
        .    
        `);
    },
};
