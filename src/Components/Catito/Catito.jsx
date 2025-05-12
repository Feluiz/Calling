import React, { useState } from "react";

const Catito = (catInfo) => {

    return (
        <>
            <div className="flex flex-col items-center">
                <img className="max-h-48 w-auto" src={catInfo.catInfo.image} height='1rem' alt="catito" />
                <p>{catInfo.catInfo.name}</p>
            </div>
        </>
    )
};

export default Catito;