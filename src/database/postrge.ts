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

  private dsntHaveClient = async () => {
    if (!this.client) {
      await this.ConnectDatabase();
    }
  };

  private async checkUsernameExists(username: string): Promise<any> {
    const query: string = 'SELECT username FROM jwtauth WHERE username = $1';
    const value = [username];
    const result = await this.client?.query(query, value);
    return await result?.rows[0];
  }

  public async createUser(
    username: string,
    password: string
  ): Promise<boolean> {
    this.dsntHaveClient();
    const userExists = await this.checkUsernameExists(username);
    if (userExists) return false;
    const query: string =
      'INSERT INTO public."jwtauth" (username, password) VALUES ($1, $2)';
    const values = [username, password];
    await this.client?.query(query, values);
    return true;
  }

  public async getUser(username: string, password: string): Promise<any[]> {
    this.dsntHaveClient();
    const query: string =
      'SELECT username FROM jwtauth WHERE username = $1 AND password = $2';
    const values = [username, password];
    const result = await this.client?.query(query, values);
    console.log(result?.rows[0]);
    return await result?.rows[0];
  }

  public async deleteUser(username: string): Promise<any[] | undefined> {
    this.dsntHaveClient();
    const userExists = await this.checkUsernameExists(username);
    if (!userExists) return undefined;
    const query = 'DELETE FROM jwtauth WHERE username = $1';
    const values = [username];
    const result = await this.client?.query(query, values);
    console.log(result?.rows[0]);
  }
}
