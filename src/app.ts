
import * as dotenv from 'dotenv';
import DiscordBot from './bot';
import YotubePlayersService from './music/youtube/youtube.service';
import Router from './router';
import config from './config';
import messageToDTO from './utils/messageToDTO';

dotenv.config();

const token  = process.env.DISCORD_TOKEN;

const router = new Router();
const bot = new DiscordBot(token);

const client = bot.client;

const prefixes = config.prefixes;

router.registerService(prefixes.youtubePrefix , new YotubePlayersService());

bot.login().then( async () => {
  client.on('message', (message) => {
    if (message.author.bot) return;
    const messageDTO = messageToDTO(message);
  
    try {
      router.routeMessage(messageDTO);
    } catch (error) {
      console.log('Handle:', error);
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
  console.error('UNHANDLED:', error);
});
