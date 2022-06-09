import { useState } from 'react';
import axios from 'axios';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './register.scss';

import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import zxcvbn from 'zxcvbn';
import * as yup from 'yup';

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
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const emailSchema = yup.object({
    email: yup
      .string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
  });
  const passSchema = yup.object({
    password: yup.string().max(255).required('Password is required'),
  });

  const email = useRef();
  const navigate = useNavigate();

  const handleBlur = (e) => {
    if (e.target.type === 'email') {
      if (e.target.value) setEmailLabelCss('rInputLabelActive');
      else setEmailLabelCss('');
      validateCheck(e.target.value, null);
    } else {
      if (e.target.value) setPassLabelCss('rInputLabelActive');
      else setPassLabelCss('');
      validateCheck(null, e.target.value);
    }
  };

  const handleVisible = (e) => {
    e.preventDefault();
    setPasswordVisible((prev) => !prev);
  };

  const handleChange = (e) => {
    if (e?.target.value) {
      const result = zxcvbn(e?.target.value, [email.current.value]);
      setPassStrengthColor(result.score);
    }
  };

  const validateCheck = async (email, password) => {
    const resultArr = [];
    if (email !== null) {
      const emailResult = await emailSchema
        .validate({
          email,
        })
        .then(function (value) {
          setEmailErr('');
          return true;
        })
        .catch(function (err) {
          setEmailErr(err.errors);
          return false;
        });
      resultArr.push(emailResult);
    }

    if (password !== null) {
      const passResult = await passSchema
        .validate({
          password,
        })
        .then(function (value) {
          setPassErr('');
          return true;
        })
        .catch(function (err) {
          setPassErr(err.errors);
          return false;
        });
      resultArr.push(passResult);
    }

    return resultArr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const result = await validateCheck(email, password);
    if (!result.some((el) => el === false)) {
      const user = {
        email,
        password,
      };
      try {
        await axios.post('/auth/register', user);
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }
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

        <form noValidate onSubmit={handleSubmit}>
          <div className={`rInputSetContainer`}>
            <div className={`rInputLabelContainer`}>
              <label
                htmlFor='email'
                className={`rInputLabel ${emailLabelCss} ${
                  emailErr ? 'labelErr' : ''
                }`}
              >
                Email Address
              </label>
              <div className={`rInputContainer`}>
                <input
                  type='email'
                  id='email'
                  ref={email}
                  className={`rInput ${emailErr ? 'inputErr' : ''}`}
                  onBlur={handleBlur}
                  autocomplete='off'
                />
              </div>
            </div>
            {emailErr && <div className='rInputErr'>{emailErr}</div>}
          </div>
          <div className={`rInputSetContainer`}>
            <div className={`rInputLabelContainer`}>
              <label
                htmlFor='password'
                className={`rInputLabel ${passLabelCss} ${
                  passErr ? 'labelErr' : ''
                }`}
              >
                Password
              </label>
              <div className='rInputContainer'>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id='password'
                  className={`rInput ${passErr ? 'inputErr' : ''}`}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autocomplete='off'
                />
              </div>
            </div>
            {passErr && <div className='rInputErr'>{passErr}</div>}
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
          <button className='rButton' type='submit'>
            Register
          </button>
          {error && <span>{error.message}</span>}
        </form>
      </div>
    </div>
  );
};

export default Register;
