import { Request, Response } from 'express';
import { Database } from '../database/postrge';
import { sha256 } from 'js-sha256';

class AuthController {
  async createAccount(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);
    const database = new Database();
    try {
      await database.createUser(req.body.username, sha256(req.body.password));
      res.sendStatus(200);
    } catch {
      res.sendStatus(404);
    }
  }

  async getAccounts(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);
    const database = new Database();
    const status = await database.getUser(
      req.body.username,
      sha256(req.body.password)
    );
    status === undefined ? res.sendStatus(404) : res.sendStatus(200);
  }

  async deleteAccounts(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);
    const database = new Database();
    const status = await database.deleteUser(
      req.body.username,
      sha256(req.body.password)
    );
    status === undefined ? res.sendStatus(404) : res.sendStatus(200);
  }
}

export default AuthController;
