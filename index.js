
module.exports = {
    autoCreateChannelPrivate: async (client, options) => {
        class setting {
            constructor() {
                this.options = options;
                this.userLimit = (options && options.userLimit) || 17;
                this.reason = (options && options.reason) || "Canal temporário";
                this.nameStartsWith = (options && options.nameStartsWith) || "+ ";
                this.nameStartsWithTemp = (options && options.nameStartsWithTemp) || "* ";
            }
        }
        let settings = new setting()
        client.on('voiceStateUpdate', (oldMember, newMember) => {
            // ! leave
            let isLeave = (oldMember.channel != undefined)

            if (isLeave) {
                // console.log(isLeave);
                if (oldMember.channel.name.startsWith(settings.nameStartsWithTemp)) {
                    if (oldMember.channel.members.size == 0) {
                        oldMember.channel.delete()
                    }
                    else { // change name
                        let matchMember = oldMember.channel.members.find(x => `${settings.nameStartsWithTemp}${x.displayName}` == oldMember.channel.name);
                        if (matchMember == null) {
                            oldMember.channel.setName(`${settings.nameStartsWithTemp}${oldMember.channel.members.random().displayName}`)
                        }
                    }
                }
            }

            if (newMember.channel != null && newMember.channel.name.startsWith(settings.nameStartsWith)) {
                const everyone = newMember.guild.roles.everyone;
                newMember.guild.channels.create(`${settings.nameStartsWithTemp}${newMember.member.user.username}`, {
                    type: "voice",
                    parent: newMember.channel.parent,
                    userLimit: settings.userLimit,
                    reason: settings.reason,
                    permissionOverwrites: [
                        {
                            id: everyone.id,
                            deny: ['CONNECT'],
                        },
                        {
                            id: newMember.member.user.id,
                            allow: ['CONNECT', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS']
                        }
                    ]
                })
                .then(cloneChannel => newMember.setChannel(cloneChannel))
                .catch( console.log() )
            }
        });

    },
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
            let isLeave = (oldMember.channel != undefined)

            if (isLeave) {
                console.log(isLeave);
                if (oldMember.channel.name.startsWith(settings.nameStartsWithTemp)) {
                    if (oldMember.channel.members.size == 0) {
                        oldMember.channel.delete()
                    }
                    else { // change name
                        let matchMember = oldMember.channel.members.find(x => `${settings.nameStartsWithTemp}${x.displayName}` == oldMember.channel.name);
                        if (matchMember == null) {
                            oldMember.channel.setName(`${settings.nameStartsWithTemp}${oldMember.channel.members.random().displayName}`)
                        }
                    }
                }
            }

            // todo create channel
            if (newMember.channel != null && newMember.channel.name.startsWith(settings.nameStartsWith)) {
                newMember.guild.channels.create(`${settings.nameStartsWithTemp}${newMember.member.user.username}`, {
                    type: "voice",
                    parent: newMember.channel.parent,
                    userLimit: settings.userLimit,
                    reason: settings.reason
                }).then(cloneChannel => newMember.setChannel(cloneChannel))
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
            let isLeave = (oldMember.channel != undefined)
            if (isLeave) {
                if (oldMember.channel.name.startsWith(settings.nameStartsWithTemp)) {
                    if (oldMember.channel.members.size == 0) {
                        oldMember.channel.delete()
                    }
                    else { // change name
                        let matchMember = oldMember.channel.members.find(x => `${settings.nameStartsWithTemp}${x.displayName}` == oldMember.channel.name);
                        if (matchMember == null) {
                            oldMember.channel.setName(`${settings.nameStartsWithTemp}${oldMember.channel.members.random().displayName}`)
                        }
                    }
                }
            }

            // todo create channel
            if (newMember.channel != null && newMember.channel.name.startsWith(settings.nameStartsWith)) {
                newMember.guild.channels.create(`${settings.nameStartsWithTemp}${newMember.member.user.username}`, {
                    type: "voice",
                    userLimit: settings.userLimit,
                    reason: settings.reason
                }).then(cloneChannel => newMember.setChannel(cloneChannel))
            }
        });

    }
}
