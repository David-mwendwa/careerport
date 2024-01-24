import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: 'user created' });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError('invalid credentials');
  res.status(StatusCodes.OK).json({ success: true, user });
};
