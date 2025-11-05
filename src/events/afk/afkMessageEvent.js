const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    sub: "AFK Message Event",
    name: 'messageCreate',
    once: false,

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message } message
     */
    async execute(client, message) {
        if (message.author.bot) return;

        const afkData = client.afk;
        const authorAfk = afkData.get(message.author.id);

        if (authorAfk) {
            afkData.delete(message.author.id);

            const sent = await message.channel.send(`Welcome back, <@${message.author.id}>\n You are no longer marked as AFK.`);

            setTimeout(() => {
                sent.delete().catch(() => { });
            }, 5000);
        }

        if (message.mentions.users.size) {
            const afkData = client.afk;
            message.mentions.users.forEach(async (user) => {
                const userAfk = afkData.get(user.id);

                if (userAfk) {
                    const sent = await message.reply({ content: `<@${user.id}> is currently AFK: ${userAfk.reason}` }).catch(() => { });

                    setTimeout(() => {
                        sent.delete().catch(() => { });
                    }, 5000);
                }
            });
        }
    }
};
