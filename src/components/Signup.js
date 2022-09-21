import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { updateProfile } from 'firebase/auth';
import { firestore, auth } from '../Firebase';
import { collection, setDoc, doc } from "firebase/firestore";
import { useAuth } from '../contexts/AuthProvider';
import classes from './Signup.module.css';
import Card from '../UI/Card';
import Modal from '../UI/Modal';

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
  let errorAudio = new Audio('../../error.mp3');

  async function submitHandler(event) {
    event.preventDefault();

    //if entered username is found in firestore db return error message
    const findExistingUsername = users.find(user => user.username === usernameRef.current.value)

    if (findExistingUsername) {
      errorAudio.play();
      return setError({
        title: 'Invalid Username',
        message: 'Sorry, that username already exists.'})
    };

    //if entered passwords do not match return error message
    if (passwordRef.current.value !==
      confirmPasswordRef.current.value) {
        errorAudio.play();
      return setError({
        title: 'Invalid Password',
        message: 'Passwords do not match. Verify and try again.'})
    };

    try {
      setError('');
      setIsLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      updateProfile(auth.currentUser, {
        displayName: usernameRef.current.value
      });
      await setDoc(doc(userDb), {
        username: usernameRef.current.value,
      });
      navigate('/login')
    } catch {
      errorAudio.play();
      setError({
        title: 'System Error',
        message: 'Account creation failed. Please check email.'});
    };
    setIsLoading(false);
  };

  const errorHandler = function () {
    setError(null);
  };

  return (
    <div>
      {error && <Modal title={error.title} message={error.message} onConfirm={errorHandler}/>}
      <Card>
        <div className={classes['inner-signup__container']}>
          <div className={classes['signup-title']}>
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
      </div>
  );
};