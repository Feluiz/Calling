import { useState, useEffect } from "react";
import axios from "axios";
import Catito from "../Catito/Catito";
const itemData = [];

const Gatalog = () => {
  const [id, setId] = useState("");
  const [count, setCount] = useState({
    name: "Gatito",
    image:
      "https://cdn3.iconfinder.com/data/icons/catcommerce-ginger/120/search-512.png",
    key: "",
    description: "",
    perks: {
      adaptability: "",
      affection_level: "",
      stranger_friendly: "",
      social_needs: "",
    },
  });

  const fetchGatalog = () => {
    axios
      .get(
        "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=9",
        {
          headers: {
            "x-api-key":
              "live_fiZ64z54mGbHWOwxgPMnn8ibSdAxGxpzDmv3APwvuwc0FReF3nbbOUGTHxZPp8KA",
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
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

        setCount(itemData);
      })
      .catch((error) => {
        console.log(error ? error.message : error.status);
      });
  };

  const Execution = () => {
    setCount([]);
    itemData.splice(0, itemData.length);
    fetchGatalog();
  };

  const handleClick = (data) => {
    setModalOpen(true);
    setId(data);
  };

  useEffect(() => {
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
        <ul
          className="2xl:w-[80%] lg:w-[95%] w-[90%] flex flex-row flex-wrap justify-around console.log();
        "
        >
          {itemData.map((item) => {
            return (
              <Catito catInfo={item} onItemClick={handleClick} key={item.key} />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Gatalog;
