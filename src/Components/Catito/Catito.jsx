import React, { useState } from "react";
let catUrl = "https://images.vexels.com/content/132714/preview/witch-cat-face-aaba91.png";
let catName = 'Hola gatito';

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