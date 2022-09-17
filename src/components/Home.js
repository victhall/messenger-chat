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
  
    
    const newChatroomId = uuidv4()
    setChatroomId(newChatroomId)

    await setDoc(doc(chatroomDb), {
      chatroomId: newChatroomId,
      userOne: userOne,
      userTwo: userTwo
    });
  }

  return (
    <div className={classes.home}>
      <ContactList onStartChat={startChat} />
      <Chat chatroomId={chatroomId}/>
    </div>
  )
}