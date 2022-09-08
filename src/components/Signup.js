import { useRef } from 'react'
import { Link } from 'react-router-dom'
import classes from './Signup.module.css'

export default function Signup() {
const usernameRef = useRef();
const emailRef = useRef();
const passwordRef = useRef();
const confirmPasswordRef = useRef();

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
            <h2>Messenger Sign Up</h2>
          </div>
          <form>

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
                <button className={classes['signup-btn']}>Sign Up</button>
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