import { useState, useEffect } from "react";
import axios from "axios";
import Catito from "./Catito/Catito";
const itemData = [];
const keys = 'live_fiZ64z54mGbHWOwxgPMnn8ibSdAxGxpzDmv3APwvuwc0FReF3nbbOUGTHxZPp8KA';
const keyUrl = 'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=9';

const Gatalog = () => {
  const [id, setId] = useState(""); // set for modal information!
  const [isLoading, setisLoading] = useState(false);

  const fetchGatalog = () => {
    setisLoading(true);
    axios
      .get(
        keyUrl,
        {
          headers: {
            "x-api-key":
              keys,
          },
        }
      )
      .then((response) => {
        response.data.map((item) => {
          let tempItem = {
            name: item.breeds[0].name,
            image: item.url,
            key: item.id,
            description: item.breeds[0].description,
            perks: {
              adaptability: item.breeds[0].adaptability,
              affection_level: item.breeds[0].affection_level,
              stranger_friendly: item.breeds[0].stranger_friendly,
              social_needs: item.breeds[0].social_needs,
            },
          };

          itemData.push(tempItem);
        });

        setisLoading(false);
      })
      .catch((error) => {
        console.log(error ? error.message : error.status);
      });
  };

  const Execution = () => {
    itemData.splice(0, itemData.length);
    fetchGatalog();
  };

  const handleClick = (data) => {
    setModalOpen(true);
    setId(data);
  };

  useEffect(() => {
    itemData.splice(0, itemData.length);
    fetchGatalog();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mt-1">
        <button
          className="w-28 h-10 bg-orange-600 rounded-xl m-5 hover:shadow-[0_0_20px_8px_rgba(255,255,255,0.5)] transition-shadow duration-300"
          onClick={Execution}
        >
          Refresh!
        </button>
        {isLoading ? (
          <div className="w-full animate-pulse flex justify-center pt-10">
            <svg
              className=" w-20 h-20 text-gray-400 items-center"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        ) : (
          <ul
            className="2xl:w-[80%] lg:w-[95%] w-[90%] flex flex-row flex-wrap justify-around;
        "
          >
            {itemData.map((item) => {
              return (
                <Catito
                  catInfo={item}
                  onItemClick={handleClick}
                  key={item.key}
                />
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Gatalog;
