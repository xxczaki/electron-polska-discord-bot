const Discord = require('discord.js');
const latestVersion = require('latest-version');
const {GitHub} = require('github-graphql-api');
const config = require('./config.json');

const client = new Discord.Client();
const github = new GitHub({token: config.githubToken});

// Convert to ms
function round(n, k) {
	const factor = 10 ** k;
	return Math.round(n * factor) / factor;
}

// Ready state
client.on('ready', () => {
	console.log(`Zalogowano jako ${client.user.tag}!`);
	client.user.setActivity('!pomoc');
});

// Send a welcome message, if a new member joins the server
client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find(ch => ch.name === 'powitania');
	if (!channel) {
		return;
	}
	channel.send(`Witaj na serwerze, ${member}!`);
});

// Commands
client.on('message', async message => {
	if (message.content.substring(0, config.prefix.length) === config.prefix) {
		const command = message.content.slice(config.prefix.length);

		// Show help message
		if (command === 'pomoc') {
			try {
				const embed = {
					title: 'Dostępne komendy:',
					color: 0x01579B,
					description: `
!pomoc - wyświetla wiadomość pomocniczą
!linki - wyświetla listę przydatnych linków
!changelog - wyświetla opis zmian dokonanych w najnowszej wersji Electrona
!ping - podaje ping użytkownika
         `,
					footer: {
						icon_url: 'https://imgur.com/I04By3T.png',
						text: 'Bot rozwijany jest przez Linuxa'
					}
				};
				await message.channel.send({embed});
			} catch (error) {
				console.log(error);
			}
		}

		// Show useful links related to the Electron Framework
		if (command === 'linki') {
			try {
				const embed = {
					title: 'Przydatne linki:',
					color: 0x01579B,
					description: `
- ${'[Strona społeczności Electron Polska](https://electronpl.github.io)'}
- ${'[Główna strona projektu Electron](https://electronjs.org/)'}
- ${'[Dokumentacja projektu Electron](https://electronjs.org/docs)'}
- ${'[Ciekawe zasoby związane z projektem Electron](https://github.com/sindresorhus/awesome-electron)'}
- ${'[Strona do tłumaczenia dokumentacji projektu na Język polski](https://crowdin.com/project/electron/pl#)'}
         `,
					footer: {
						icon_url: 'https://imgur.com/I04By3T.png',
						text: 'Bot rozwijany jest przez Linuxa'
					}
				};
				await message.channel.send({embed});
			} catch (error) {
				console.log(error);
			}
		}

		// Check user's ping
		if (command === 'ping') {
			try {
				const {ping} = client;
				const embed = {
					title: 'Pong!',
					color: 0x01579B,
					description: `Twój ping wynosi około: ${'`' + round(ping, 0) + 'ms' + '`'}`,
					footer: {
						icon_url: 'https://imgur.com/I04By3T.png',
						text: 'Bot rozwijany jest przez Linuxa'
					}
				};
				await message.channel.send({embed});
			} catch (error) {
				console.log(error);
			}
		}

		// Get changelog from the latest Electron version
		if (command === 'changelog') {
			try {
				const version = await latestVersion('electron');
				const info = await github.query(`
				{
					repository(owner: "electron", name: "electron") {
					  release(tagName: "v${version}") {
						description
					  }
					}
				  }				  
				`);
				const embed = {
					title: `Electron ${version}`,
					color: 0x01579B,
					description: `
					${'```markdown\n' + info.repository.release.description + '\n' + '```'}
					`,
					footer: {
						icon_url: 'https://imgur.com/I04By3T.png',
						text: 'Bot rozwijany jest przez Linuxa'
					}
				};
				await message.channel.send({embed});
			} catch (error) {
				console.log(error);
			}
		}
	}
});

// Login using Discord Bot's token
client.login(config.botToken);
