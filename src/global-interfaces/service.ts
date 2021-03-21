import { VoiceState } from 'discord.js';
import { messageDTO } from '../dto/messageDTO';

export interface IService {
    handleMessage(message: messageDTO): void,
    updateUserVoiceState(oldState: VoiceState, newState: VoiceState): void,
}
