import { messageDTO } from './global-interfaces/messageDTO';
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
}
