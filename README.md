<div align="center">
  <p>
    <a href="https://nodei.co/npm/discord.js-temporary-channel/">
    <img src="https://nodei.co/npm/discord.js-temporary-channel.png?downloads=true&stars=true" alt="NPM info" /></a>
  </p>
</div>

# Discord.js-Temporary-Channel (Only for voice channel)

![Typescript](https://img.shields.io/badge/Typescript-4.4.x.dev-brightgreen.svg?logo=typescript&style=for-the-badge)
![Node 16](https://img.shields.io/badge/NodeJS-16.6.1-brightgreen.svg?logo=node.js&style=for-the-badge)

### QR

<img align="left" width="235" height="235" src="./qrcode/invite.gif">

### Important

-   **Version 3, we support discord.js version 13, support typescript**

-   **Version 2, we support discord.js version 12**

-   **Version 1, we support discord.js version less than 12**

### Thanks to Pie from RDVN

```npm
npm i discord.js-temporary-channel
yarn add discord.js-temporary-channel
```

```ts
import { Client, Intents } from "discord.js";

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
});

import TVC from "discord.js-temporary-channel";

const VC = new TVC(client, {
    userLimit: 23,
    reason: "powered by ds112",
    nameStartWith: "3AT ",
    nameStartWithTemporary: "* ",
});

// todo: create voice public
VC.autoCreateTemporaryVoiceChannel();

// todo: create voice private, thanks to @nodgear
// Private channel method (Only creator has access)
VC.autoCreateTemporaryVoiceChannelPrivate();
// You need to come up with your own implementation on how to invite another users to this channel.
client.on("ready", () => {
    console.log(`Logged in as ${client?.user?.tag}!`);
});

client.login("TOKEN");
```

## API

### autoCreateTemporaryVoiceChannelPrivate(): new channel created will be private

```

```
