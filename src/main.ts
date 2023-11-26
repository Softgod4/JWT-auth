import express, { Express, Request, Response } from 'express';
import AuthController from './controller/auth.control';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;
const jsonParser = express.json();

app.use(express.json());
app.use(bodyParser.json());

const authController = new AuthController();

app.post('/api', authController.createAccount);
app.get('/api', authController.getAccounts);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/' + 'static/' + 'index.html');
});

app.listen(port, () => {
  console.log('server start on localhost:' + port);
});
