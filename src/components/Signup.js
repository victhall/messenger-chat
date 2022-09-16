import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Signup.module.css';
import { useAuth } from '../contexts/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { firestore, auth } from '../Firebase'
import { collection, setDoc, doc } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { v4 as uuidv4 } from 'uuid';

export default function Signup() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const userDb = collection(firestore, "users");
  const [users] = useCollectionData(userDb);

  const submitHandler = async function (event) {
    event.preventDefault()

    //if entered username is found in firestore db return error message
    const findExistingUsername = users.find(user => user.username === usernameRef.current.value)
    
    if (findExistingUsername) {
      return setError('Username already exists')
    };

    //if entered passwords do not match return error message
    if (passwordRef.current.value !==
      confirmPasswordRef.current.value) {
      return setError('Passwords do not match')
    };

    try {
      setError('');
      setIsLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      updateProfile(auth.currentUser, {
        displayName: usernameRef.current.value
      })
      await setDoc(doc(userDb), {
        username: usernameRef.current.value,
        chatId: uuidv4()
      });
      navigate('/login')
    } catch (event) {
      console.log(event)
      setError('Account creation failed.');
    }
    setIsLoading(false)
  }

  return (
    <>
      <div className={classes['outer-signup__container']}>
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

        <div className={classes['inner-signup__container']}>
          <div className={classes['signup-title']}>
            <h2>Create Account</h2>
          </div>

          {error && console.log(error)}
          <form onSubmit={submitHandler}>
            <div className={classes.inputs}>
              <label>Username:</label>
              <input
                type="text"
                ref={usernameRef}
                required
              />

              <label>E-mail address:</label>
              <input
                type="email"
                ref={emailRef}
                required
              />

              <label>Password:</label>
              <input
                type="password"
                ref={passwordRef}
                required
              />

              <label>Confirm password:</label>
              <input
                type="password"
                ref={confirmPasswordRef}
                required
              />

              <div className={classes['signup']}>
                <button disabled={isLoading} className={classes['signup-btn']}>Sign Up</button>
              </div>

            </div>

          </form>
          <div className={classes['signup-footer']}>
            <p>Already have an account?</p>
            <Link to="/login">Log in</Link>
          </div>
        </div>

      </div>
    </>
  )
}