import { useAuth } from "../contexts/AuthProvider";
import classes from './Contact.module.css';

export default function Contact(props) {
  const { currentUser } = useAuth();
  const loggedInUser = currentUser.displayName;
  const chatContact = props.username;

  return (
    <>
      <div className={classes.contact} onClick={() => {
        props.onStartChat(loggedInUser, chatContact);
      }
      }>
        {props.username}
      </div>
    </>
  );
};