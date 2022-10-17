import * as ReactDOM from 'react-dom';
import classes from './Modal.module.css'

function ModalOverlay(props) {
  let errorAudio = new Audio('../../error.mp3');

  return (
    <div className={classes['outer-modal__container']}>
      <div className={classes.header}>
        <p>{props.title}</p>
        <div className={classes.container}>
          <span className={classes.box} onClick={() => errorAudio.play()}>
            <span className={`${classes['box-exit']} ${classes['box-exit-right']}`}></span>
            <span className={`${classes['box-exit']} ${classes['box-exit-left']}`}></span>
          </span>
        </div>
      </div>
      <div className={classes['inner-modal__container']}>
        <div>
          <p>{props.message}</p>
        </div>
        <footer className={classes.confirm}>
          <button className={classes['modal-btn']} onClick={props.onConfirm}>Okay</button>
        </footer>
      </div>
    </div>
  )
}

export default function Modal(props) {
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

