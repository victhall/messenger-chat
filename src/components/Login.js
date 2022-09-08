import { Link } from 'react-router-dom'
import classes from './Login.module.css'

export default function Login() {
  return (
    <>
      <div className={classes['outer-login__container']}>

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

        <div className={classes['inner-login__container']}>
          <div className={classes['pfp-div']}>
            <img className={classes['default-pfp']} src='pfp.png' alt="default profile picture"/>
          </div>

          <form>
              <div className={classes.inputs}>
                <label>E-mail address:</label>
                <input type="email"/>
                <label>Password:</label>
                <input type="password"/>
                <div className={classes['signin']}>
              <button className={classes['signin-btn']}>Sign In</button>
              </div>
              </div>

          </form>
          <div className={classes['login-footer']}>
            <Link className={classes['login-link']} to="/forgot-password">Forgot password?</Link>
            <Link className={classes['login-link']} to="/signup">Get a new account</Link>
          </div>

        </div>
      </div>
    </>
  )
}