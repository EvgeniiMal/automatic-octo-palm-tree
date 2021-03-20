import { CommandName, ICommand } from '../interfaces/player.command';


export const commands: Record<CommandName, ICommand> = {
  'play': {
    name: 'play',
    execute: async (player, args) => player.play(args[0]),
  },
  'stop': {
    name: 'stop',
    execute: async (player) => player.stop(),
  },
  'volume': {
    name: 'volume',
    execute: async (player, args) => player.setVolume(parseFloat(args[0])),
  },
  'pause': {
    name: 'pause',
    execute: async (player) => player.pause(),
  },
  'resume': {
    name: 'resume',
    execute: async (player) => player.resume(),
  },
};