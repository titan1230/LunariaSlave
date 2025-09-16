const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a song in your voice channel")
        .addStringOption((option) =>
            option.setName("query").setDescription("The song to play").setRequired(true)
        )
        .addBooleanOption((option) =>
            option.setName("now").setDescription("Play the song next").setRequired(false)
        ),
    /**
     * @param {import('discord.js').CommandInteraction} interaction
     * @param {import('discord.js').Client} client
    */
    run: async (client, interaction) => {
        await interaction.deferReply();

        const memberVC = interaction.member.voice.channel;
        const botVC = interaction.guild.members.fetchMe().then(m => m.voice.channel).catch(() => null);

        if (!memberVC) {
            return interaction.editReply("You must be in a voice channel to use this command.");
        }

        const query = interaction.options.getString("query");
        const now = interaction.options.getBoolean("now") || false;

        await client.distube.play(memberVC, query, {
            skip: now,
            textChannel: interaction.channel ?? undefined,
            member: interaction.member,
            metadata: { interaction },
        }).catch(err => {
            console.error(err);
            return interaction.editReply("An error occurred while trying to play the song.");
        });

        return interaction.editReply({ content: `⏱️ Searching for \`${query}\`...`, flags: MessageFlags.Ephemeral });
    }
}