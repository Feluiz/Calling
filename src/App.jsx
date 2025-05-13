import { useState } from "react";
import axios from "axios";
import Catito from "./Components/Catito/Catito";
import "./App.css";
import Modal from "./Components/Modal/Modal";
//-- declaration
const itemData = [];

function App() {
  const [id, setId] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [count, setCount] = useState({
    name: "Gatito",
    image:
      "https://cdn3.iconfinder.com/data/icons/catcommerce-ginger/120/search-512.png",
    key: "",
    description: "",
  });

  const fetchDino = () => {
    axios
      .get(
        "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10",
        {
          headers: {
            "x-api-key":
              "live_fiZ64z54mGbHWOwxgPMnn8ibSdAxGxpzDmv3APwvuwc0FReF3nbbOUGTHxZPp8KA",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        response.data.map((item) => {
          let tempItem = {
            name: item.breeds[0].name,
            image: item.url,
            key: item.id,
            description: item.breeds[0].description,
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
    fetchDino();
  };

  const handleClick = (data) => {
    setModalOpen(true);
    setId(data);
  };

  return (
    <div className="flex flex-col items-center mt-16">
      <div className="h-10 flex flex-col justify-center">
        <img
          src="https://images.vexels.com/content/132714/preview/witch-cat-face-aaba91.png"
          className="max-h-28 w-auto"
          alt="React logo"
        />
        <h1>Buscador de Gatitos</h1>
      </div>
      <div className="flex flex-col items-center mt-14">
        <button
          className="w-28 h-10 bg-orange-600 rounded-xl m-5"
          onClick={Execution}
        >
          Click me!
        </button>
        <ul className="w-90% flex flex-grid flex-wrap justify-around">
          {itemData.map((item) => {
            return (
              <li key={item.key}>
                <Catito catInfo={item} onItemClick={handleClick} />
              </li>
            );
          })}
        </ul>
      </div>
      {isModalOpen && <Modal item={id} onClose={setModalOpen}/>}
    </div>
  );
}

export default App;
