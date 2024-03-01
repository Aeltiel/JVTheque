
function ModalContent({ content, closeModal }) {

    return (
        <>
            <div className="popUp__container" onClick={closeModal}></div>
            <div className="popUp__box">
                <button className="popUp__closebtn" onClick={closeModal}><i className="fa-solid fa-xmark"></i></button>
                <div className="popUp__content">{content}</div>
            </div>
        </>
    )
}
export default ModalContent