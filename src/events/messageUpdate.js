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
            .setColor(0xFFFFFF)
            .setDescription(`Message from ${newMessage.author} edited in ${newMessage.channel}\n[Jump to message](${newMessage.url})`)
            .addFields(
                { name: 'Before', value: oldMessage.content?.slice(0, 500) || '*No content*' },
                { name: 'After', value: newMessage.content?.slice(0, 500) || '*No content*' },
                { name: 'User ID', value: newMessage.author?.id || 'Unknown' }
            )
            .setTimestamp();

        channel.send({ embeds: [embed] }).catch(() => {});
    }
};
