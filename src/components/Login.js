import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <>
      <div className="">

        <div className="header">

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
        <div className="menu">
          <p className="menu-file">File</p>
          <p className="menu-contacts">Contacts</p>
          <p className="menu-actions">Actions</p>
          <p className="menu-tools">Tools</p>
          <p className="menu-help">Help</p>
        </div>

        <form>
          <div className="">
            <div>
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
          <Link to="/Signup">Get a new account</Link>
        </div>

      </div>
    </>
  )
}