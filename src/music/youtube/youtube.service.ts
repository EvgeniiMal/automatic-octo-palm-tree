import YoutubePlayer from './player';
import { IPlayerService } from '../interfaces/player.service';
import { messageDTO } from '../../common/dto/messageDTO';
import { commands } from '../commands/yt.player.commands';
import { CommandName, ICommand } from '../interfaces/player.command';
import { VoiceState } from 'discord.js';
import { BadVideoUrlError, NoVoiceChannelError } from '../error-list';
import ytdl from 'ytdl-core-discord';


export default class YotubePlayersService implements IPlayerService {
  private players: Map<string, YoutubePlayer> = new Map();
  private commands: Record<CommandName, ICommand>;

  constructor() {
    this.commands = commands;
  }
  
  async updateUserVoiceState(oldState: VoiceState, newState: VoiceState): Promise<void> {
    const userId = newState.id;
    const userPlayer = this.players.get(userId);

    if (!userPlayer) return;
    
    await userPlayer.stop();
    this.players.delete(userId);
  }

  async handleMessage (message: messageDTO): Promise<void>{
    const { member, author, command, args } = message;

    const action = this.commands[command];
    const voiceChannel =  member?.voice.channel;
    const userId = author.id;
    const videoUrl = args[0];
  
    if(!voiceChannel) throw new NoVoiceChannelError(userId);
    if(!action || !videoUrl) return;
    if(!ytdl.validateURL(videoUrl)) throw new BadVideoUrlError(userId);

    const userPlayer = this.players.get(userId);

    if (userPlayer) {
      await action.execute(userPlayer, args);
    } else {
      const userPlayer = new YoutubePlayer(voiceChannel, userId);
      this.players.set(userId, userPlayer);
      await action.execute(userPlayer, args);
    }
    
  }
}
