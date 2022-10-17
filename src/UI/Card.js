import classes from './Card.module.css'

export default function Card(props) {
  let errorAudio = new Audio('../../error.mp3');

  return <div className={classes['outer-container']}>
    <div className={classes.header}>
      <p>Messenger</p>
      <div className={classes.container}>
        <span className={classes.box}>
          <span className={classes['box-minimize']}></span>
        </span>
        <span className={classes.box}>
          <span className={classes['box-maximize']}></span>
        </span>
        <span className={classes.box} onClick={() => errorAudio.play()}>
          <span className={`${classes['box-exit']} ${classes['box-exit-right']}`}></span>
          <span className={`${classes['box-exit']} ${classes['box-exit-left']}`}></span>
        </span>

      </div>
    </div>

    <div className={classes.menu}>
      <p>File</p>
      <p>Contacts</p>
      <p>Actions</p>
      <p>Tools</p>
      <p>Help</p>
    </div>
    <div>{props.children}</div>

  </div>
}
