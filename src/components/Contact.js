import { useAuth } from "../contexts/AuthProvider"
import { collection, where, query } from "firebase/firestore";
import { firestore } from "../Firebase";
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Contact(props) {
  const { currentUser } = useAuth();

  const userDb = collection(firestore, "users");
  const userQuery = query(userDb, where("username", "==", currentUser.displayName));
  const [user] = useCollectionData(userQuery);

  return (
    <>
      <div className="friend" onClick={() => {
        props.onStartChat(

            {
                chatId: user[0].chatId,
                username: currentUser.displayName
            }, 
            {
                chatId: props.chatId,
                username: props.username
            }
            )
      }
      }>
        {props.username}
      </div>
    </>
  )
}