import * as ReactDOM from 'react-dom';
import classes from './ErrorModal.module.css'

function ModalOverlay(props) {
  return (
    <div className={classes['outer-signup__container']}>
      <div className={classes.header}>
        <p>{props.title}</p>
        <div className={classes.container}>
          <span className={classes.box}>
            <span className={`${classes['box-exit']} ${classes['box-exit-right']}`}></span>
            <span className={`${classes['box-exit']} ${classes['box-exit-left']}`}></span>
          </span>
        </div>
      </div>
      <div className={classes['inner-signup__container']}>
        <div>
          <p>{props.message}</p>
        </div>
        <footer className={classes.confirm}>
          <button className={classes['signup-btn']} onClick={props.onConfirm}>Okay</button>
        </footer>
      </div>
    </div>
  )
}

export default function ErrorModal(props) {
  return (
    <>
      {ReactDOM.createPortal(<ModalOverlay
        title={props.title}
        message={props.message}
        onConfirm={props.onConfirm} />,
        document.getElementById('overlay-root')
      )}
    </>
  )
}

