import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/auth.js';

const app = express();

app.use(cookieParser());
app.use(express.json());
if (!/production/.test(process.env.NODE_ENV)) {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'not found' });
});

app.use(errorHandlerMiddleware);

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
