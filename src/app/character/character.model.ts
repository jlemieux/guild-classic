export class Character {
  constructor(
    public name: string,
    public server: string,
    public gear: string,
    public id: string,
    public guildId?: string,
    public raidId?: string
  ) {}
}