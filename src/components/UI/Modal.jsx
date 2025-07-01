import { useRef } from "react";

const Modal = ({ setOpenModal, children }) => {
    const modalBackground = useRef();

    const closeModal = (e) => {
        if (modalBackground.current === e.target) {
            setOpenModal(false);
        }
    };

    return (
        <div className="modal-overlay" ref={modalBackground} onClick={closeModal}>
            <div className="modal-container">
                {children}
                <button className="close-btn" type="button" onClick={() => setOpenModal(false)}>
                    X
                </button>
            </div>
        </div>
    );
};

export default Modal;