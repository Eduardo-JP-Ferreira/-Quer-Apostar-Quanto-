import express from 'express';
import cors from 'cors';
import router from './routers';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!!'))
  .use('/', router);


export default app;