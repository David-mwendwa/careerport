import { StatusCodes } from 'http-status-codes';

import User from '../models/User.js';
import Job from '../models/Job.js';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ success: true, user });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ sucess: true, users, jobs });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.passwird;
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj, {
    new: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ message: 'updated user', user: updatedUser });
};
