import { CommandName, ICommand } from '../interfaces/player.command';


export const commands: Record<CommandName, ICommand> = {
  'list': {
    name: 'list',
    execute: async (player, args) => {
      await player.startPlaylist(args[0]);
    } 
  },
  'play': {
    name: 'play',
    execute: async (player, args) => {
      await player.play(args[0]);
    },
  },
  'stop': {
    name: 'stop',
    execute: async (player) => await player.stop(),
  },
  'next': {
    name: 'next',
    execute: async (player) => await player.next(),
  },
  'prev': {
    name: 'stop',
    execute: async (player) => await player.prev(),
  },
  'volume': {
    name: 'volume',
    execute: async (player, args) => await player.setVolume(parseFloat(args[0])),
  },
  'pause': {
    name: 'pause',
    execute: async (player) => await player.pause(),
  },
  'resume': {
    name: 'resume',
    execute: async (player) => await player.resume(),
  },
};
