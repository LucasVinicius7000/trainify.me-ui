import { useEffect } from 'react';
import styles from "./styles.module.css";

export default function CustomModal({ isOpen, className, closeWhenClickOutsideContent, requestToClose, children }) {

    const checkIfClickOutsideContent = (clickEvent, needClose) => {
        if (needClose) {
            let modalElement = document.getElementById("modal");
            if (modalElement == clickEvent.target) requestToClose();
        } return;
    }

    return isOpen && <div id="modal" className={`${className} ${styles.container}`}
        onClick={(e) => {
            checkIfClickOutsideContent(e, closeWhenClickOutsideContent);
        }}>
        {children}
    </div>

}