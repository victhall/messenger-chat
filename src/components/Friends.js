import classes from './Friends.module.css'

let users = [
  {
    id: 1,
    username: 'dogbackwards'
  },
  {
    id: 2,
    username: 'iLuvApplez'
  },
  {
    id: 3,
    username: 'bobababi3'
  },
  {
    id: 4,
    username: 'martinpham'
  },
  {
    id: 5,
    username: '7daywonder'
  },
  {
    id: 6,
    username: 'cowsarefrenz'
  },
  {
    id: 7,
    username: 'lunarmoonar2'
  },
  {
    id: 8,
    username: 'samXham12'
  },
  {
    id: 9,
    username: 'Mrmilkies'
  },
  {
    id: 10,
    username: 'pillowprincessa'
  }
]

export default function Friends() {

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} className={classes['friend-list']}>{user.username}</li>
      ))}
    </ul>
  )
}