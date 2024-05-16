import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { customerRoutes, dicesRoutes, pastriesRoutes } from './routes';

import { connect } from 'mongoose';

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
  res.send("Hello world !");
});

app.listen(port, async () => {
  console.log(`BackEnd listening at http://localhost:${port}`);
  
  try {
		await connect(process.env.MONGO_URI as string);
		console.log('Successfully connected to the database');
	} catch (err) {
		console.error('Error connecting to the database:', err);
		process.exit(1);
	}
});

app.use('/api/customers', customerRoutes);
app.use('/api/dices', dicesRoutes);
app.use('/api/pastries', pastriesRoutes);