import { useState } from "react";
import axios from "axios";
import Catito from "./Components/Catito/Catito";
import "./App.css";
//const

function App() {
  const [count, setCount] = useState({
    name: 'Gatito',
    image: 'https://cdn3.iconfinder.com/data/icons/catcommerce-ginger/120/search-512.png',
  });

  const fetchDino = (words) => {
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
        setCount({
          name: response.data[0].breeds[0].name,
          image: response.data[0].url,
        });
      })
      .catch((error) => {
        console.log(error ? error.message : error.status);
      });
  };

  const Execution = () => {
    fetchDino();
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
        <button className="w-28 h-10 bg-orange-600 rounded-xl m-5" onClick={Execution}>Click me!</button>
        <Catito catInfo={count} />
      </div>
    </div>
  );
}

export default App;
