import { Link } from 'react-router-dom'
import classes from './ForgotPassword.module.css'

export default function ForgotPassword() {
  return (
    <div className={classes['outer-fp__container']}>

      <div className={classes.header}>

        <p>MSN Messenger</p>
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
          <h2>Password Reset Help</h2>
        </div>

        <form>
          <div className={classes.inputs}>
            <label>E-mail address:</label>
            <input type="email" />
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