const { SlashCommandBuilder } = require('discord.js');
const chance = require('chance').Chance();

module.exports = {
    cooldown: 60 * 15,
    data: new SlashCommandBuilder()
        .setName('pray')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Pray for someone else!')
                .setRequired(false))
        .setDescription('Pray to the gods for good luck!'),
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.deferReply();

        const user = interaction.options.getUser('user') || interaction.user;
        // const luck = Math.floor(Math.random() * (5 - (-5) + 1)) - 5;

        const luck = chance.weighted([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 99], [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 2, 0.000001]);

        if (user.bot) {
            return interaction.editReply('You cannot pray for bots!');
        }

        const getUserLuck = await client.db.prepare("SELECT luck FROM userLuck WHERE userID = ?").get(user.id);

        if (!getUserLuck) {
            await client.db.prepare("INSERT INTO userLuck (userID) VALUES (?)").run(user.id);
        }

        let response = '';

        switch (luck) {
            case -5:
                response = `🌑 🔮 ${user.username}, Lunala curses your insolence - shadows coil tightly around you.`;
                break;
            case -4:
                response = `🌑 🔮 ${user.username}, Lunala turns away in anger, leaving you weakened and forsaken.`;
                break;
            case -3:
                response = `🌑 🔮 ${user.username}, your prayer has stirred Lunala's wrath. Misfortune stalks your path.`;
                break;
            case -2:
                response = `🌑 🔮 ${user.username}, Lunala rejects your plea, a chill of disfavor settling over you.`;
                break;
            case -1:
                response = `🌑 🔮 ${user.username}, Lunala finds you unworthy and dismisses your prayer.`;
                break;
            case 0:
                response = `🌑 🔮 ${user.username}, your words drift into the void - Lunala gives no answer.`;
                break;
            case 1:
                response = `🌑 🔮 ${user.username}, Lunala listens in silence, neither blessing nor condemning you.`;
                break;
            case 2:
                response = `🌑 🔮 ${user.username}, Lunala acknowledges your devotion but offers no gifts.`;
                break;
            case 3:
                response = `🌑 🔮 ${user.username}, Lunala grants you a flicker of light - a modest blessing.`;
                break;
            case 4:
                response = `🌑 🔮 ${user.username}, Lunala shines favorably upon you, gifting a powerful blessing.`;
                break;
            case 5:
                response = `🌑 🔮 ${user.username}, Lunala embraces your devotion fully - their divine favor is yours!`;
                break;
            default:
                response = `🌑 🔮 ${user.username}, something went wrong while praying.`;
        }

        response += `\nYou now have [${(getUserLuck ? getUserLuck.luck : 0) + luck}](discord:// '${luck >= 0 ? `+${luck}` : luck}') luck.`;

        if (interaction.user.id !== user.id) {
            response = `🙏 ${interaction.user.username} prayed for ${user.username}!\n\n` + response;
        }

        const totalLuck = (getUserLuck ? getUserLuck.luck : 0) + luck;

        await client.db.prepare("INSERT INTO userLuck (userID) VALUES (?) ON CONFLICT(userID) DO UPDATE SET luck = luck + ?").run(user.id, luck);

        await interaction.editReply(response);

        if (totalLuck >= 100 || totalLuck <= -100) {
            interaction.channel.send(`🎉 @<${user.id}> you have reached a special luck milestone.\n\n✨ By the light of destiny and the hands of eternity, Lunala bestow upon you the crest of boundless luck.\n\n🔮 May every path you walk turn to gold, every choice shine with favor, and every shadow bend into opportunity.\n\nDM a staff member to claim your reward.\n\n-# Your luck has been reset to 0.`);

            await client.db.prepare("UPDATE userLuck SET luck = 0 WHERE userID = ?").run(user.id);
        }
    },
};
