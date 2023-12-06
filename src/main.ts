import express, { Express, Request, Response } from 'express';
import AuthController from './controller/auth.control';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;
const jsonParser = express.json();

const corsOption = {
  origin: 'http://localhost:5001'
};

app.use(cors(corsOption));
app.use(express.json());
app.use(bodyParser.json());

const authController = new AuthController();

app.post('/api', authController.createAccount);
app.get('/api', authController.getAccounts);
app.delete('/api', authController.deleteAccounts);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/static/dist/' + 'index.html');
});

app.listen(port, () => {
  console.log('server start on localhost:' + port);
});
