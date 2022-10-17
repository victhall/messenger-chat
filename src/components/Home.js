import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../Firebase';
import { collection, setDoc, doc } from "firebase/firestore";
import ContactList from './ContactList';
import Chat from './Chat';
import { v4 as uuidv4 } from 'uuid';
import classes from './Home.module.css';

export default function Home() {
  const [chatroomId, setChatroomId] = useState('');

  const chatroomDb = collection(firestore, "chatrooms");
  const [chatrooms] = useCollectionData(chatroomDb);

  async function startChat(userOne, userTwo) {
    let chatroomExists = false;
    const newChatroomId = uuidv4();

    chatrooms.forEach(chatroom => {
      //if both usernames are found in chatroom document, return the chatroomId
      //and set chatroomExists to true
      if (chatroom.userTwo === userOne && chatroom.userOne === userTwo) {
        setChatroomId(chatroom.chatroomId)
        return chatroomExists = true
      }

      if(chatroom.userOne === userOne && chatroom.userTwo === userTwo) {
        setChatroomId(chatroom.chatroomId)
        return chatroomExists = true 
      }
    });
    
    if(chatroomExists) return
    
    await setDoc(doc(chatroomDb), {
        chatroomId: newChatroomId,
        userOne: userOne,
        userTwo: userTwo,
      });
      return setChatroomId(newChatroomId);
  };

  return (
    <div className={classes.home}>
      <ContactList onStartChat={startChat} />
      {chatroomId && <Chat chatroomId={chatroomId} />}
    </div>
  );
};