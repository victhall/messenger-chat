import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from "firebase/firestore";
import { firestore } from "../Firebase";
import Contact from './Contact.js'
import { useAuth } from "../contexts/AuthProvider"
import classes from './ContactList.module.css'

export default function ContactList(props) {
  const [searchInput, setSearchInput] = useState('')
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const userDb = collection(firestore, "users");
  const [users] = useCollectionData(userDb);

  const searchInputHandler = function (event) {
    setSearchInput(event.target.value)
  }

  async function logoutHandler() {
    setError('')
    try {
      await logout()
      navigate('/login')
    } catch {
      setError('Failed to logout')
    }
  }

  return (
    <>
      <div className={classes['outer-fl__container']}>
        <div className={classes.header}>

          <p>Contacts</p>
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

        <form>
          <div className={classes.inputs}>
            <input
              placeholder="Search..."
              onChange={searchInputHandler} />
          </div>
        </form>
        <div className={classes['inner-fl__container']}>
          <ul>
            {users && users.filter((user) => {
              //if search input is blank, return list of users
              if (searchInput == "") {
                return user
                //if user contains search input characters, return those users
              } else if (user.username.toLowerCase().includes(searchInput.toLowerCase())) {
                return user
              }
            }).map((user) => {
              //if logged in username matches username in list, do not show
              if (user.username === currentUser.displayName) {
                return null
              }
              return (
                <Contact
                  key={user.username}
                  className={classes['contact-list']}
                  username={user.username}
                  onStartChat={props.onStartChat}>
                  {user.username}
                </Contact>
              )
            })}
          </ul>
        </div>
        <button onClick={logoutHandler} className={classes['logout-btn']}>Log Out</button>
      </div>
    </>
  )
}