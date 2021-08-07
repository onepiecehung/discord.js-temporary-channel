import {
    Client,
    VoiceState,
    Channel,
    Permissions,
    CategoryChannelResolvable,
} from "discord.js";
type TOptions = {
    userLimit?: number;
    nameStartWith?: string;
    nameStartWithTemporary?: string;
    reason?: string;
    guildId?: number | string;
    channelId?: number | string;
};

export default class CTemporaryVoiceChannel {
    protected client: Client;
    protected options?: TOptions;
    protected userLimit: number;
    protected nameStartWith: string;
    protected nameStartWithTemporary: string;
    protected reason: string;

    constructor(client: Client, options?: TOptions) {
        this.client = client;
        this.options = options;
        this.userLimit = options?.userLimit ? options?.userLimit : 23;
        this.nameStartWith = options?.nameStartWith
            ? options?.nameStartWith
            : "3AT ";
        this.nameStartWithTemporary = options?.nameStartWithTemporary
            ? options?.nameStartWithTemporary
            : "* ";
        this.reason = options?.reason ? options?.reason : "powered by DS112";
    }

    public async autoCreateTemporaryVoiceChannel() {
        this.client.on(
            "voiceStateUpdate",
            (oldState: VoiceState, newState: VoiceState) => {
                // ! leave
                const isLeave = oldState?.channel != undefined;
                // todo: check member leave
                if (isLeave) {
                    if (
                        oldState?.channel?.name.startsWith(
                            this.nameStartWithTemporary
                        )
                    ) {
                        switch (oldState?.channel?.members.size) {
                            case 0:
                                try {
                                    oldState?.channel
                                        .fetch()
                                        .then((channel: Channel) =>
                                            channel.delete()
                                        );
                                } catch (error) {
                                    oldState?.channel.delete();
                                }

                                break;

                            case 1:
                                const isBot = oldState?.channel.members.find(
                                    (x: any) => x.user.bot == true
                                );
                                if (isBot) {
                                    try {
                                        oldState?.channel
                                            .fetch()
                                            .then((channel: Channel) =>
                                                channel.delete()
                                            );
                                    } catch (error) {
                                        oldState?.channel.delete();
                                        console.error(error);
                                    }
                                } else {
                                    // todo: change name
                                    let matchMember =
                                        oldState?.channel.members.find(
                                            (x: any) =>
                                                `${this.nameStartWithTemporary}${x.displayName}` ==
                                                oldState?.channel?.name
                                        );
                                    if (matchMember == null) {
                                        oldState?.channel.setName(
                                            `${this.nameStartWithTemporary}${
                                                oldState?.channel.members.random()
                                                    .displayName
                                            }`
                                        );
                                    }
                                }
                                break;

                            default:
                                // todo: change name
                                let matchMember =
                                    oldState?.channel.members.find(
                                        (x: any) =>
                                            `${this.nameStartWithTemporary}${x.displayName}` ==
                                            oldState?.channel?.name
                                    );
                                if (matchMember == null) {
                                    oldState?.channel.setName(
                                        `${this.nameStartWithTemporary}${
                                            oldState?.channel.members.random()
                                                .displayName
                                        }`
                                    );
                                }
                                break;
                        }
                    }
                }

                // todo create channel
                if (
                    newState.channel != null &&
                    newState.channel.name.startsWith(this.nameStartWith)
                ) {
                    const everyone = newState.guild.roles.everyone;
                    newState.guild.channels
                        .create(
                            `${this.nameStartWithTemporary}${newState?.member?.user.username}`,
                            {
                                bitrate: newState.channel.bitrate || 64000,
                                type: "GUILD_VOICE",
                                topic: this.reason,
                                parent: newState?.channel
                                    ?.parent as CategoryChannelResolvable,
                                userLimit: this.userLimit,
                                reason: this.reason,
                                permissionOverwrites: [
                                    {
                                        id: everyone.id,
                                        allow: [Permissions.FLAGS.VIEW_CHANNEL],
                                    },
                                ],
                            }
                        )
                        .then(async (cloneChannel: any) => {
                            newState.setChannel(cloneChannel);
                        });
                }
            }
        );
    }

