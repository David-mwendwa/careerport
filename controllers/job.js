import { StatusCodes } from 'http-status-codes';
import Job from '../models/Job.js';

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ success: true, jobs });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job = await Job.create({ company, position });
  res.status(StatusCodes.CREATED).json({ success: true, job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ message: `No job with id: ${id}` });
  }
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedJob) {
    return res.status(404).json({ message: `No job with id: ${id}` });
  }
  res.status(StatusCodes.OK).json({ message: 'job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  if (!removedJob) {
    return res.status(404).json({ message: `No job with id: ${id}` });
  }
  res.status(StatusCodes.OK).json({ message: 'job deleted', job: removedJob });
};
