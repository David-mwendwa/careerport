import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';

const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow
          labelText='first name'
          type='text'
          name='firstName'
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
          defaultValue='david1234'
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
      </form>
    </Wrapper>
  );
};

export default Register;
