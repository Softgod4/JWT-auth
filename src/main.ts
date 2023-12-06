import express, { Express, Request, Response } from 'express';
import AuthController from './controller/auth.control';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;
const jsonParser = express.json();

const whitelist = ['http://localhost:5001', 'http://localhost:5001/api'];
const corsOption = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS`));
    }
  }
};

app.use(express.json());
app.use(bodyParser.json());

const authController = new AuthController();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5001');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.post('/api', cors(corsOption), authController.createAccount);
app.get('/api', cors(corsOption), authController.getAccounts);
app.delete('/api', cors(corsOption), authController.deleteAccounts);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/static/dist/' + 'index.html');
});

app.listen(port, () => {
  console.log('server start on localhost:' + port);
});
