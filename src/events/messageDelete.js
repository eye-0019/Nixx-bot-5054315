const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageDelete',
    async execute(message) {
        if (!message.guild || message.author?.bot) return;

        const logChannelId = process.env.LOG_CHANNEL_ID;
        const channel = message.guild.channels.cache.get(logChannelId);
        if (!channel) return;

        const attachment = message.attachments?.first();

        const embed = new EmbedBuilder()
            .setTitle('Message Deleted')
            .setColor(0xFFFFFF)
            .setThumbnail(message.author?.displayAvatarURL() || null)
            .addFields(
                { name: 'Author', value: `${message.author?.tag || 'Unknown'}` },
                { name: 'Channel', value: `${message.channel}` },
                { name: 'Content', value: message.content?.slice(0, 1000) || '*No content*' }
            )
            .setTimestamp();

        if (attachment) embed.setImage(attachment.proxyURL || attachment.url);

        channel.send({ embeds: [embed] }).catch(() => {});
    }
};
