import Job from '../models/Job.js';

import { nanoid } from 'nanoid';

const jobs = [
  { id: nanoid(), company: 'google', position: 'frontend' },
  { id: nanoid(), company: 'facebook', position: 'backend' },
  { id: nanoid(), company: 'apple', position: 'full-stack developer' },
];

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({ success: true, jobs });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job = await Job.create({ company, position });
  res.status(201).json({ success: true, job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ message: `No job with id: ${id}` });
  }
  res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
  const { company, position } = req.body;
  const { id } = req.params;
  let job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: `No job with id: ${id}` });
  }
  job = { ...job, company, position };
  res.status(200).json({ message: 'job modified', job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  let job = jobs.find((job) => job.id == id);
  if (!job) {
    return res.status(404).json({ message: `No job with id: ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ message: 'job deleted', newJobs });
};
