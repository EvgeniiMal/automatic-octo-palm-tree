import { ICustomError } from '../common/global-interfaces/customError';

export class NoVoiceChannelError implements ICustomError {
  readonly errorMessage;
  readonly responseMessage;

  constructor(userId: string) {
    this.responseMessage = `<@${userId}> Sorry, but you not on a voice channel`;
    this.errorMessage = `${userId} not on voice channel`;
  }
}

export class BadVideoUrlError implements ICustomError {
  readonly errorMessage;
  readonly responseMessage;

  constructor(userId: string) {
    this.responseMessage = `<@${userId}>  Sorry, but your URL is invalid`;
    this.errorMessage = `${userId} send invalid yutube video URL`;
  }
}
export class channelAlreadyUsedError implements ICustomError {
  readonly errorMessage;
  readonly responseMessage;

  constructor(userId: string) {
    this.responseMessage = `<@${userId}>  Sorry, but channel already used`;
    this.errorMessage = `${userId} failed to connect a channel, where the bot is exist`;
  }
}
export class PlaylistEndError implements ICustomError {
  readonly errorMessage;
  readonly responseMessage;

  constructor(userId: string) {
    this.responseMessage = `<@${userId}>  nothing to play next`;
    this.errorMessage = `${userId} playlist end`;
  }
}

export class PlaylistNoPrevError implements ICustomError {
  readonly errorMessage;
  readonly responseMessage;

  constructor(userId: string) {
    this.responseMessage = `<@${userId}>  current track on the first position`;
    this.errorMessage = `${userId} trying to get >0 track`;
  }
}
