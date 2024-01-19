import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import express from 'express';

// routers
import jobRouter from './routes/jobRouter.js';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
if (!/production/.test(process.env.NODE_ENV)) {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/jobs', jobRouter);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'something went wrong' });
});

// connection
const PORT = process.env.PORT || 5000;
try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
