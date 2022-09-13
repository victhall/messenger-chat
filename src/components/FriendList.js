import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider"
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../Firebase";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import classes from './FriendList.module.css'
import Friends from "./Friends";

export default function FriendList() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // async function getAllUsers() {
  //   const querySnapshot = await getDocs(collection(firestore, "users"));
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // }

  // const userDb = collection(firestore, "users");
  // const [users] = useCollectionData(userDb);

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
        
        <form>
          <div className={classes.inputs}>
            <input
              placeholder="Search..." />
          </div>
        </form>
        <div className={classes['inner-fl__container']}>
          <Friends />
        </div>

        <button onClick={logoutHandler} className={classes['logout-btn']}>Log Out</button>
      </div>
    </>
  )
}