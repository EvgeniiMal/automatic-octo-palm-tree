import { Message } from 'discord.js';
import YoutubePlayer from './player';
import { IPlayerService } from '../interfaces/player.service';


export default class YotubePlayersService implements IPlayerService {
  private youtubePlayers: Map<string, YoutubePlayer> = new Map();

  async handleMessage (message: Message): Promise<void> {
      console.log(message.content);
  } 
}
