module.exports = {
    name: "warn",
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').Message} message 
     * @param {string[]} args 
     */
    async execute(client, message, args) {
        if (message.member.roles.cache.find(role => role.id === "1416421340004614194") == null) {
            return;
        }

        if (!args[1]) return message.reply("Please mention a user to warn.");

        const user = message.mentions.members?.first() || await message.guild?.members.fetch(args[1]).catch(() => null);
        if (!user) return message.reply("Please mention a user to warn.");

        if (user.user.bot) return message.reply("I don't warn my own kind, uwu~");

        const userId = message.mentions.users.first()?.id || args[0];

        if (!userId) {
            return message.reply("Please mention a user or provide their ID to warn.");
        }

        if (userId === process.env.CLIENTID) return message.reply("Are you a fucking idiot?, uwu~");
        if (userId === "462203190298017793") return message.reply("I don't betray my master, uwu~");
        if (userId === message.author.id) return message.reply("You can't warn yourself...");

        const reason = args.slice(1).join(" ") || "No reason provided";
        const warnTime = Math.floor(new Date().getTime() / 1000);
        const warnID = Math.random().toString(36).slice(2);

        await message.reply(`User <@${userId}> has been warned for: ${reason}`);

        client.db.prepare("INSERT INTO warns (warn_id, user_id, mod_id, reason, timestamp) VALUES (?, ?, ?, ?, ?)").run(warnID, userId, message.author.id, reason, warnTime);
    }
}