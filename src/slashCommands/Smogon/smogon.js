const {
    SlashCommandBuilder,
    MessageFlags,
    EmbedBuilder,
    ContainerBuilder,
    ChannelSelectMenuBuilder,
} = require('discord.js');
const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('@discordjs/builders');

const { gen_data } = require("../../../assets/smogon_choices.json");
const { getPokemonSprite } = require('../../services/getPokemonSprite');
const { getSmogonDescription } = require('../../utils/getSmogonDescription');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('smogon')
        .addStringOption(option =>
            option.setName('pokemon').setDescription('The name of the Pokémon').setRequired(true).setAutocomplete(true)
        )
        .addStringOption(option =>
            option.setName('gen').setDescription('The generation to use')
                .addChoices(
                    ...gen_data
                )
        )
        .setDescription('Shows Smogon set for a Pokémon'),
    /**
    * @param {import('discord.js').CommandInteraction} interaction
    */
    run: async (client, interaction) => {
        await interaction.deferReply();

        let pokemon = interaction.options.getString('pokemon').replace(/\b\w/g, char => char.toUpperCase());
        // pokemon = pokemon.charAt(0).toUpperCase() + pokemon.slice(1).toLowerCase();
        const gen = interaction.options.getString('gen') || '9';

        const set = require(`../../../sets/gen${gen}_sets.json`)

        const sprite = await getPokemonSprite(pokemon).catch(() => null);

        if (!set[pokemon]) {
            const embed = new EmbedBuilder().setTitle('Error')
                .setDescription(`No sets found for \`${pokemon}\` in \`Gen ${gen}\`. \n Try another generation.`)
                .setColor('Red')
                .setTimestamp();

            if (sprite) embed.setThumbnail(sprite);

            return interaction.editReply({ content: "", embeds: [embed] });
        }

        const formats = Object.keys(set[pokemon]);
        let selected_format = formats[0];

        let sets = Object.keys(set[pokemon][selected_format]).map(key => set[pokemon][selected_format][key]);
        let selected_set = sets[0];

        const container = new EmbedBuilder()
            .setTitle(`${pokemon} (Gen ${gen})`)
            .setColor('Blue')
            .setDescription(getSmogonDescription(selected_set))
            .setTimestamp();

        if (sprite) container.setThumbnail(sprite);

        const format_select = new StringSelectMenuBuilder()
            .setCustomId('format_select')
            .setPlaceholder('Select Format')
            .addOptions(formats.map(format => new StringSelectMenuOptionBuilder().setLabel(format).setValue(format).setDefault(format === selected_format)));
        const format_row = new ActionRowBuilder().addComponents(format_select);

        const set_select = new StringSelectMenuBuilder()
            .setCustomId('set_select')
            .setPlaceholder('Select Set')
            .addOptions(sets.map((s, idx) => new StringSelectMenuOptionBuilder().setLabel(Object.keys(set[pokemon][selected_format])[idx]).setValue(Object.keys(set[pokemon][selected_format])[idx]).setDefault(s === selected_set)));
        const set_row = new ActionRowBuilder().addComponents(set_select);

        const msg = await interaction.editReply({ content: "", embeds: [container], components: [format_row, set_row] });

        const filter = i => i.user.id === interaction.user.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 60000 * 3 });

        collector.on('collect', async i => {
            await i.deferUpdate();

            if (i.customId === 'format_select') {
                selected_format = i.values[0];
                sets = Object.keys(set[pokemon][selected_format]);

                const new_set_select = new StringSelectMenuBuilder()
                    .setCustomId('set_select')
                    .setPlaceholder('Select Set')
                    .addOptions(sets.map((s) => new StringSelectMenuOptionBuilder().setLabel(s).setValue(s).setDefault(s === sets[0])));

                const new_set_row = new ActionRowBuilder().addComponents(new_set_select);

                selected_set = sets[0];
                const details = set[pokemon][selected_format][selected_set];

                const new_container = new EmbedBuilder()
                    .setTitle(`${pokemon} - ${selected_set} (${selected_format})`)
                    .setColor('Blue')
                    .setTimestamp()
                    .setDescription(getSmogonDescription(details));
                if (sprite) new_container.setThumbnail(sprite);

                interaction.editReply({ content: "", embeds: [new_container], components: [format_row, new_set_row] });
            } else if (i.customId === 'set_select') {
                selected_set = i.values[0];
                const details = set[pokemon][selected_format][selected_set];

                const new_container = new EmbedBuilder()
                    .setTitle(`${pokemon} - ${selected_set} (${selected_format})`)
                    .setColor('Blue')
                    .setTimestamp()
                    .setDescription(getSmogonDescription(details));
                if (sprite) new_container.setThumbnail(sprite);
                interaction.editReply({ content: "", embeds: [new_container]});
            }
        });

        collector.on('end', collected => {
            interaction.editReply({ content: "Selection time ended.", components: [] });
        });
    }
};
