const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember) {
        if (newMember.user.bot) return;

        const logChannelId = process.env.LOG_CHANNEL_ID;
        const channel = newMember.guild.channels.cache.get(logChannelId);
        if (!channel) return;

        const oldRoles = oldMember.roles.cache;
        const newRoles = newMember.roles.cache;

        const addedRoles = newRoles.filter(role => !oldRoles.has(role.id));
        const removedRoles = oldRoles.filter(role => !newRoles.has(role.id));

        if (addedRoles.size === 0 && removedRoles.size === 0) return;

        let description = '';
        if (addedRoles.size > 0) {
            description += `${newMember} was given: ${addedRoles.map(r => r).join(', ')}\n`;
        }
        if (removedRoles.size > 0) {
            description += `${newMember} lost: ${removedRoles.map(r => r).join(', ')}`;
        }

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Member Roles Updated', iconURL: newMember.user.displayAvatarURL() })
            .setDescription(description)
            .setFooter({ text: `User ID: ${newMember.id}` })
            .setTimestamp();

        channel.send({ embeds: [embed] }).catch(() => {});
    }
};
