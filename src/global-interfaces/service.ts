import { Message } from 'discord.js';

export interface IService {
    handleMessage(message: Message): Promise<void>
}