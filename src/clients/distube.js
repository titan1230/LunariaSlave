const { DisTube, Events } = require('distube');
const { EmbedBuilder } = require('discord.js');
const { YouTubePlugin } = require('@distube/youtube');
const fs = require('fs');

const client = require('../index');
const { cookie } = require('../../assets/yt_cookie.json');

const distube = new DisTube(client, {
    nsfw: true,
    emitNewSongOnly: true,
    joinNewVoiceChannel: true,
    plugins: [
        new YouTubePlugin({
            // cookies: cookie,
        }),
    ]
});

/**
 * @param {import('discord.js').ChatInputCommandInteraction} interaction 
 * @param {import('discord.js').EmbedBuilder} embed 
 * @param {import('discord.js').GuildTextBasedChannel} textChannel 
 */
const followUp = async (
    interaction,
    embed,
    textChannel,
) => {
    if (Date.now() - interaction.createdTimestamp < 15 * 60 * 1000) {
        await interaction.followUp({ embeds: [embed] });
    } else {
        await textChannel.send({ embeds: [embed] });
    }
};

// distube.on(Events.FFMPEG_DEBUG, console.log);

distube.on(Events.INIT_QUEUE, (queue) => {
    queue.volume = 50;
});

distube.on(Events.PLAY_SONG, (queue, song) => {
    followUp(
        song.metadata.interaction,
        new EmbedBuilder().setColor('Purple').setTitle('Now Playing 🎶').setDescription(`**[${song.name}](${song.url})** - \`${song.formattedDuration}\``).setFooter({ text: `Requested by ${song.user.tag}`, iconURL: song.user.displayAvatarURL({ dynamic: true }) }),
        queue.textChannel
    ).catch(console.error);
});

distube.on(Events.ADD_SONG, (queue, song) => {
    song.metadata.interaction.editReply({ content: `✅ Added **${song.name}** - \`${song.formattedDuration}\` to the queue.` }).catch(console.error);
});

distube.on(Events.FINISH, (queue) => {
    queue.textChannel.send({
        embeds: [
            new EmbedBuilder().setColor('Purple').setTitle('Queue Finished 🎶').setDescription('The queue has finished. Leaving the voice channel.'),
        ]
    }).catch(console.error);

    queue.voice.leave();
});

distube.on(Events.ERROR, async (error, queue, song) => {
    if (song) {
        await followUp(
            song.metadata.interaction,
            new EmbedBuilder().setColor("Blurple").setTitle("DisTube").setDescription(`Error: \`${error.message}\``),
            queue.textChannel,
        );
    } else if (queue.textChannel) {
        await queue.textChannel.send({
            embeds: [
                new EmbedBuilder().setColor("Blurple").setTitle("DisTube").setDescription(`Error: \`${error.message}\``),
            ],
        });
    } else {
        console.error(error);
    }
});

module.exports = distube;