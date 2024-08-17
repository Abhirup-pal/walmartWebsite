import React from "react";
import Deals from "./Deals";
import Hero from "./Hero";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Home({ cards, setCards }) {
 
  useEffect( () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(longitude, latitude);
          // console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
          const date = new Date();
          const month = date.getMonth();

          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          const currentMonthName = monthNames[month];
          const formatCoordinates = (latitude, longitude) => {
            const latDirection = latitude >= 0 ? "N" : "S";
            const longDirection = longitude >= 0 ? "E" : "W";
    
            const formattedLatitude = `${Math.abs(latitude).toFixed(6)}° ${latDirection}`;
            const formattedLongitude = `${Math.abs(longitude).toFixed(6)}° ${longDirection}`;
    
            return `${formattedLatitude}, ${formattedLongitude}`;
          };

          const formattedCoordinates = formatCoordinates(latitude, longitude);
          console.log(typeof formattedCoordinates)

          let season;

          const fetchSeason=async()=>{
          const response = await axios.get(`http://localhost:8000/api/getSeason/?query=${formattedCoordinates}&month=${currentMonthName}`);
          season=(response.data.season);
          }

          await fetchSeason();
          // console.log(season);

          const fetchData = async () => {
          const response = await axios.get(
            `http://localhost:8000/api/getRecommendations?query=${season +' '+'garments'}`
          );
          setCards(response.data);
          };

          fetchData();


        },
        (error) => {
          console.error("Error occurred while retrieving location:", error);
        }
      );

      

      

      //const formattedCoordinates = formatCoordinates(latitude, longitude);

      // const fetchData = async () => {
      //   const response = await axios.get(
      //     "http://localhost:8000/api/getRecommendations"
      //   );
      //   setCards(response.data);
      // };

      //fetchData();

      // const fetchSeason=async()=>{
      //   const response = await axios.get(`http://localhost:8000/api/getSeason/?query=${formattedCoordinates}&month=${currentMonthName}`);
      //   season=(response.data);
      // }

      //fetchSeason();

      //console.log(formattedCoordinates)
      // console.log(currentMonthName);
      // console.log(season);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="bg-[#e6f1fc]">
      <Hero />
      <Deals cards={cards} />
    </div>
  );
}

export default Home;
