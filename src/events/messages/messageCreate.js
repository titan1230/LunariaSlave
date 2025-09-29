const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').Message} message
     */
    async execute(client, message) {
        if (message.author.bot || !message.inGuild()) return;

        const blacklistChannel = []
        const blackListCategory = ['1412157250012840068']

        if (blacklistChannel.includes(message.channelId)) return;
        if (message.channel.parentId && blackListCategory.includes(message.channel.parentId)) return;

        const cooldown = client.levelingCooldown.get(message.author.id);

        if (cooldown) {
            if (Date.now() < cooldown) return;
        }

        const cd = Math.floor(Math.random() * (5000 - 3000 + 1) + 3000);

        client.levelingCooldown.set(message.author.id, Date.now() + cd);

        try {
            await client.db.prepare(`INSERT INTO msg (userID, count) VALUES (?, 1) ON CONFLICT(userID) DO UPDATE SET count = count + 1`).run(message.author.id);
        } catch { }

        setTimeout(() => {
            client.levelingCooldown.delete(message.author.id);
        }, cd);
    }
}