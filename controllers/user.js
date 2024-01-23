import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ success: true, user });
};

export const login = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).json({ success: true, user });
};
