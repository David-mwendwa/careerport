import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: 'user created' });
};

export const login = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).json({ success: true, user });
};
