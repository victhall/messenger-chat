import { useAuth } from "../contexts/AuthProvider"
import { collection, where, query } from "firebase/firestore";
import { firestore } from "../Firebase";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import classes from './Contact.module.css'

export default function Contact(props) {
  const { currentUser } = useAuth();

  const userDb = collection(firestore, "users");
  const userQuery = query(userDb, where("username", "==", currentUser.displayName));
  const [user] = useCollectionData(userQuery);

  const loggedInUser = currentUser.displayName;
  const chatContact = props.username

  return (
    <>
      <div className={classes.contact} onClick={() => {
        props.onStartChat(loggedInUser, chatContact)
      }
      }>
        {props.username}
      </div>
    </>
  )
}