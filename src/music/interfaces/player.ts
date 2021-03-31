import { VoiceChannel } from 'discord.js';

export interface IPlayer {
  readonly owner: string;
  readonly channel: VoiceChannel;
  play(url: string): Promise<void>;
  startPlaylist(url: string): Promise<void>;
  stop(): Promise<void>;
  next(): Promise<void>;
  prev(): Promise<void>;
  setVolume(percent: number): Promise<void>;
  pause(): void;
  resume(): void;
}
