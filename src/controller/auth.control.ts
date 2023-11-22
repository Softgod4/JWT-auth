import { Request, Response } from 'express';
import { Database } from '../postrge';

class AuthController {
  async createAccount(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    const database = new Database();
    database.ConnectDatabase();
  }
  async getAccounts(req: Request, res: Response) {}
  async deleteAccounts(req: Request, res: Response) {}
}

export default AuthController;
