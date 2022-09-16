import classes from './Chat.module.css';
import { collection, orderBy, limit, query, setDoc, doc, serverTimestamp, where } from "firebase/firestore";
import { firestore } from '../Firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage'
import { useRef } from 'react';
import { useAuth } from '../contexts/AuthProvider';

export default function Chat(props) {
  const { currentUser } = useAuth();
  const messagesDb = collection(firestore, "messages");
  const messageQuery = query(messagesDb, where("chatroomId", "==", props.chatroomId), orderBy("createdAt", "asc"), limit(25));

  const [messages] = useCollectionData(messageQuery, { idField: 'id' });
  const messageRef = useRef();

  const chatroomDb = collection(firestore, 'chatrooms');
  const chatroomQuery = query(chatroomDb, where("chatroomId", "==", props.chatroomId));
  const [chatrooms] = useCollectionData(chatroomQuery);

  const sendMsgHandler = async function (event) {
    event.preventDefault()

    const { uid, displayName } = currentUser;
    const timeStamp = new Date().toLocaleString('en-US', { hour: "2-digit", minute: "2-digit" });

    await setDoc(doc(messagesDb), {
      message: messageRef.current.value,
      createdAt: serverTimestamp(),
      timestamp: timeStamp,
      uid,
      displayName,
      chatroomId: props.chatroomId
    });
    messageRef.current.value = ''
  }

  return (
    <div className={classes['outer-chat__container']}>
      <div className={classes.header}>

        <p>Messenger - {currentUser.displayName}</p>
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
        <p className="menu-chat">Chat</p>
        <p className="menu-edit">Edit</p>
        <p className="menu-view">View</p>
        <p className="menu-actions">Actions</p>
        <p className="menu-contacts">Contact</p>
        <p className="menu-help">Help</p>
      </div>

      <div className={classes['chatbox']}>
        {messages && messages.map(message => 
        <ChatMessage 
        key={message.id} 
        message={message} />)}
      </div>

      <form onSubmit={sendMsgHandler}>
        <div className={classes.inputs}>
          <textarea type='text'
            ref={messageRef} />
        </div>

        <div className={classes['send']}>
          <button className={classes['send-btn']}>Send</button>
        </div>
      </form>
    </div>
  )
}