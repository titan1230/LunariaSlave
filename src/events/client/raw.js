const { Events, GatewayDispatchEvents } = require('discord.js');
const client = require('../../index');

module.exports = {
    name: Events.Raw,
    once: false,

    async execute(client, d) {
        if (![GatewayDispatchEvents.VoiceStateUpdate, GatewayDispatchEvents.VoiceServerUpdate,].includes(d.t)) return;
        client.riffy.updateVoiceState(d);
    },
};
