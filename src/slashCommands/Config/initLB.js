const { SlashCommandBuilder, PermissionsBitField, MessageFlags, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('init-lb')
        .setDescription("INIT LB")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .addChannelOption(option => 
            option.setName('channel').setDescription('Channel').setRequired(true).addChannelTypes([ChannelType.GuildText])
        ),
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        if (interaction.user.id !== '462203190298017793') {
            return interaction.reply({ content: "DEV ONLY COMMAND", flags: MessageFlags.Ephemeral })
        }

        const chan = interaction.options.getChannel('channel')

        await chan.send(".")

        await interaction.reply({ content: "Sent", flags: MessageFlags.Ephemeral })
    }
}