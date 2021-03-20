import { Message } from 'discord.js';
import { IService } from './global-interfaces/service';


export default class Router {
  private services: Map<string, IService> = new Map();
  
  registerService(prefix: string ,service: IService): void {
    this.services.set(prefix, service);
  }

  async routeCommand (message: Message): Promise<void> {
    const { content } = message;
    const [prefix, command, ...args] = content.split(' ');
  
      const service = this.services.get(prefix);

      service?.handleMessage(message);
  }
}
