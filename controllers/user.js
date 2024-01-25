import { StatusCodes } from 'http-status-codes';

import User from '../models/User.js';
import Job from '../models/Job.js';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ success: true, user });
};

export const getApplicationStats = (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'get app stats' });
};

export const updateUser = (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'updated user' });
};
