import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

// routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/auth.js';

// public
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cookieParser());
app.use(express.json());
if (!/production/.test(process.env.NODE_ENV)) {
  app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './public')));

app.get('/api/v1/test', (req, res) => {
  res.json({ message: 'text route' });
});

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

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
