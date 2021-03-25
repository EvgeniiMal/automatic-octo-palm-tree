import { StreamDispatcher, VoiceChannel, VoiceConnection } from 'discord.js';
import ytdl from 'ytdl-core-discord';
import { BadVideoUrlError } from '../error-list';
import { IPlayer } from '../interfaces/player';

export default class YoutubePlayer implements IPlayer {
  
    private channel: VoiceChannel;
    readonly owner: string;
    private dispatcher!: StreamDispatcher;
    private connection!: VoiceConnection; 

    constructor(channel: VoiceChannel, userId: string) {
      this.channel = channel;
      this.owner = userId;
    }

    async play (url: string): Promise<void> {
      if(!ytdl.validateURL(url)) throw new BadVideoUrlError(this.owner);

      this.connection = await this.channel.join();
      this.dispatcher = this.connection.play(await ytdl(url), {type: 'opus', volume: 0.5, highWaterMark: 100 });

      this.connection.on('error', (err) => console.error(`connection error: ${err}`));

      this.dispatcher.on('finish', () => this.stop());
      this.dispatcher.on('error', (err) => console.error(`dispatcher error: ${err}`));
    }
    
    async stop (): Promise<void> {
      await this.connection.disconnect();
    }

    async setVolume(scale: number): Promise<void> {
      await this.dispatcher.setVolume(scale);
    }

    async pause(): Promise<void> {
      await this.dispatcher.pause();
    }
    async resume(): Promise<void> {
      await this.dispatcher.resume();
    }
}
