import { StreamDispatcher, VoiceChannel, VoiceConnection } from 'discord.js';
import ytdl from 'ytdl-core-discord';
import ytpl from 'ytpl';
import { BadVideoUrlError, PlaylistEndError, PlaylistNoPrevError } from '../error-list';
import { IPlayer } from '../interfaces/player';

export default class YoutubePlayer implements IPlayer {
  
    readonly channel: VoiceChannel;
    readonly owner: string;
    private dispatcher!: StreamDispatcher;
    private connection!: VoiceConnection;
    private playlist: Array<string> = [];
    private currentPlaylistIndex = 0;

    constructor(channel: VoiceChannel, userId: string) {
      this.channel = channel;
      this.owner = userId;
    }

    async startPlaylist (url: string): Promise<void> {
      this.playlist.length = 0;

      const playlistInfo = await ytpl(url);
      this.playlist = playlistInfo.items.map(el => el.url);
      this.play(this.playlist[0]);
    }

    async play (url: string): Promise<void> {
      if(!ytdl.validateURL(url)) throw new BadVideoUrlError(this.owner);
      

      this.connection = await this.channel.join();
      this.dispatcher = this.connection.play(await ytdl(url), {type: 'opus', volume: 0.5, highWaterMark: 150 });

      if (process.env.NODE_ENV !== 'production') {
        this.connection.on('debug', console.log);
      }

      this.connection.on('error', (err) => console.error(`connection error: ${err}`));

      this.dispatcher.on('finish', () => {
        try {
          this.next();
        } catch (error) {
          this.stop();
        }
      });
      this.dispatcher.on('error', (err) => console.error(`dispatcher error: ${err}`));
    }
    
    async stop (): Promise<void> {
      await this.connection.disconnect();
    }

    async next (): Promise<void> {
      if (this.playlist.length > 0 && this.currentPlaylistIndex !== this.playlist.length - 1) {
        this.currentPlaylistIndex += 1;
        this.play(this.playlist[this.currentPlaylistIndex]);
      } else {
        throw new PlaylistEndError(this.owner);
      }
    }

    async prev (): Promise<void> {
      if (this.playlist.length > 0 && this.currentPlaylistIndex !== 0) {
        this.currentPlaylistIndex -= 1;
        this.play(this.playlist[this.currentPlaylistIndex]);
      } else {
        throw new PlaylistNoPrevError(this.owner);
      }
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
