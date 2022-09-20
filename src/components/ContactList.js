import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from "firebase/firestore";
import { firestore } from "../Firebase";
import Contact from './Contact.js';
import { useAuth } from "../contexts/AuthProvider";
import classes from './ContactList.module.css';
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";

export default function ContactList(props) {
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const userDb = collection(firestore, "users");
  const [users] = useCollectionData(userDb);

  const searchInputHandler = function (event) {
    setSearchInput(event.target.value)
  };

  async function logoutHandler() {
    setError('')
    try {
      await logout()
      navigate('/login')
    } catch {
      setError({
        title: 'Logout Failed',
        message: 'Refresh the page and try again.'
      })
    }
  };

  const errorHandler = function () {
    setError(null)
  };

  return (
    <>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card>
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
      </Card>
    </>
  )
}