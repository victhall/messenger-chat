import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import Card from '../UI/Card';
import Modal from '../UI/Modal';
import classes from './ResetPassword.module.css';

export default function ResetPassword() {
  const [message, setMessage] = useState('');
  const emailRef = useRef();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  let errorAudio = new Audio('../../error.mp3');

  const submitHandler = async function (event) {
    event.preventDefault()
    try {
      setError('');
      setMessage({
        title: 'Password Reset',
        message: `If your account exists, a password reset link will be sent to ${emailRef.current.value}.`
      });
      setIsLoading(true);
      await resetPassword(emailRef.current.value);
    } catch {
      errorAudio.play();
      setError({
        title: 'System Error',
        message: 'Password reset failed. Please try again.'
      });
    };
    emailRef.current.value = ""
    setIsLoading(false);
  };

  const errorHandler = function () {
    setError(null);
  };

  const MsgHandler = function () {
    setMessage(null);
  };

  return (
    <>
      {message && <Modal title={message.title} message={message.message} onConfirm={MsgHandler}/>}
      {error && <Modal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card>
        <div className={classes['inner-fp__container']}>
          <div className={classes['fp-title']}>
            <h2>Password Reset</h2>
          </div>

          <form onSubmit={submitHandler}>
            <div className={classes.inputs}>
              <label>E-mail address:</label>
              <input type="email"
                ref={emailRef}
                required />
              <div className={classes['reset-password']}>
                <button disabled={isLoading} className={classes['reset-btn']}>Reset Password</button>
              </div>
            </div>
          </form>
          <div className={classes['fp-footer']}>
            <p>Already have an account?</p>
            <Link className={classes['back-link']} to="/login">Back to Login</Link>
          </div>
        </div>
      </Card>
    </>
  );
};