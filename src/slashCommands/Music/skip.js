const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip the current song"),
    /**
     * @param {import('discord.js').CommandInteraction} interaction
     * @param {import('discord.js').Client} client
    */
    run: async (client, interaction) => {
        await interaction.deferReply();

        const memberVC = interaction.member.voice.channel;
        const botVC = interaction.guild.members.fetchMe().then(m => m.voice.channel).catch(() => null);

        try {
            const song = await client.distube.skip(interaction);

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Purple")
                        .setTitle("Skipped Song")
                        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription(`Skipped to \`${song.name || song.url}\``),
                ],
            });
        } catch (e) {
            console.error(e);
            interaction.reply({
                embeds: [new EmbedBuilder().setColor("Purple").setTitle("Error").setDescription(`Error: \`${e}\``)],
            });
        }
    }
}