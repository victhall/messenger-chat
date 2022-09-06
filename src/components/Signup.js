import { Link } from 'react-router-dom'
import classes from './Signup.module.css'

export default function Signup() {
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

      <h2>Sign Up</h2>

      <form>
        <div>
          <div>
            <label>Username</label>
            <input />

            <label>Email Address</label>
            <input />

            <label>Password</label>
            <input />

            <label>Confirm Password</label>
            <input />
          </div>
            <button>Sign Up</button>
        </div>
      </form>
      <div>
        <p>Already have an account?</p>
        <Link to="/login">Sign in</Link>
      </div>
      </div>
    </>
  )
}