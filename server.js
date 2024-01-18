import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import express from 'express';
import { nanoid } from 'nanoid';

const jobs = [
  { id: nanoid(), company: 'google', position: 'frontend' },
  { id: nanoid(), company: 'facebook', position: 'backend' },
  { id: nanoid(), company: 'apple', position: 'full-stack developer' },
];

const app = express();

app.use(express.json());
if (!/production/.test(process.env.NODE_ENV)) {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res
      .status(400)
      .json({ message: 'Please provide company and position' });
  }
  const job = { id: nanoid(10), company, position };
  jobs.push(job);
  res.json({ job });
});

app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  let job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: `No job with id: ${id}` });
  }
  res.status(200).json({ job });
});

app.patch('/api/v1/jobs/:id', (req, res) => {
  const { company, position } = req.body;
  const { id } = req.params;
  let job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ message: `No job with id: ${id}` });
  }
  job = { ...job, company, position };
  res.status(200).json({ message: 'job modified', job });
});

app.delete('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  let job = jobs.find((job) => job.id == id);
  if (!job) {
    return res.status(404).json({ message: `No job with id: ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ message: 'job deleted', newJobs });
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}...`);
});
