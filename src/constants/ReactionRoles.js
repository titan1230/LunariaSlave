const {
    TextDisplayBuilder,
    SectionBuilder,
    ContainerBuilder,
    ButtonBuilder,
    ButtonStyle,
    SeparatorBuilder,
    SeparatorSpacingSize
} = require('discord.js');

const roleIDs = require('../config/roles.json');

const GenderSection = [
    new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent(`👨‍🦰 - <@&${roleIDs.male_role}>`))
        .setButtonAccessory(
            new ButtonBuilder()
                .setLabel('Get')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('male_role')
        ),
    new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent(`👩‍🦰 - <@&${roleIDs.female_role}>`))
        .setButtonAccessory(
            new ButtonBuilder()
                .setLabel('Get')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('female_role')
        ),
    new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent(`🙌 - <@&${roleIDs.they_role}>`))
        .setButtonAccessory(
            new ButtonBuilder()
                .setLabel('Get')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('they_role')
        ),
    new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent(`🤐 - <@&${roleIDs.rather_not_say_role}>`))
        .setButtonAccessory(
            new ButtonBuilder()
                .setLabel('Get')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('rather_not_say_role')
        )
];

const DevicesSection = [
    new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent(`📱 - <@&${roleIDs.mobile_role}>`))
        .setButtonAccessory(
            new ButtonBuilder()
                .setLabel('Get')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('mobile_role')
        ),
    new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent(`💻 - <@&${roleIDs.laptop_role}>`))
        .setButtonAccessory(
            new ButtonBuilder()
                .setLabel('Get')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('laptop_role')
        ),
];

const AgeSection = [
    new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent(`🍷 - <@&${roleIDs.age_18_role}>`))
        .setButtonAccessory(
            new ButtonBuilder()
                .setLabel('Get')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('age_18_role')
        ),
    new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent(`🔞 - <@&${roleIDs.age_u18_role}>`))
        .setButtonAccessory(
            new ButtonBuilder()
                .setLabel('Get')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('age_u18_role')
        ),
];

const PingsSection = [
    new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent(`📢 - <@&${roleIDs.announcement_pings_role}>`))
        .setButtonAccessory(
            new ButtonBuilder()
                .setLabel('Get')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('announcement_pings_role')
        ),
    new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent(`🎁 - <@&${roleIDs.giveaway_pings_role}>`))
        .setButtonAccessory(
            new ButtonBuilder()
                .setLabel('Get')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('giveaway_pings_role')
        ),
    new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent(`🎲 - <@&${roleIDs.event_pings_role}>`))
        .setButtonAccessory(
            new ButtonBuilder()
                .setLabel('Get')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('event_pings_role')
        ),
    new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent(`🎫 - <@&${roleIDs.raffles_role}>`))
        .setButtonAccessory(
            new ButtonBuilder()
                .setLabel('Get')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('raffles_role')
        ),
    new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent(`🎰 - <@&${roleIDs.gamblers_role}>`))
        .setButtonAccessory(
            new ButtonBuilder()
                .setLabel('Get')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('gamblers_role')
        ),
];

const separator = new SeparatorBuilder().setDivider(false);

const FANCY_THING = `꒰ ୨୧ ─ ・┈ ・ ─ ・┈ ─ ・┈ ─ ・┈ ─ ・┈ ─ ・┈꒱꒱`;

const genderContainer = new ContainerBuilder()
    .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(FANCY_THING)
    )
    .addSeparatorComponents(separator, { spacing: SeparatorSpacingSize.Small, divider: false })
    .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(`### ╭・˚ ₊ ︵・꒰Gender・ෆ꒱︵︵ ๑ ⊹﹒︵`)
    )
    .addSectionComponents(...GenderSection)
    .addSeparatorComponents(separator, { spacing: SeparatorSpacingSize.Small, divider: false })
    .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(FANCY_THING)
    )
    .setAccentColor(0x00AE86);

const ageContainer = new ContainerBuilder()
    .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(FANCY_THING)
    )
    .addSeparatorComponents(separator, { spacing: SeparatorSpacingSize.Small, divider: false })
    .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(`### ╭・˚ ₊ ︵・꒰Age・ෆ꒱︵︵ ๑ ⊹﹒︵`)
    )
    .addSectionComponents(...AgeSection)
    .addSeparatorComponents(separator, { spacing: SeparatorSpacingSize.Small, divider: false })
    .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(FANCY_THING)
    )
    .setAccentColor(0x00AE86);

const devicesContainer = new ContainerBuilder()
    .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(FANCY_THING)
    )
    .addSeparatorComponents(separator, { spacing: SeparatorSpacingSize.Small, divider: false })
    .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(`### ╭・˚ ₊ ︵・꒰Devices・ෆ꒱︵︵ ๑ ⊹﹒︵`)
    )
    .addSectionComponents(...DevicesSection)
    .addSeparatorComponents(separator, { spacing: SeparatorSpacingSize.Small, divider: false })
    .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(FANCY_THING)
    )
    .setAccentColor(0x00AE86);

const pingsContainer = new ContainerBuilder()
    .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(FANCY_THING)
    )
    .addSeparatorComponents(separator, { spacing: SeparatorSpacingSize.Small, divider: false })
    .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(`### ╭・˚ ₊ ︵・꒰Pings・ෆ꒱︵︵ ๑ ⊹﹒︵`)
    )
    .addSectionComponents(...PingsSection)
    .addSeparatorComponents(separator, { spacing: SeparatorSpacingSize.Small, divider: false })
    .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(FANCY_THING)
    )
    .setAccentColor(0x00AE86);

module.exports = { genderContainer, devicesContainer, ageContainer, pingsContainer };