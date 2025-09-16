const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Displays the current music queue"),
    /**
     * 
     * @param {import("discord.js").CommandInteraction} interaction 
     * @param {import("discord.js").Client  } client
     */
    run: async (interaction, client) => {

        let queue;
        try {
            queue = await client.distube.getQueue(interaction);
        } catch (error) {
            console.error(error);
            return interaction.reply("An error occurred while trying to display the queue.");
        }

        if (!queue) return interaction.reply("❌ | No music is being played!");

        const song = queue.songs[0];

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("Purple")
                    .setTitle("Current Queue")
                    .setDescription(
                        [
                            `**Current:** \`${song.name || song.url}\` - \`${queue.formattedCurrentTime}\`/\`${song.stream.playFromSource ? song.formattedDuration : song.stream.song?.formattedDuration
                            }\`\n`,
                            `**Up next**\n${queue.songs
                                .slice(1, 10)
                                .map((song, i) => `**${i + 1}.** \`${song.name || song.url}\``)
                                .join("\n") || "None"
                            }`,
                        ].join("\n"),
                    )
                    .addFields(
                        {
                            name: "Volume",
                            value: `${queue.volume}%`,
                            inline: true,
                        },
                        {
                            name: '\u200b',
                            value: '\u200b',
                            inline: true,
                        },
                        {
                            name: "Autoplay",
                            value: `${queue.autoplay ? "On" : "Off"}`,
                            inline: true,
                        },
                        {
                            name: "Loop",
                            value: `${queue.repeatMode === RepeatMode.QUEUE ? "Queue" : queue.repeatMode === RepeatMode.SONG ? "Song" : "Off"
                                }`,
                            inline: true,
                        },
                        {
                            name: '\u200b',
                            value: '\u200b',
                            inline: true,
                        },
                        {
                            name: "Filters",
                            value: `${queue.filters.names.join(", ") || "Off"}`,
                            inline: false,
                        },
                    ),
            ],
        });
    }
}