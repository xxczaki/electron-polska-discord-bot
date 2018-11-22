# Electron Polska Bot :electron:

> Discord Bot for Polish Electron Community's server.

[![Build Status](https://travis-ci.org/xxczaki/discord-bot.svg?branch=master)](https://travis-ci.org/xxczaki/discord-bot) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

## Usage

Install dependencies:
```
npm install
```

Run the bot:
```
npm start
```

## Commands

```
!pomoc - Show help message
!linki - Show useful links related to the Electron Framework
!ping - Check user's ping
!changelog - Get changelog from the latest Electron version
```

## Config

Config is stored in the [`config.js`](https://github.com/xxczaki/discord-bot/blob/master/config.json) file:

**prefix**

Default: `!`

Prefix you will use to call the bot.

**botToken**

Your Discord Bot's token. Get one [here](https://discordapp.com/developers/applications/).

**githubToken**

This bot is using the Github's GraphQL API v4. You will need to create a personal access token with the `public_repo` scope [here](https://github.com/settings/tokens).

## Info

Inspired by [Wykoparka](https://github.com/SerekKiri/Wykoparka) :smile:

## Screenshots

![Pomoc](https://imgur.com/HhYE0PK.png)
![Changelog](https://imgur.com/PZZvQR0.png)
![Ping](https://imgur.com/QSAtJU4.png)

### License

MIT
