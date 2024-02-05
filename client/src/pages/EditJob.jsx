import { redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    return redirect('/dashboard/all-jobs');
  }
};

export const action = async () => {
  return null;
};

const EditJob = () => {
  const { job } = useLoaderData();
  console.log(job)

  return <div>EditJob page</div>;
};

export default EditJob;
