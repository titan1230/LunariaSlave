const { smogon_choices } = require("../../../assets/smogon_choices.json");

module.exports = {
    name: 'interactionCreate',
    once: false,
    sub: "autocomplete",
    async execute(client, interaction) {
        // handle autocomplete
        if (interaction.isAutocomplete()) {
            const focused = interaction.options.getFocused();
            const filtered = smogon_choices
                .map(p => p.name)
                .filter(name => name.toLowerCase().includes(focused.toLowerCase()))
                .slice(0, 25);

            await interaction.respond(
                filtered.map(name => ({ name, value: name }))
            );
            return;
        }

        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === "pokemon") {
            const choice = interaction.options.getString("name");
            await interaction.reply(`You picked **${choice}**!`);
        }
    },
};
