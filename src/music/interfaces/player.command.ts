import { IPlayer } from './player';

export type CommandName = string;

export interface ICommand {
    name: CommandName;
    execute(player: IPlayer, args: Array<string>): Promise<void>;
}
