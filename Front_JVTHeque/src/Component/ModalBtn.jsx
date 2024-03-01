import { createPortal } from "react-dom";
import ModalContent from "./ModalContent";
import { useState } from "react";

export default function ModalBtn({ text, content }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="btn" onClick={() => setShowModal(true)}>{text}</button>
            {/* create portal prend deux arguments : ce que je veux montrer et son emplacement */}
            {showModal &&
                createPortal(
                    <ModalContent 
                    closeModal={() => setShowModal(false)}
                    content={content} />,
                    document.body)}
        </>
    )
}
