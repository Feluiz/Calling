import { useState } from "react";

const Catito = ({ catInfo, onItemClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [value, setValue] = useState(5);

  const handleClick = (data) => {
    // onItemClick(catInfo);
    setIsFlipped(!isFlipped);
  };

  const formatText = (text) => {
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <li
      key={catInfo.key}
      className="w-96 m-1 h-[42.5rem] perspective-1000 cursor-pointer"
      onClick={() => handleClick(catInfo.key)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full bg-transparent border-4 border-white text-white flex items-center flex-col justify-center rounded-lg shadow-lg [backface-visibility:hidden]">
          <h2 className="text-3xl font-bold absolute top-5">{catInfo.name}</h2>
          <img
            className="absolute self-center max-w-[95%] max-h-[80%] rounded-lg"
            src={catInfo.image}
            alt="cat image"
          />
        </div>
        {/* Back */}
        <div className="absolute w-full h-full bg-gray-800 text-white flex flex-col items-center justify-around rounded-lg shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] p-4">
          <h2 className="text-2xl font-semibold">{catInfo.name}</h2>
          <p className="text-lg text-center">{catInfo.description}</p>
          <div className="w-full">
            {Object.entries(catInfo.perks).map(([key, value]) => (
              <div key={key}>
                <h2>{formatText(key)}</h2>
                <div className="bg-red-500 w-full h-4 rounded-lg">
                  <div
                    className="bg-green-500 h-4 rounded-lg"
                    style={{ width: `${value * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Catito;
