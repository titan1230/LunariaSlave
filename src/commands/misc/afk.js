module.exports = {
    name: "afk",
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').Message} message 
     * @param {string[]} args 
     */
    async execute(client, message, args) {
        const sent = await message.reply("Marked you as AFK.").catch(() => { });

        const reason = args.join(" ") || "AFK";

        client.afk.set(message.author.id, {
            reason: reason,
            since: Date.now()
        });
    }
}