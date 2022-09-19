import classes from './Home.module.css'
import ContactList from './ContactList'
import Chat from './Chat'
import { useAuth } from "../contexts/AuthProvider"
import { v4 as uuidv4 } from 'uuid';
import { firestore } from '../Firebase'
import { collection, setDoc, doc, where } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

export default function Home() {
  const [chatroomId, setChatroomId] = useState('');
  const { currentUser } = useAuth();

  const chatroomDb = collection(firestore, "chatrooms");
  const [chatrooms] = useCollectionData(chatroomDb);

  async function startChat(userOne, userTwo) {

    let chatroomExists = false
    const newChatroomId = uuidv4()

    chatrooms.forEach(chatroom => {

      if(chatroom.userTwo !== userTwo && chatroom.userOne !== userOne && chatroom.userTwo !== userOne && chatroom.userOne !== userTwo) {
        setChatroomId(newChatroomId)
        return chatroomExists = false
      }
      if ((chatroom.userTwo == userOne && chatroom.userOne == userTwo) || (chatroom.userOne == userOne && chatroom.userTwo == userTwo)) {
        setChatroomId(chatroom.chatroomId)
        return chatroomExists = true
      }

    })

    if (chatroomExists === false) {
      await setDoc(doc(chatroomDb), {
        chatroomId: newChatroomId,
        userOne: userOne,
        userTwo: userTwo,
      });

      return setChatroomId(newChatroomId)
    }

  }

  return (
    <div className={classes.home}>
      <ContactList onStartChat={startChat} />
      {chatroomId && <Chat chatroomId={chatroomId} />}
    </div>
  )
}