import morgan from 'morgan';
dotenv.config();
import express from 'express';
import dotenv from 'dotenv';

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}...`);
});
