
import * as dotenv from 'dotenv';
import DiscordBot from './bot';
dotenv.config();

const bot = new DiscordBot(process.env.DISCORD_TOKEN);
const client = bot.client;


bot.login().then(() => {
  client.on('message', async (message) => {
    if (message.author.bot) return;
    try {
      console.log(message.content);
    } catch (error) {
      console.log(error);
    }
  });
});
