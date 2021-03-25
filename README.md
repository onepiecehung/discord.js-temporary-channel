<div align="center">
  <p>
    <a href="https://nodei.co/npm/discord.js-temporary-channel/">
    <img src="https://nodei.co/npm/discord.js-temporary-channel.png?downloads=true&stars=true" alt="NPM info" /></a>
  </p>
</div>

# Discord.js-Temporary-Channel (Only for voice channel)

![javascript](https://img.shields.io/badge/javascript-ESNEXT-brightgreen.svg?logo=javascript&style=for-the-badge)

### Discord: https://discord.gg/TfG5hep

### QR

<img align="left" width="235" height="235" src="./qrcode/invite.gif">

### Important

-   Support ^discord.js@12.5.1 in version 2

-   If you using discord.js version < 12 please using version 1

### Thanks to Pie from RDVN

```npm
npm i discord.js-temporary-channel
yarn add discord.js-temporary-channel
```

```javascript
const Discord = require("discord.js");
const client = new Discord.Client();
const tempChannel = require("discord.js-temporary-channel");

//just call API
tempChannel.autoCreateChannel(client, {
    userLimit: 12,
    reason: "powered by ds112",
    nameStartsWith: "3AT ",
    nameStartsWithTemp: "* ",
});

//Private channel method (Only creator has access)
tempChannel.autoCreateChannelPrivate(client, {
    userLimit: 10,
    reason: "powered by ds112",
    nameStartsWith: "[p] 3AT",
    nameStartsWithTemp: "[p] *"
}); // You need to come up with your own implementation on how to invite another users to this channel.

client.login("YOUR_DISCORD_APP_TOKEN");
```

# API

## autoCreateChannelOnTop(): channel temp always on top.

## autoCreateChannelPrivate(): new channel created will be private
