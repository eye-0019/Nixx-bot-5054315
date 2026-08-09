const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageDelete',
    async execute(message) {
        if (!message.guild || message.author?.bot) return;

        const logChannelId = process.env.LOG_CHANNEL_ID;
        const channel = message.guild.channels.cache.get(logChannelId);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setTitle('Message Deleted')
            .setColor(0x95A5A6)
            .addFields(
                { name: 'Author', value: `${message.author?.tag || 'Unknown'}` },
                { name: 'Channel', value: `${message.channel}` },
                { name: 'Content', value: message.content?.slice(0, 1000) || '*No content*' }
            )
            .setTimestamp();

        channel.send({ embeds: [embed] }).catch(() => {});
    }
};
