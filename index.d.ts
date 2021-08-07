import { Client } from "discord.js";
declare type TOptions = {
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
    constructor(client: Client, options?: TOptions);
    autoCreateTemporaryVoiceChannel(): Promise<void>;
    autoCreateTemporaryVoiceChannelPrivate(): Promise<void>;
}
export {};
