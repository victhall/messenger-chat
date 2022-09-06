export default function Signup() {
  return (
    <>
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

            <label>Email</label>
            <input />

            <label>Password</label>
            <input />

            <label>Confirm Password</label>
            <input />
          </div>

          <div>
            <button>Sign Up</button>
          </div>

        </div>
      </form>

      <div>
        <p>Already have an account?</p>
        <p>Log in</p>
      </div>
    </>
  )
}