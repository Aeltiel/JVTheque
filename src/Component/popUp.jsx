import { useState } from "react"

function PopUp({ content }) {
    const [close, setClose] = useState(true)
    //fonction pour check l'état de pop afin de la fermer
    function closePopUp() {
        if (close === true) {
            setClose(false)
        }
    }

    //usage d'un ternaire pour fermer la pop-up
    return (
        <>
            {close ?
                <div className="popUp__container">
                    <div className="popUp__box">
                        <button className="popUp__closebtn" onClick={() => closePopUp()}><i className="fa-solid fa-xmark"></i></button>
                        <div className="popUp__content">{content}</div>
                    </div>

                </div> : <div></div>}
        </>
    )
}
export default PopUp