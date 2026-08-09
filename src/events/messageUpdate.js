const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage, newMessage) {
        if (!newMessage.guild || newMessage.author?.bot) return;
        if (oldMessage.content === newMessage.content) return;

        const logChannelId = process.env.LOG_CHANNEL_ID;
        const channel = newMessage.guild.channels.cache.get(logChannelId);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setTitle('Message Edited')
            .setColor(0x95A5A6)
            .addFields(
                { name: 'Author', value: `${newMessage.author?.tag || 'Unknown'}` },
                { name: 'Channel', value: `${newMessage.channel}` },
                { name: 'Before', value: oldMessage.content?.slice(0, 500) || '*No content*' },
                { name: 'After', value: newMessage.content?.slice(0, 500) || '*No content*' }
            )
            .setTimestamp();

        channel.send({ embeds: [embed] }).catch(() => {});
    }
};
