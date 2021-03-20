import { Client } from 'discord.js';

export default class DiscordBot {
  public client: Client;
  private token: string;
  

  constructor(token: string | undefined) {
    if (!token) throw new Error('Discord token not found');

    this.client = new Client();
    this.token = token;
  }

  async login(): Promise<void> {
    await this.client.login(this.token);
    console.log(`Logged in as ${this.client.user}!`);
  }
}
