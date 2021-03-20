import YoutubePlayer from './player';
import { IPlayerService } from '../interfaces/player.service';
import { messageDTO } from '../../DTOs/messageDTO';
import { commands } from '../commands/yt.player.commands';
import { CommandName, ICommand } from '../interfaces/player.command';
import { VoiceState } from 'discord.js';


export default class YotubePlayersService implements IPlayerService {
  private players: Map<string, YoutubePlayer> = new Map();
  private commands: Record<CommandName, ICommand>;

  constructor() {
    this.commands = commands;
  }
  
  updateUserVoiceState(oldState: VoiceState, newState: VoiceState): void {
    const userId = newState.id;
    const userPlayer = this.players.get(userId);

    if (!userPlayer) return;
    
    userPlayer.stop();
    this.players.delete(userId);
  }

  handleMessage (message: messageDTO): void {
    const { member, author, command, args } = message;

    const action = this.commands[command];
    const voiceChannel =  member?.voice.channel;
    const userId = author.id;
  
    if(!voiceChannel || !command) return;

    const userPlayer = this.players.get(userId);

    if (userPlayer) {
      action.execute(userPlayer, args);
    } else {
      const userPlayer = new YoutubePlayer(voiceChannel, userId);
      this.players.set(userId, userPlayer);
      action.execute(userPlayer, args);
    }
    
  }
}
