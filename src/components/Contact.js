export default function Contact(props) {
  return (
    <>
    <div onClick={props.onStartChat}>
      {props.username}
      </div>
    </>
  )
}