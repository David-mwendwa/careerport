import { StatusCodes } from 'http-status-codes';
import Job from '../models/Job.js';
import mongoose from 'mongoose';
import dayjs from 'dayjs';

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ success: true, jobs });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ success: true, job });
};

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ message: 'job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ message: 'job deleted', job: removedJob });
};

export const showStats = async (req, res) => {
  const defaultStats = {
    pending: 22,
    interview: 13,
    declined: 4,
  };
  let monthlyApplications = [
    {
      date: 'May 23',
      count: 12,
    },
    {
      date: 'Jun 23',
      count: 18,
    },
    {
      date: 'Jul 23',
      count: 9,
    },
  ];
  res.status(StatusCodes.OK).send({ defaultStats, monthlyApplications });
};
