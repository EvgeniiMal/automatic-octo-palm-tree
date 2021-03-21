import { Message } from 'discord.js';
import { ICustomError } from '../global-interfaces/customError';

export const errorHandler = (err: ICustomError, message: Message): void => {
  const { errorMessage, responseMessage } = err;

  console.log(errorMessage);

  if (responseMessage) {
    message.channel.send(responseMessage);
  }
};
