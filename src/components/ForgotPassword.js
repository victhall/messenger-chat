import { Link } from 'react-router-dom'
import classes from './Login.module.css'

export default function ForgotPassword() {
  return (
    <div className={classes['outer-fp__container']}>

<div className={classes.header}>

<p>MSN Messenger</p>
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
<p className="menu-file">File</p>
<p className="menu-contacts">Contacts</p>
<p className="menu-actions">Actions</p>
<p className="menu-tools">Tools</p>
<p className="menu-help">Help</p>
</div>

    </div>
  )
}