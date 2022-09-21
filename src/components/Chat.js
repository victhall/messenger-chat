import { useRef, useState, useEffect } from 'react';
import { firestore } from '../Firebase';
import { collection, orderBy, limit, query, setDoc, doc, serverTimestamp, where } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import { useAuth } from '../contexts/AuthProvider';
import classes from './Chat.module.css';

export default function Chat(props) {
  const { currentUser } = useAuth();
  const [contact, setContact] = useState('');

  const messagesDb = collection(firestore, "messages");
  const messageQuery = query(messagesDb, where("chatroomId", "==", props.chatroomId), orderBy("createdAt", "asc"), limit(25));
  const [messages] = useCollectionData(messageQuery, { idField: 'id' });
  const messageRef = useRef();

  const chatroomDb = collection(firestore, 'chatrooms');
  const chatroomQuery = query(chatroomDb, where("chatroomId", "==", props.chatroomId));
  const [chatroom] = useCollectionData(chatroomQuery);

  const scrollRef = useRef();
  let sentAudio = new Audio('../../message-sent.mp3');

  useEffect(() => {
    //if chatroom exists, check if logged in username = userOne or userTwo
    //if true, return the opposite user to get the selected contact username
    if (chatroom) {
      if (chatroom[0].userOne === currentUser.displayName) {
        return setContact(chatroom[0].userTwo);
      };
      if (chatroom[0].userTwo === currentUser.displayName) {
        return setContact(chatroom[0].userOne);
      };
    };
  }, [chatroom]);

  const sendMsgHandler = function (event) {
    event.preventDefault();
    const { uid, displayName } = currentUser;
    const timeStamp = new Date().toLocaleString('en-US', { hour: "2-digit", minute: "2-digit" });

    setDoc(doc(messagesDb), {
      message: messageRef.current.value,
      createdAt: serverTimestamp(),
      timestamp: timeStamp,
      uid,
      displayName,
      chatroomId: props.chatroomId
    });
    sentAudio.play();
    messageRef.current.value = '';
    scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
  };

  return (
    <div className={classes['outer-chat__container']}>
      <div className={classes.header}>

        <p>Messenger - {contact}</p>
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
        <p>Chat</p>
        <p>Edit</p>
        <p>View</p>
        <p>Contact</p>
      </div>

      <main className={classes['chatbox']}>
        {messages && messages.map(message =>
          <ChatMessage
            key={message.id}
            message={message} />)}
        <div ref={scrollRef}></div>
      </main>

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
  );
};