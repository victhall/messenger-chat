import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import classes from './ResetPassword.module.css';

export default function ResetPassword() {
  const emailRef = useRef();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuth();

  const submitHandler = async function (event) {
    event.preventDefault()

    try {
      setError('');
      setIsLoading(true);
      await resetPassword(emailRef.current.value);
    } catch (event) {
      console.log(event)
      setError('Reset failed.');
    }
    emailRef.current.value = ""
    setIsLoading(false)
  }

  return (
    <div className={classes['outer-fp__container']}>

      <div className={classes.header}>

        <p>Messenger</p>
        <div className={classes.container}>
          <span className={classes.box}>
            <span className={classes['box-minimize']}></span>
          </span>
          <span className={classes.box}>
            <span className={classes['box-maximize']}></span>
          </span>
          <span className={classes.box}>
            <span className={`${classes['box-exit']} ${classes['box-exit-right']}`}></span>
            <span className={`${classes['box-exit']} ${classes['box-exit-left']}`}></span>
          </span>
        </div>
      </div>

      <div className={classes.menu}>
        <p className="menu-file">File</p>
        <p className="menu-contacts">Contacts</p>
        <p className="menu-actions">Actions</p>
        <p className="menu-tools">Tools</p>
        <p className="menu-help">Help</p>
      </div>

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
              <button className={classes['reset-btn']}>Reset Password</button>
            </div>
          </div>

        </form>
        <div className={classes['fp-footer']}>
          <p>Already have an account?</p>
          <Link className={classes['back-link']} to="/login">Back to Login</Link>
        </div>

      </div>

    </div>
  )
}