    public async autoCreateTemporaryVoiceChannelPrivate() {
        this.client.on(
            "voiceStateUpdate",
            (oldState: VoiceState, newState: VoiceState) => {
                // ! leave
                const isLeave = oldState?.channel != undefined;
                // todo: check member leave
                if (isLeave) {
                    if (
                        oldState?.channel?.name.startsWith(
                            this.nameStartWithTemporary
                        )
                    ) {
                        switch (oldState?.channel?.members.size) {
                            case 0:
                                try {
                                    oldState?.channel
                                        .fetch()
                                        .then((channel: Channel) =>
                                            channel.delete()
                                        );
                                } catch (error) {
                                    oldState?.channel.delete();
                                }

                                break;

                            case 1:
                                const isBot = oldState?.channel.members.find(
                                    (x: any) => x.user.bot == true
                                );
                                if (isBot) {
                                    try {
                                        oldState?.channel
                                            .fetch()
                                            .then((channel: Channel) =>
                                                channel.delete()
                                            );
                                    } catch (error) {
                                        oldState?.channel.delete();
                                        console.error(error);
                                    }
                                } else {
                                    // todo: change name
                                    let matchMember =
                                        oldState?.channel.members.find(
                                            (x: any) =>
                                                `${this.nameStartWithTemporary}${x.displayName}` ==
                                                oldState?.channel?.name
                                        );
                                    if (matchMember == null) {
                                        oldState?.channel.setName(
                                            `${this.nameStartWithTemporary}${
                                                oldState?.channel.members.random()
                                                    .displayName
                                            }`
                                        );
                                    }
                                }
                                break;

                            default:
                                // todo: change name
                                let matchMember =
                                    oldState?.channel.members.find(
                                        (x: any) =>
                                            `${this.nameStartWithTemporary}${x.displayName}` ==
                                            oldState?.channel?.name
                                    );
                                if (matchMember == null) {
                                    oldState?.channel.setName(
                                        `${this.nameStartWithTemporary}${
                                            oldState?.channel.members.random()
                                                .displayName
                                        }`
                                    );
                                }
                                break;
                        }
                    }
                }

                // todo create channel
                if (
                    newState.channel != null &&
                    newState.channel.name.startsWith(this.nameStartWith)
                ) {
                    const everyone = newState.guild.roles.everyone;
                    newState.guild.channels
                        .create(
                            `${this.nameStartWithTemporary}${newState?.member?.user.username}`,
                            {
                                bitrate: newState.channel.bitrate || 64000,
                                type: "GUILD_VOICE",
                                topic: this.reason,
                                parent: newState?.channel
                                    ?.parent as CategoryChannelResolvable,
                                userLimit: this.userLimit,
                                reason: this.reason,
                                permissionOverwrites: [
                                    {
                                        id: everyone.id,
                                        deny: [
                                            Permissions.FLAGS.CONNECT,
                                            Permissions.FLAGS.VIEW_CHANNEL,
                                        ],
                                    },
                                    {
                                        id: newState?.member?.user.id as string,
                                        allow: [
                                            Permissions.FLAGS.CONNECT,
                                            Permissions.FLAGS.VIEW_CHANNEL,
                                            Permissions.FLAGS.MOVE_MEMBERS,
                                            Permissions.FLAGS.MUTE_MEMBERS,
                                            Permissions.FLAGS.SPEAK,
                                            Permissions.FLAGS.STREAM,
                                        ],
                                    },
                                ],
                            }
                        )
                        .then(async (cloneChannel: any) => {
                            newState.setChannel(cloneChannel);
                        });
                }
            }
        );
    }
}
