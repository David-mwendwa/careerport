/* eslint-disable react-refresh/only-export-components */
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    return redirect('/login');
  } catch (error) {
    console.log(error);
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

        <button type='submit' className='btn btn-block'>
          submit
        </button>
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
