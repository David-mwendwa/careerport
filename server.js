import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import express from 'express';
import { nanoid } from 'nanoid';

const jobs = [
  { id: nanoid(), company: 'google', position: 'frontend' },
  { id: nanoid(), company: 'facebook', position: 'backend' },
  { id: nanoid(), company: 'apple', position: 'full-stack developer' },
];

const app = express();

app.use(express.json());
if (!/production/.test(process.env.NODE_ENV)) {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/', (req, res) => {
  res.json({ message: 'Data received via POST requirest', data: req.body });
});

app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}...`);
});
