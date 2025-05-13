import React, { useState } from "react";

const Catito = ({catInfo}) => {

    return (
        <>
            <div className="flex flex-col items-center p-3 border-2 m-2 cursor-pointer" onClick={() => console.log('hola')}>
                <img className="max-h-48 w-auto" src={catInfo.image} height='1rem' alt="catito" />
                <p>{catInfo.name}</p>
            </div>
        </>
    )
};

export default Catito;