import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Store from "./components/Store";
import axios from 'axios';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [cards, setCards] = useState([]);


  useEffect(() => {
    const fetchData = async ()=>{
      const response = await axios.get("http://localhost:8000/api/getRecommendations");
      setCards(response.data);
    }
    fetchData();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home cards={cards} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/store" element={<Store />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
