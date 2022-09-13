import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider"
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../Firebase";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import classes from './ContactList.module.css'


let users = [
  {
    id: 1,
    username: 'dogbackwards'
  },
  {
    id: 2,
    username: 'iLuvApplez'
  },
  {
    id: 3,
    username: 'bobababi3'
  },
  {
    id: 4,
    username: 'martinpham'
  },
  {
    id: 5,
    username: '7daywonder'
  },
  {
    id: 6,
    username: 'cowsarefrenz'
  },
  {
    id: 7,
    username: 'lunarmoonar2'
  },
  {
    id: 8,
    username: 'samXham12'
  },
  {
    id: 9,
    username: 'Mrmilkies'
  },
  {
    id: 10,
    username: 'pillowprincessa'
  }
]

export default function ContactList() {
  const [searchInput, setSearchInput] = useState('')
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const searchInputHandler = function (event) {
    setSearchInput(event.target.value)
  }

  async function logoutHandler() {
    setError('')

    try {
      await logout()
      console.log('LOGGED OUT')
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

            {users.filter((user) => {
              if (searchInput == "") {
                return user
              } else if (user.username.toLowerCase().includes(searchInput.toLocaleLowerCase())) {
                return user
              }
            }).map((user) => {
              return (
                <li key={user.id} className={classes['friend-list']}>{user.username}</li>
              )
            })}
          </ul>
        </div>

        <button onClick={logoutHandler} className={classes['logout-btn']}>Log Out</button>
      </div>
    </>
  )
}