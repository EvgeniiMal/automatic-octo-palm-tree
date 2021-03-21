
import * as dotenv from 'dotenv';
import DiscordBot from './bot';
import YotubePlayersService from './music/youtube/youtube.service';
import Router from './router';
import config from './config';
import messageToDTO from './common/utils/messageToDTO';
import { errorHandler } from './common/errors/error-handler';

dotenv.config();

const token  = process.env.DISCORD_TOKEN;

const router = new Router();
const bot = new DiscordBot(token);

const client = bot.client;

const prefixes = config.prefixes;

router.registerService(prefixes.youtubePrefix , new YotubePlayersService());

bot.login().then( async () => {
  client.on('message', async (message) => {
    if (message.author.bot) return;
  
    try {
      const messageDTO = messageToDTO(message);
  
      await router.routeMessage(messageDTO);
    } catch (error) {
      errorHandler(error, message);
    }
  });
  
  client.on('voiceStateUpdate', async (oldState, newState) => {
    try {
      await router.updateVoiceState(oldState, newState);
    } catch (error) {
      console.log('Handle:', error);
    }
  });
});


process.on('unhandledRejection', error => {
  console.log('UNHANDLED REJECTION:', error);
});
