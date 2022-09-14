import classes from './Home.module.css'
import ContactList from './ContactList'
import Chat from './Chat'

export default function Home() {
  return (
    <div className={classes.home}>
      <ContactList />
      <Chat />
    </div>
  )
}