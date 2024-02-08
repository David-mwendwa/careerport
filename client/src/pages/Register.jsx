/* eslint-disable react-refresh/only-export-components */
import { Form, redirect, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('registration successfull');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow
          labelText='name'
          type='text'
          name='name'
          defaultValue='David'
        />
        <FormRow
          labelText='last name'
          type='text'
          name='lastName'
          defaultValue='M'
        />
        <FormRow
          labelText='location'
          type='text'
          name='location'
          defaultValue='earth'
        />
        <FormRow
          labelText='email'
          type='email'
          name='email'
          defaultValue='david@default.com'
        />
        <FormRow
          labelText='password'
          type='password'
          name='password'
          defaultValue='david123'
        />

        <SubmitBtn />
        <p>
          Already a member?{' '}
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
