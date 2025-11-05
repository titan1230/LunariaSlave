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
        if (!message.content.startsWith(client.prefix)) return;


        const args = message.content.slice(client.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.messageCommands.get(commandName) || client.messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        console.log(command)
        if (!command) return;

        try {
            await command.execute(client, message, args);
        } catch (error) {
            console.error("[COMMAND ERROR]", error);
            await message.reply("There was an error while executing the command.");
        }
    }
}