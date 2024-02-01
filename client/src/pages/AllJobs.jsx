import { useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { JobsContainer, SearchContainer } from '../components';
import { createContext, useContext } from 'react';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/jobs');
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    return error;
  }
};

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
