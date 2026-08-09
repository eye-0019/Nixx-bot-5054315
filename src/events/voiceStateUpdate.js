const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {
        const member = newState.member || oldState.member;
        if (!member || member.user.bot) return;

        const logChannelId = process.env.LOG_CHANNEL_ID;
        const channel = (newState.guild || oldState.guild).channels.cache.get(logChannelId);
        if (!channel) return;

        let description;

        if (!oldState.channelId && newState.channelId) {
            description = `${member} joined ${newState.channel}`;
        } else if (oldState.channelId && !newState.channelId) {
            description = `${member} left ${oldState.channel}`;
        } else if (oldState.channelId !== newState.channelId) {
            description = `${member} moved from ${oldState.channel} to ${newState.channel}`;
        } else {
            return;
        }

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Voice State Updated', iconURL: member.user.displayAvatarURL() })
            .setDescription(description)
            .setFooter({ text: `User ID: ${member.id}` })
            .setTimestamp();

        channel.send({ embeds: [embed] }).catch(() => {});
    }
};
