const { PermissionFlagsBits } = require('discord.js');

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

        // const userId = message.mentions.users.first()?.id || args[0];

        // if (!userId) {
        //     return message.reply("Please mention a user or provide their ID to warn.");
        // }

        // const reason = args.slice(1).join(" ") || "No reason provided";
        // const warnTime = Math.floor(new Date().getTime() / 1000);

        // client.db.exec("INSERT INTO warns (user_id, mod_id, reason, timestamp) VALUES (?, ?, ?, ?)", [userId, message.author.id, reason, warnTime]);
    }
}