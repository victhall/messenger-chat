import classes from './Chat.module.css'

export default function Chat() {
  return (
    <div className={classes['outer-chat__container']}>
      <div className={classes.header}>

        <p>Messenger - iLuvApplez</p>
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
        <p className="menu-chat">Chat</p>
        <p className="menu-edit">Edit</p>
        <p className="menu-view">View</p>
        <p className="menu-actions">Actions</p>
        <p className="menu-contacts">Contact</p>
        <p className="menu-help">Help</p>
      </div>

      <div className={classes['chatbox']}></div>

      <form>
        <div className={classes.inputs}>
          <textarea type='text' />
        </div>

        <div className={classes['send']}>
          <button className={classes['send-btn']}>Send</button>
        </div>
      </form>
      
    </div>
  )
}