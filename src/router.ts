import { VoiceState } from 'discord.js';
import { messageDTO } from './DTOs/messageDTO';
import { IService } from './global-interfaces/service';


export default class Router {
  private services: Map<string, IService> = new Map();
  
  registerService(prefix: string ,service: IService): void {
    this.services.set(prefix, service);
  }

  routeMessage (message: messageDTO): void {
    const { prefix } = message;

    const service = this.services.get(prefix);

    service?.handleMessage(message);
  }

  updateVoiceState(oldState: VoiceState, newState: VoiceState): void {
    for (const service of this.services.values()) {
      service.updateUserVoiceState(oldState, newState);
    }
  } 
}
