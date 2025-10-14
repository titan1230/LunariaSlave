const { EmbedBuilder } = require('discord.js');
const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    sub: "MyuuShinyPins",
    once: false,
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').Message} message
     */
    async execute(client, message) {
        if (message.author.id !== "438057969251254293") return;

        const embeds = message.embeds;

        if (embeds.length === 0) return;

        const embed = embeds[0];

        if (!embed.title || !embed.description) return;

        if (!embed.description.includes('★') || !embed.title.includes("Vs.")) return;

        const forward = EmbedBuilder.from(embed)

        const guild = await client.guilds.fetch(process.env.GUILD_ID)
        const chan = await guild.channels.fetch('1411333244598878312');

        chan.send({ embeds: [forward], content: `[Go](${message.url})\n\n` });
    }
}