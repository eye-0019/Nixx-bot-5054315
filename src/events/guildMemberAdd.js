const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const logChannelId = process.env.LOG_CHANNEL_ID;
        const channel = member.guild.channels.cache.get(logChannelId);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setTitle('Member Joined')
            .setColor(0x95A5A6)
            .setDescription(`${member.user.tag}`)
            .setTimestamp();

        channel.send({ embeds: [embed] }).catch(() => {});
    }
};
