
module.exports = {
    autoCreateChannel: async (client, options) => {
        class setting {
            constructor() {
                this.options = options;
                this.userLimit = (options && options.userLimit) || 17;
                this.reason = (options && options.reason) || "Powered by @ds112";
                this.nameStartsWith = (options && options.nameStartsWith) || "+ ";
                this.nameStartsWithTemp = (options && options.nameStartsWithTemp) || "* ";
            }
        }
        let settings = new setting()
        client.on('voiceStateUpdate', (oldMember, newMember) => {
            // ! leave
            let isLeave = (oldMember.voiceChannel != undefined)
            if (isLeave) {
                if (oldMember.voiceChannel.name.startsWith(settings.nameStartsWithTemp)) {
                    if (oldMember.voiceChannel.members.size == 0) {
                        oldMember.voiceChannel.delete()
                    }
                    else { // change name
                        let matchMember = oldMember.voiceChannel.members.find(x => `${settings.nameStartsWithTemp}${x.displayName}` == oldMember.voiceChannel.name);
                        if (matchMember == null) {
                            oldMember.voiceChannel.setName(`${settings.nameStartsWithTemp}${oldMember.voiceChannel.members.random().displayName}`)
                        }
                    }
                }
            }

            // todo create channel
            if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith(settings.nameStartsWith)) {
                newMember.guild.createChannel(`${settings.nameStartsWithTemp}${newMember.displayName}`, {
                    type: "voice",
                    parent: newMember.voiceChannel.parent,
                    userLimit: settings.userLimit,
                    reason: settings.reason
                }).then(cloneChannel => newMember.setVoiceChannel(cloneChannel))
            }
        });

    },

    autoCreateChannelOnTop: async (client, options) => {
        class setting {
            constructor() {
                this.options = options;
                this.userLimit = (options && options.userLimit) || 17;
                this.reason = (options && options.reason) || "Powered by @ds112";
                this.nameStartsWith = (options && options.nameStartsWith) || "+ ";
                this.nameStartsWithTemp = (options && options.nameStartsWithTemp) || "* ";
            }
        }
        let settings = new setting()
        client.on('voiceStateUpdate', (oldMember, newMember) => {
            // ! leave
            let isLeave = (oldMember.voiceChannel != undefined)
            if (isLeave) {
                if (oldMember.voiceChannel.name.startsWith(settings.nameStartsWithTemp)) {
                    if (oldMember.voiceChannel.members.size == 0) {
                        oldMember.voiceChannel.delete()
                    }
                    else { // change name
                        let matchMember = oldMember.voiceChannel.members.find(x => `${settings.nameStartsWithTemp}${x.displayName}` == oldMember.voiceChannel.name);
                        if (matchMember == null) {
                            oldMember.voiceChannel.setName(`${settings.nameStartsWithTemp}${oldMember.voiceChannel.members.random().displayName}`)
                        }
                    }
                }
            }

            // todo create channel
            if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith(settings.nameStartsWith)) {
                newMember.guild.createChannel(`${settings.nameStartsWithTemp}${newMember.displayName}`, {
                    type: "voice",
                    userLimit: settings.userLimit,
                    reason: settings.reason
                }).then(cloneChannel => newMember.setVoiceChannel(cloneChannel))
            }
        });

    }
}