export interface IPlayer {
  readonly owner: string;
  play(url: string): Promise<void>;
  stop(): Promise<void> ;
  setVolume(percent: number): Promise<void>;
  pause(): void;
  resume(): void;
}
