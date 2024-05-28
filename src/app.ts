import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;