import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { Outlet } from "react-router";
import Cats from "./Components/Cats/Cats";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path="/Cats" element={<Cats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
