import { Link } from 'react-router-dom'
import classes from './Login.module.css'

export default function Login() {
  return (
    <>
      <div className={classes['login-container']}>

        <div className={classes.header}>

          <p>NSM Messenger</p>
          <div className="container">
            <span className="box">
              <span className="box-minimize"></span>
            </span>
            <span className="box">
              <span className="box-maximize"></span>
            </span>
            <span className="box">
              <span className="box-exit box-exit-right"></span>
              <span className="box-exit box-exit-left"></span>
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

        <div>
          <img src='pfp.png'/>
        </div>

        <form>
          <div>
            <div className={classes.inputs}>
              <label>Email Address</label>
              <input />
              <label>Password</label>
              <input />
            </div>
            <button>Sign In</button>
          </div>

        </form>
        <div>
          <p>Forgot password?</p>
          <p link></p>
          <Link to="/signup">Get a new account</Link>
        </div>

      </div>
    </>
  )
}