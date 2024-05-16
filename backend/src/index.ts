import express from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from './utils';
import cors from 'cors';
import dotenv from 'dotenv';
import { customerRoutes, dicesRoutes, pastriesRoutes } from './routes';

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: `http://localhost:${process.env.FRONT_PORT}`,
  credentials: true
}))

const port = process.env.API_PORT || 8080;


app.get('/', (req, res) => {
  res.send("What are you doin' here ?");
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  await connectToDatabase();
});

app.use('/api/customers', customerRoutes);
app.use('/api/dices', dicesRoutes);
app.use('/api/pastries', pastriesRoutes);