import { useAuth } from "../contexts/AuthProvider"

export default function Contact(props) {
  const { currentUser } = useAuth();

  return (
    <>
      <div className="friend" onClick={() => {
          props.onStartChat(currentUser.displayName, props.username)
        }
      }>
        {props.username}
      </div>
    </>
  )
}