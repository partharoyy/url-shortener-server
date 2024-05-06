import express from 'express';
import { dbConnectionHandler } from './db.js';
import urlRoutes from './routes/url.route.js';
import 'dotenv/config';

const app = express();

app.use(express.json());

dbConnectionHandler(process.env.MONGODB_CONNECTION_URL).then(() => console.log('Connected to DB'));

app.use('/api/url', urlRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
