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
  
  async updateUserVoiceState(oldState: VoiceState, newState: VoiceState): Promise<void> {
    const userId = oldState.id;
    const oldChannelId = oldState.channelID;
    const newChannel = newState.channelID;
    const userPlayer = this.players.get(userId);

    console.log(oldState, newState);

    if (!userPlayer || oldChannelId === newChannel) return;

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

    const userPlayer = this.players.get(userId);

    const channelMembers = voiceChannel.members;
    const bot = channelMembers.find(member => member.user.bot);
    console.log(bot);
    if (bot) {
      if (!userPlayer || bot?.voice.channelID !== userPlayer?.channel.id) {
        throw new channelAlreadyUsedError(userId);
      }
    }

    if (userPlayer) {
      await action.execute(userPlayer, args);
    } else {
      const userPlayer = new YoutubePlayer(voiceChannel, userId);
      this.players.set(userId, userPlayer);
      await action.execute(userPlayer, args);
    }
  }
}
