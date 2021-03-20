import { Message } from "discord.js";
import { messageDTO } from "../global-interfaces/messageDTO";

export default (message: Message): messageDTO => {
  const { content, member, author } = message;

  if (!member) throw new Error('User is not a guild member');

  const [prefix, command, ...args] = content.split(' ');

  return {
  prefix,
  command,
  args,
  author,
  member,
  origin: message
  }
}
