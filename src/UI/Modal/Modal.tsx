import { AnimatePresence, m } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import styles from "./Modal.module.scss";
import { useCallback } from "react";

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0 }
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.5 }
};

const Modal = ({ children, active, setActive, handleClose }) => {
  const onClose = useCallback(() => {
    setActive(false);

    if (handleClose) {
      handleClose();
    }
  }, []);

  const onClickContent = useCallback((event) => {
    event.stopPropagation();
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <m.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={styles.modal}
          onClick={onClose}
          role="presentation"
        >
          <m.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.content}
            onClick={onClickContent}
          >
            <button
              type="button"
              onClick={onClose}
              className={styles.closeBtn}
            >
              <XMarkIcon className={styles.closeIcon} />
            </button>
            {children}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
