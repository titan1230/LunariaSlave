const { Riffy } = require("riffy");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { Dynamic } = require("musicard");

module.exports = (client) => {
    const nodes = [
        {
            host: "lavahatry4.techbyte.host",
            port: 3000,
            password: "NAIGLAVA-dash.techbyte.host",
            secure: false
        },
    ];

    const riffy = new Riffy(client, nodes, {
        send: (payload) => {
            const guild = client.guilds.cache.get(payload.d.guild_id);
            if (guild) guild.shard.send(payload);
        },
        defaultSearchPlatform: "ytsearch",
        restVersion: "v4",
        reconnectTries: 20,
        reconnectInterval: 5000,
    });

    riffy.on("nodeConnect", (node) => {
        console.log(`Node "${node.name}" connected.`);
    });

    riffy.on("nodeError", async (node, error) => {
        console.log("\n---------------------")
        console.log(`Node ${node.name} encountered an error: ${error.message}`, "error")
        console.log("---------------------")
    });

    riffy.on("nodeDisconnect", (node, reason) => {
        console.log(`Node "${node.name}" disconnected. Reason: ${JSON.stringify(reason)}`);
    });

    riffy.on("nodeReconnect", (node) => {
        console.log(`Node "${node.name}" is reconnecting...`);
    });

    riffy.on("queueEnd", async (player) => {
        const channel = client.channels.cache.get(player.textChannel);

        if (player.message) await player.message.delete();

        if (player.isAutoplay) {
            player.autoplay(player)
        } else {
            player.destroy();
            channel.send("Queue has ended.");
        }
    });

    riffy.on('trackStart', async (player, track) => {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('disconnect')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏺'),

                new ButtonBuilder()
                    .setCustomId('pause')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏸'),

                new ButtonBuilder()
                    .setCustomId('skip')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏭')
            );

        const channel = client.channels.cache.get(player.textChannel);

        function formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        }

        const musicLength = track.info.length;
        const formattedLength = formatTime(Math.round(musicLength / 1000));
        const [minutesStr, secondsStr] = formattedLength.split(":");
        const minutes = parseInt(minutesStr, 10);
        const seconds = parseInt(secondsStr, 10);
        const totalMilliseconds = (minutes * 60 + seconds) * 1000;

        const musicard = await Dynamic({
            thumbnailImage: track.info.thumbnail,
            name: track.info.title,
            author: track.info.author,
            progress: 100
        });

        const msg = await channel
            .send({
                files: [{ attachment: musicard }],
                components: [row]
            })
            .then((x) => (player.message = x));
    });

    riffy.on('trackEnd', async (player) => {
        if (!player) return;

        if (player.message) await player.message.delete();
    })

    riffy.on('trackStuck', async (player, track, payload) => {});

    riffy.on('trackError', async (player, track, payload) => {
        console.log(payload);
    })

    client.riffy = riffy;
};