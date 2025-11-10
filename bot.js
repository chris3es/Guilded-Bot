require('dotenv').config();
const { Client } = require('guilded.js');
const axios = require('axios'); // Install with: npm install axios
const client = new Client({ token: process.env.BOT_TOKEN });

client.on('ready', () => {
    console.log(`Bot is online as ${client.user.name}`);
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!bff')) {
        const args = message.content.split(' ');

        if (args.length === 4) {
            const robloxUsername = args[1];
            const timeValue = parseInt(args[2]);
            const timeUnit = args[3];

            const validUnits = ['d', 'm', 's', 'y', 'months'];
            if (!validUnits.includes(timeUnit)) {
                return message.reply(`Invalid time unit. Use one of: ${validUnits.join(', ')}`);
            }

            // Send to Roblox webhook
            try {
                await axios.post('https://your-roblox-endpoint.com/revoke-feedback', {
                    username: robloxUsername,
                    duration: timeValue,
                    unit: timeUnit
                });

                message.reply(`Revoked feedback UI for **${robloxUsername}** for **${timeValue} ${timeUnit}**.`);
            } catch (error) {
                console.error(error);
                message.reply('Failed to send command to Roblox.');
            }
        } else {
            message.reply('Usage: `!bff <robloxUsername> <timeValue> <timeUnit>`');
        }
    }
});

client.login();
