
import * as dotenv from 'dotenv';
import DiscordBot from './bot';
import YotubePlayersService from './music/youtube/youtube.service';
import Router from './router';
import config from './config';

dotenv.config();

const token  = process.env.DISCORD_TOKEN;

const router = new Router();
const bot = new DiscordBot(token);

const client = bot.client;

const prefixes = config.prefixes;

router.registerService(prefixes.youtubePrefix , new YotubePlayersService())

bot.login().then(() => {
  client.on('message', async (message) => {
    if (message.author.bot) return;
    try {
      router.routeCommand(message);
    } catch (error) {
      console.log(error);
    }
  });
});
