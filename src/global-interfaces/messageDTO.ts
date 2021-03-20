import { GuildMember, Message, User } from "discord.js";

export interface messageDTO {
  prefix: string,
  command: string,
  args: Array<string>,
  author: User,
  member: GuildMember,
  origin: Message
}
