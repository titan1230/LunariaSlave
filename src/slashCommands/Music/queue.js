const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Show the current music queue."),
    /**
    * @param {import("discord.js").Client} client
    * @param {import("discord.js").CommandInteraction} interaction
    */
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);

        if (!player) return interaction.reply("There is no active player for this server.");

        const queue = player.queue.length > 9 ? player.queue.slice(0, 9) : player.queue;

        const embed = new EmbedBuilder()
            .setColor('Purple')
            .setTitle('Now Playing')
            .setThumbnail(player.current.info.thumbnail)
            .setDescription(`[${player.current.info.title}](${player.current.info.uri}) [${ms(player.current.info.length)}]`)
            .setFooter({ text: `Queue length: ${player.queue.length} tracks` });

        if (queue.length)
            embed.addFields([
                {
                    name: 'Up Next',
                    value: queue
                        .map(
                            (track, index) =>
                                `**${index + 1}.** [${track.info.title}](${track.info.uri})`,
                        )
                        .join('\n'),
                },
            ]);

        return interaction.reply({ embeds: [embed] });
    }
}