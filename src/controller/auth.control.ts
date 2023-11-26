import { Request, Response } from 'express';
import { Database } from '../database/postrge';
import { sha256 } from 'js-sha256';
class AuthController {
    async createAccount(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);
    const database = new Database();
    await database.ConnectDatabase();
    try {
      await database.createUser(req.body.user, sha256(req.body.password));
      res.sendStatus(200);
    } catch {
      res.sendStatus(404);
    }
  }
  async getAccounts(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    const database = new Database();
    await database.ConnectDatabase();
    try {
      database.getUser(req.body.user, sha256(req.body.password));
    } catch (e) {
      console.log(e);
    }
  }
  async deleteAccounts(req: Request, res: Response) {}
}

export default AuthController;
