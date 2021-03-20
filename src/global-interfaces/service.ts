import { messageDTO } from './messageDTO';

export interface IService {
    handleMessage(message: messageDTO): unknown
}
