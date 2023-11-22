import { Client } from 'pg';

export class Database {
  private client: Client | null = null;

  public async ConnectDatabase() {
    this.client = new Client({
        // ur database params
    });
    try {
      await this.client.connect();
    } catch (e) {
      console.log(e);
    }
  }
  public async createUser(
    username: string,
    password: string
  ): Promise<boolean> {
    if (!this.client) {
      await this.ConnectDatabase();
    }
    try {
      const query: string = `INSERT INTO jwtauth (username, password)
        VALUES ('${username}', '${password}')
        `;
      await this.client?.query(query);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
