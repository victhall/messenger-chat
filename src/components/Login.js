import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import Card from '../UI/Card';
import Modal from '../UI/Modal';
import classes from './Login.module.css';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let errorAudio = new Audio('../../error.mp3');

  async function submitHandler(event) {
    event.preventDefault();
    try {
      setError('');
      setIsLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/')
    } catch {
      errorAudio.play();
      setError({
        title: 'Login Failed',
        message: 'Your email or password is incorrect. Please try again.'
      });
    };

    setIsLoading(false);
  };

  const errorHandler = function () {
    setError(null);
  };

  return (
    <>
      {error && <Modal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card>
        <div className={classes['inner-login__container']}>
          <div className={classes['login-title']}>
            <h2>Log In</h2>
          </div>
          <form onSubmit={submitHandler}>
            <div className={classes.inputs}>
              <label>E-mail address:</label>
              <input type="email"
                ref={emailRef}
              />
              <label>Password:</label>
              <input type="password"
                ref={passwordRef}
              />
              <div className={classes['signin']}>
                <button disabled={isLoading} className={classes['signin-btn']}>Sign In</button>
              </div>
            </div>
          </form>
          <div className={classes['login-footer']}>
            <Link className={classes['login-link']} to="/forgot-password">Forgot password?</Link>
            <Link className={classes['login-link']} to="/signup">Get a new account</Link>
          </div>
        </div>
      </Card>
    </>
  )
}