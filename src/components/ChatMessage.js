import { useAuth } from "../contexts/AuthProvider"; 
import classes from './ChatMessage.module.css';

export default function ChatMessage(props) {
  const {currentUser} = useAuth();
  const { message, uid, displayName, timestamp } = props.message;
  const messageClass = uid === currentUser.uid ? 'sent' : 'recieved';

  return (
    <div className={classes.message}>
      <p className={classes[`message-username ${messageClass}`]}>{displayName}</p>
      <p className={classes['message-text']}>{message}</p>
      <p className={classes['message-timestamp']}>{timestamp}</p>
    </div>
  )
}