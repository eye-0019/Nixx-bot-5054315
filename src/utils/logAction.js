const { EmbedBuilder } = require('discord.js');

async function logAction(guild, { action, moderator, target, reason, color = 0x5865F2 }) {
    const logChannelId = process.env.LOG_CHANNEL_ID;
    if (!logChannelId) return;

    const channel = guild.channels.cache.get(logChannelId);
    if (!channel) return;

    const embed = new EmbedBuilder()
        .setTitle(action)
        .setColor(color)
        .addFields(
            { name: 'Moderator', value: `${moderator.tag}`, inline: true },
            { name: 'Target', value: `${target.tag}`, inline: true },
            { name: 'Reason', value: reason || 'No reason provided' }
        )
        .setTimestamp();

    channel.send({ embeds: [embed] }).catch(() => {});
}

module.exports = { logAction };
