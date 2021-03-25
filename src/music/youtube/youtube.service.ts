import YoutubePlayer from './player';
import { IPlayerService } from '../interfaces/player.service';
import { messageDTO } from '../../common/dto/messageDTO';
import { commands } from '../commands/yt.player.commands';
import { CommandName, ICommand } from '../interfaces/player.command';
import {  VoiceState } from 'discord.js';
import { channelAlreadyUsedError, NoVoiceChannelError } from '../error-list';


export default class YotubePlayersService implements IPlayerService {
  private players: Map<string, YoutubePlayer> = new Map();
  private commands: Record<CommandName, ICommand> = commands;
  private activeChannels: Set<string> = new Set();
  
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
  
    if(!voiceChannel) throw new NoVoiceChannelError(userId);
    if(!action) return;
    console.log(voiceChannel);
    const userPlayer = this.players.get(userId);

    if (userPlayer) {
      await action.execute(userPlayer, args);
    } else {
      if(this.activeChannels.has(voiceChannel.id)) throw new channelAlreadyUsedError(userId);
  
      const userPlayer = new YoutubePlayer(voiceChannel, userId);
      this.activeChannels.add(voiceChannel.id);
      this.players.set(userId, userPlayer);
      await action.execute(userPlayer, args);
    }
    
  }
}
