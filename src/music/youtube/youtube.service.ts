import YoutubePlayer from './player';
import { IPlayerService } from '../interfaces/player.service';
import { messageDTO } from '../../global-interfaces/messageDTO';
import { commands } from '../commands/yt.player.commands';
import { CommandName, ICommand } from '../interfaces/player.command';


export default class YotubePlayersService implements IPlayerService {
  private youtubePlayers: Map<string, YoutubePlayer> = new Map();
  private commands: Record<CommandName, ICommand>;

  constructor() {
    this.commands = commands;
  }

  handleMessage (message: messageDTO): void {
    const { member, author, command, args } = message;

    const action = this.commands[command];
    const voiceChannel =  member?.voice.channel;
    const userId = author.id;
  
    if(!voiceChannel || !command) return;

    const userPlayer = this.youtubePlayers.get(userId);

    if (userPlayer) {
      action.execute(userPlayer, args);
    } else {
      const userPlayer = new YoutubePlayer(voiceChannel, userId);
      this.youtubePlayers.set(userId, userPlayer);
      action.execute(userPlayer, args);
    }
  }
}
