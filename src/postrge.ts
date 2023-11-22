import { Client } from 'pg';

export class Database {
  private client: Client | null = null;

  public async ConnectDatabase() {
    this.client = new Client({
      host: 'localhost',
      port: 5432,
      database: 'Test',
      user: 'postgres',
      password: 's5620925'
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
      const query: string = `INSERT INTO jwtauth (${username}, ${password})
        VALUES ('User', 'User')
        `;
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
