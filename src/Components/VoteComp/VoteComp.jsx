import { use, useEffect, useState } from "react";
import "./VoteComp.css";
import axios from "axios";
const apiKey =
  "live_fiZ64z54mGbHWOwxgPMnn8ibSdAxGxpzDmv3APwvuwc0FReF3nbbOUGTHxZPp8KA";
const voteUrl = "https://api.thecatapi.com/v1/votes";

const VoteComp = () => {
  const [serviceRes, setServiceRes] = useState("+1");
  const [animateClss, setAnimateClss] = useState(false);
  const [scoreColor, seScoreColor] = useState("bg-green-500");
  const [isLoading, setisLoading] = useState(false);
  const [catItem, setCatItem] = useState({
    image:
      "https://pawzforthought.org/wp-content/uploads/2025/01/cat-page-icon.png",
    key: "",
  });

  const postVote = (vote) => {
    const body = {
      image_id: catItem.key,
      sub_id: "default",
      value: vote,
    };
    seScoreColor(vote === 1 ? "bg-green-500" : "bg-red-500");

    axios
      .post(voteUrl, body, { headers: { "x-api-key": apiKey } })
      .then((res) => {
        paintResponse(res.data);
        fetchGatalog();
        setisLoading(true);
        setAnimateClss(true);
      })
      .catch((err) => {
        alert("error ", err);
      });
  };

  const fetchGatalog = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1",
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );

      response.data.map((item) => {
        setCatItem({
          image: item.url,
          key: item.id,
        });
      });
    } catch (error) {
      console.log(error ? error.message : error.status);
    }
  };

  const paintResponse = (data) => {
    // setStyle("flex bg-[#28a745] w-full text-center");
    data.value === 1 ? setServiceRes("+1") : setServiceRes("-1");

    setTimeout(() => setAnimateClss(false), 2000);
  };

  useEffect(() => {
    fetchGatalog();
  }, []);

  const handleLoading = () => {
    setisLoading(false);
  };

  return (
    <>
      <section className="border-2 p-2 rounded-lg bg-black">
        <div className="flex text-black h-[25rem] w-[38rem] items-center justify-center">
          {isLoading && (
            <div className="w-full animate-pulse flex justify-center">
              <svg
                className=" w-12 h-12 text-gray-400 items-center"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                height={100}
                width={100}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          )}
          <img
            className={`max-h-[25rem] max-w-[38rem] bg-transparent ${
              isLoading ? "hidden" : ""
            }`}
            src={catItem.image}
            alt="cat image"
            onLoad={() => handleLoading()}
          />
        </div>
        <section className="flex flex-row justify-around my-5 p-[-1]">
          <button className="vote-button" onClick={() => postVote(1)}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
          </button>
          <button className="vote-button down" onClick={() => postVote(-1)}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
            </svg>
          </button>
        </section>
      </section>
      <div
        className={`flex ${scoreColor} h-10 w-full -translate-y-10 -z-10 justify-center items-end rounded-b-lg ${
          animateClss === true ? "animate-slide" : ""
        }`}
      >
        <p className="pb-1">Voted {serviceRes}</p>
      </div>
    </>
  );
};

export default VoteComp;
