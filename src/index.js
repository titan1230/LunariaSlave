require('dotenv').config();
require('./console/watermark');

const { Client, Partials, Collection } = require('discord.js');
const colors = require('colors');
const { ClusterClient } = require('discord-hybrid-sharding');
const db = require('./clients/sqlite');

// Create Discord client
const client = new Client({
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages",
        "GuildMessageReactions",
        "DirectMessages",
        "MessageContent",
        "GuildVoiceStates",
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction,
    ],
    allowedMentions: { parse: ['users'], repliedUser: true },
});

// Export client to avoid circular dependency issues
module.exports = client;

// Token check
if (!process.env.TOKEN) {
    console.log("[WARN] Token for Discord app is required! Put your token in .env file".yellow + "\n");
    process.exit();
}

// Collections
client.commands = new Collection();
client.events = new Collection();
client.slash = new Collection();
client.aliases = new Collection();
client.db = db;

// Attach ClusterClient
client.cluster = new ClusterClient(client);

// Load event and slash handlers AFTER client is exported
["event", "slash"].forEach(file => require(`./handlers/${file}`)(client));

// Login
client.login(process.env.TOKEN)
    .then(() => console.log("[INFO] App logged in successfully".green))
    .catch(err => {
        console.error("[CRUSH] Failed to login:", err);
        process.exit();
    });

client.loggingChannel = client.guilds.fetch(process.env.GUILD_ID).then(g => g.channels.fetch(process.env.LOGGING_CHANNEL_ID).then(c => c)).catch(console.error);

// Global error handling
client.on('error', (error) => {
    console.error("[CLIENT ERROR]", error);
});

client.on('shardError', (error) => {
    console.error("[SHARD ERROR]", error);
});

process.on('uncaughtException', (err) => {
    console.error("[UNCAUGHT EXCEPTION]", err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error("[UNHANDLED REJECTION] At:", promise, "reason:", reason);
});
