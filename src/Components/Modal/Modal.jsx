import React from "react";

const Modal = ({item, onClose}) => {

    return(
        <div className="bg-gray-800 flex flex-col p-5 w-[40rem] max-h-[40rem] fixed top-[auto] justify-around rounded-3xl">
            <img className="max-h-[15rem] w-fit self-center rounded-3xl" src={item.image} alt="" />
            <p className="text-center text-3xl font-mono py-5">{item.name}</p>
            <p className="text-xl font-sans">{item.description}</p>
            <button className="flex self-center border-2 p-2 mt-10" onClick={() => onClose(false)}>Cerrar</button>
        </div>
    )
};

export default Modal;