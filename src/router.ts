import { VoiceState } from 'discord.js';
import { messageDTO } from './common/dto/messageDTO';
import { IService } from './common/global-interfaces/service';


export default class Router {
  private services: Map<string, IService> = new Map();
  
  registerService(prefix: string ,service: IService): void {
    this.services.set(prefix, service);
  }

  async routeMessage (message: messageDTO): Promise<void> {
    const { prefix } = message;

    const service = this.services.get(prefix);

    await service?.handleMessage(message);
  }

  updateVoiceState(oldState: VoiceState, newState: VoiceState): void {
    for (const service of this.services.values()) {
      service.updateUserVoiceState(oldState, newState);
    }
  } 
}
