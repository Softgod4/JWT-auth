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
      const query: string = `INSERT INTO public."jwtauth" (username, password)
        VALUES ('${username}', '${password}')
        `;
      await this.client?.query(query);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async getUser(username: string, password: string): Promise<Boolean> {
    if (!this.client) {
      await this.ConnectDatabase();
    }
    try {
      const query: string = `SELECT username FROM jwtauth WHERE username = '${username}' AND password = '${password}';`;
      await this.client?.query(query, (err, res) => {
        console.log(err ? err.stack : res.rows[0].message);
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
