import express, { Express, Request, Response } from 'express';
import AuthController from './controller/auth.control';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;
const jsonParser = express.json();

app.use(express.json());
const authController = new AuthController();

app.use('/api', authController.createAccount);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/' + 'static/' + 'index.html');
});

app.listen(port, () => {
  console.log('server start on localhost:' + port);
});
