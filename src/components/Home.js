import classes from './Home.module.css'
import ContactList from './ContactList'
import Chat from './Chat'
import { useAuth } from "../contexts/AuthProvider"
import { v4 as uuidv4 } from 'uuid';
import { firestore } from '../Firebase'
import { collection, setDoc, doc } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

export default function Home() {
  const { currentUser } = useAuth();
  const chatroomDb = collection(firestore, "chatrooms");
  const [chatrooms] = useCollectionData(chatroomDb);

  

  async function startChat() {

    await setDoc(doc(chatroomDb), {
      chatroomId: uuidv4(),
      userOne: currentUser.displayName,
      userTwo: 'monkey'
    });
  }

  return (
    <div className={classes.home}>
      <ContactList onStartChat={startChat} />
      <Chat />
    </div>
  )
}