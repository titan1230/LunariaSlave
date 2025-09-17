const { Client, CommandInteraction, SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .addStringOption(option => option.setName("query").setDescription("The song to play").setRequired(true))
        .setDescription("Play a song."),
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const query = interaction.options.getString('query');

        if (!interaction.member.voice.channel) return interaction.reply({content: "You must be in a voice channel to use this command.", flags: MessageFlags.Ephemeral});

        const player = client.riffy.createConnection({
            guildId: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            deaf: true,
        })

        const resolve = await client.riffy.resolve({ query: query, requester: interaction.member });
        const { loadType, tracks, playlistInfo } = resolve;

        if (loadType === 'playlist') {
            for (const track of resolve.tracks) {
                track.info.requester = interaction.member;
                player.queue.add(track);
            }

            await interaction.reply(`Added ${tracks.length} songs from ${playlistInfo.name} playlist.`);

            if (!player.playing && !player.paused) return player.play();

        } else if (loadType === 'search' || loadType === 'track') {
            const track = tracks.shift();
            track.info.requester = interaction.member;

            player.queue.add(track);

            await interaction.reply(`Added **${track.info.title}** to the queue.`);

            if (!player.playing && !player.paused) return player.play();

        } else {
            return interaction.reply(`There were no results found for your query.`);
        }
    },
}