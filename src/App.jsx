import { useState } from "react";
import "./App.css";
import Modal from "./Components/Modal/Modal";
import VoteComp from "./Components/VoteComp/VoteComp";
import Gatalog from "./Components/Gatalog/Gatalog";
//-- declaration

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('voting');
  const [gatalogBtn, setGatalogBtn] = useState('bg-transparent');
  const [voteBtn, setVoteBtn] = useState('bg-orange-500');

  const SetColors = () => {
    setGatalogBtn(gatalogBtn === 'bg-transparent' ? 'bg-orange-500' : 'bg-transparent');
    setVoteBtn(voteBtn === 'bg-orange-500' ? 'bg-transparent' : 'bg-orange-500');
    setActiveTab(activeTab === 'gatalog' ? 'voting' : 'gatalog');
  };

  return (
    <div className="flex flex-col items-center mt-16 mb-10">
      <div className="h-10 flex flex-col justify-center">
        <img
          src="https://images.vexels.com/content/132714/preview/witch-cat-face-aaba91.png"
          className="max-h-28 w-auto"
          alt="React logo"
        />
        <h1 className="text-center font-serif text-3xl">Gatalog</h1>
      </div>
      <div className="flex flex-row mt-20">
        <button className={`mx-5 border-2 p-2 rounded-lg w-24 ${gatalogBtn}`} onClick={() => SetColors()}>
          Gatalog
        </button>
        <button className={`mx-5 border-2 p-2 rounded-lg w-24 ${voteBtn}`} onClick={() => SetColors()}>
          Voting
        </button>
      </div>
      <div className="flex flex-col items-center mt-4">
        {activeTab === 'gatalog' ? <Gatalog /> : <VoteComp />}
      </div>
      {isModalOpen && <Modal item={id} onClose={setModalOpen} />}
    </div>
  );
}

export default App;
