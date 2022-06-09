import axios from 'axios';
import zxcvbn from 'zxcvbn';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './register.scss';

import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';

const passMessage = [
  'Weak',
  'Weak',
  'Moderately Strong',
  'Moderately Strong',
  'Strong',
];

const Register = () => {
  const { error } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailLabelCss, setEmailLabelCss] = useState('');
  const [passLabelCss, setPassLabelCss] = useState('');
  const [passStrengthColor, setPassStrengthColor] = useState(0);

  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleBlur = (e) => {
    if (e.target.value) {
      if (e.target.type === 'email') setEmailLabelCss('rInputLabelActive');
      else setPassLabelCss('rInputLabelActive');
    } else {
      if (e.target.type === 'email') setEmailLabelCss('');
      else setPassLabelCss('');
    }
  };

  const handleVisible = (e) => {
    e.preventDefault();
    setPasswordVisible((prev) => !prev);
  };

  const handleChange = (event) => {
    if (event?.target.value) {
      const result = zxcvbn(event?.target.value, [email.current.value]);
      setPassStrengthColor(result.score);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // if (passwordAgain.current.value !== password.current.value) {
    //   passwordAgain.current.setCustomValidity("Passwords don't match!");
    // } else {
    //   const user = {
    //     username: username.current.value,
    //     email: email.current.value,
    //     password: password.current.value,
    //   };
    //   try {
    //     await axios.post('/auth/register', user);
    //     navigate('/login');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  return (
    <div className='Register'>
      <div className='rContainer'>
        <div className='rLogo'>
          <a href='/register'>LOGO</a>
        </div>
        <div className='rTitleContainer'>
          <h3 className='rTitle'>Sign up</h3>
          <span className='rTitleMessage'>
            Enter your credentials to continue
          </span>
        </div>
        <div className='rOption'>
          <button className='rOptionGoogle'>
            <FcGoogle />
            Sign Up With Google
          </button>
          <div className='rOptionOr'>
            <hr className='rOptionOrHr' />
            <button className='rOptionOrBtn'>OR</button>
            <hr className='rOptionOrHr' />
          </div>
          <div className='rOptionEmail'>
            <h6 className='rOtionEmailMessage'>Sign up with Email address</h6>
          </div>
        </div>
        <form noValidate>
          <div className={`rInputSetContainer`}>
            <div className={`rInputLabelContainer`}>
              <label htmlFor='email' className={`rInputLabel ${emailLabelCss}`}>
                Email Address
              </label>
              <div className='rInputContainer'>
                <input
                  type='email'
                  id='email'
                  required
                  ref={email}
                  className={`rInput`}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>
          {/* {touched.password && errors.password && (
            <FormHelperText
              error
              id='standard-weight-helper-text-password-register'
            >
              {errors.password}
            </FormHelperText>
          )} */}
          <div className={`rInputSetContainer`}>
            <div className={`rInputLabelContainer`}>
              <label
                htmlFor='password'
                className={`rInputLabel ${passLabelCss}`}
              >
                Password
              </label>
              <div className='rInputContainer'>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id='password'
                  ref={password}
                  className='rInput'
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button className='rInputBtn' onClick={handleVisible}>
              {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
          <div className='rPasswordStrengthContainer'>
            <div
              className={`rPasswordStrength rPasswordStrengthColor${passStrengthColor}`}
            ></div>
            <h6 className='rPasswordStrengthMessage'>
              {passMessage[passStrengthColor]}
            </h6>
          </div>
          {/* <div className={`rInputSetContainer`}>
            <div className={`rInputLabelContainer`}>
              <label
                htmlFor='passwordAgain'
                className={`rInputLabel`}
              >
                Password Again
              </label>
              <div className='rInputContainer'>
                <input
                  type='passwordAgain'
                  ref={passwordAgain}
                  className='rInput'
                  required
                />
              </div>
            </div>
            <button className='rInputBtn' onClick={handleVisible}>
              {passwordVisible === true ? (
                <AiFillEye />
              ) : (
                <AiFillEyeInvisible />
              )}
            </button>
          </div> */}
          <button onClick={handleClick} className='rButton'>
            Register
          </button>
          {error && <span>{error.message}</span>}
        </form>
      </div>
    </div>
  );
};

export default Register;
