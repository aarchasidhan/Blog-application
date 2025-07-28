import { useState } from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Only import Routes and Route
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Add from "./components/Add";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/add/:id" element={<Add />} />
      </Routes>
    </>
  );
}

export default App;
