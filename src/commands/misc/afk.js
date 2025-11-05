module.exports = {
    name: "afk",
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').Message} message 
     * @param {string[]} args 
     */
    async execute(client, message, args) {
        const sent = await message.reply("Set you AFK status.").catch(() => { });

        const reason = args.join(" ") || "AFK";

        client.afk.set(message.author.id, {
            reason: reason,
            since: Date.now()
        });
    }
}