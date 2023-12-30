import { Fragment } from "react";
import styles from "./Modal.module.css";

interface IModal {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose: () => any;
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, children }:IModal) => {
    return (
        <Fragment>
          {isOpen && (
            <div className={styles.overlay}>
              <div className={styles.overlay__background} onClick={onClose} />
              <div className={styles.overlay__container}>
                <div className={styles.overlay__controls}>
                  <button
                    className={styles.overlay__close}
                    type="button"
                    onClick={onClose}
                  />
                </div>
                {children}
              </div>
            </div>
          )}
        </Fragment>
      );
};

export default Modal;