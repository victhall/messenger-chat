import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import classes from './ChatMessage.module.css';

export default function ChatMessage(props) {
  const [hover, setHover] = useState(false)
  const { currentUser } = useAuth();
  const { message, uid, displayName, timestamp, createdAt } = props.message;
  const messageClass = uid === currentUser.uid ? classes.sent : classes.recieved;

  const onHover = (event) => {
    event.preventDefault();
 setHover(true)
  };

  const onHoverOver = (event) => {
    event.preventDefault();
   setHover(false);
  }


  return (
    <div 
    className={classes.message}
    onMouseEnter={(event) => onHover(event)}
    onMouseLeave={(event) => {onHoverOver(event)}}>
      {hover && <p className={classes['message-timestamp']}>sent on {createdAt.toDate().toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric'})} at {timestamp}</p>}
      <p className={`${classes['message-username']} ${messageClass}`}>{displayName} says:</p>
      <p className={classes['message-text']}>{message}</p>
    </div>
  )
}
