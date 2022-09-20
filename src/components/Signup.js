import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { updateProfile } from 'firebase/auth';
import { firestore, auth } from '../Firebase';
import { collection, setDoc, doc } from "firebase/firestore";
import { useAuth } from '../contexts/AuthProvider';
import classes from './Signup.module.css';
import Card from '../UI/Card';

export default function Signup() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userDb = collection(firestore, "users");
  const [users] = useCollectionData(userDb);

  const navigate = useNavigate();
  const { signup } = useAuth();

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
      });
      navigate('/login')
    } catch {
      setError('Account creation failed.');
    }
    setIsLoading(false)
  }

  return (
    <>
      <Card>
        <div className={classes['inner-signup__container']}>
          <div className={classes['signup-title']}>
            {error}

            <h2>Create Account</h2>
          </div>

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

      </Card>
    </>
  )
}