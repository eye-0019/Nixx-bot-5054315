const { EmbedBuilder } = require('discord.js');
const { getDmContext } = require('../utils/dmContext');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;
        if (message.guild) return;

        const guildId = getDmContext(message.author.id);
        if (!guildId) return;

        const guild = client.guilds.cache.get(guildId);
        if (!guild) return;

        const logChannel = guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
        if (!logChannel) return;

        const embed = new EmbedBuilder()
            .setTitle('DM Reply Received')
            .setColor(0xFFFFFF)
            .setThumbnail(message.author.displayAvatarURL())
            .addFields(
                { name: 'From', value: `${message.author.tag}` },
                { name: 'Message', value: message.content?.slice(0, 1000) || '*No content*' }
            )
            .setTimestamp();

        logChannel.send({ embeds: [embed] }).catch(() => {});
    }
};
