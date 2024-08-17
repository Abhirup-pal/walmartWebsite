import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Store from "./components/Store";
import FilterComponent from "./components/Filter";
import axios from 'axios';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function App() {
  const [cards, setCards] = useState([]);
  const [cards2, setCards2] = useState([]);
  const [queryinput, setQueryinput] = useState("");
  // const [filters, setFilters] = useState({ age: '', minPrice: '', maxPrice: '', gender: '' });
  // const [location, setLocation] = useState({
  //   latitude: null,
  //   longitude: null,
  //   accuracy: null,
  // });

  // const [error, setError] = useState(null);

  // const handleQuery = async (e) => {
  //   e.preventDefault();
  //   console.log(queryinput);
  //   const fetchData = async () => {
  //     const response = await axios.get(`http://localhost:8000/api/getRecommendations/?query=${queryinput+' '+filters.age+' '+filters.gender}`);
  //     setCards(response.data);
  //   }
  //   fetchData();
  //   navigate('/store');
  // };

  


  

  return (
    <Router>
      <Navbar setCards={setCards} queryinput={queryinput} setQueryinput={setQueryinput}/>
      <Routes>
        <Route path="/" element={<Home cards={cards2} setCards={setCards2}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/store" element={<Store cards={cards} queryinput={queryinput} setCards={setCards}/>} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
