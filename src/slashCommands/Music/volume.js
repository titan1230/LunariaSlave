const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Set the volume of the music")
        .addIntegerOption((option) =>
            option.setName("amount").setDescription("The volume amount (1-100)").setRequired(true)
        ),
    /**
     * @param {import('discord.js').CommandInteraction} interaction
     * @param {import('discord.js').Client} client
    */
    run: async (client, interaction) => {
        await interaction.deferReply();

        const memberVC = interaction.member.voice.channel;
        const botVC = interaction.guild.members.fetchMe().then(m => m.voice.channel).catch(() => null);

        if (!botVC || !memberVC || botVC.id !== memberVC.id) {
            return interaction.editReply("You must be in the same voice channel as the bot to use this command.");
        }

        const volume = interaction.options.getInteger("amount");

        if (volume < 1 || volume > 100) {
            return interaction.editReply("Volume must be between 1 and 100.");
        }

        client.distube.setVolume(interaction, volume);

        await interaction.reply({
            embeds: [
                new EmbedBuilder().setColor("Purple").setTitle("Music 🎵").setDescription(`Set the volume to \`${volume}\``),
            ],
        });
    }
}