import { Request, Response } from 'express';
import { Database } from '../postrge';
import { secretKey } from '../config';

const generateAccessToken = (id: string, roles: string | undefined) => {
  const payload = {
    id,
    roles
  };
};

class AuthController {
  async createAccount(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    const database = new Database();
    database.ConnectDatabase();
    database.createUser('softgod', '123');
  }
  async getAccounts(req: Request, res: Response) {}
  async deleteAccounts(req: Request, res: Response) {}
}

export default AuthController;
