import { Request, Response } from 'express';
import { Database } from '../database/postrge';
import { sha256 } from 'js-sha256';

const bodyStatus = (
  req: { body: any },
  res: { sendStatus: (arg0: number) => any }
) => {
  if (!req.body) return res.sendStatus(400);
};

class AuthController {
  public async createAccount(req: Request, res: Response): Promise<void> {
    bodyStatus(req, res);
    const database = new Database();
    const status = await database.createUser(
      req.body.username,
      sha256(req.body.password)
    );
    status ? res.sendStatus(200) : res.sendStatus(404);
  }

  public async getAccounts(req: Request, res: Response): Promise<void> {
    bodyStatus(req, res);
    const database = new Database();
    const status = await database.getUser(
      req.body.username,
      sha256(req.body.password)
    );
    status === undefined ? res.sendStatus(404) : res.sendStatus(200);
  }

  public async deleteAccounts(req: Request, res: Response): Promise<void> {
    bodyStatus(req, res);
    const database = new Database();
    const status = await database.deleteUser(req.body.username);
    status === undefined ? res.sendStatus(200) : res.sendStatus(404);
  }
}

export default AuthController;
