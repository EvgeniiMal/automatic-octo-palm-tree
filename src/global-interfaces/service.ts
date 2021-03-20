import { VoiceState } from 'discord.js';
import { messageDTO } from '../DTOs/messageDTO';

export interface IService {
    handleMessage(message: messageDTO): unknown,
    updateUserVoiceState(oldState: VoiceState, newState: VoiceState): void,
}
