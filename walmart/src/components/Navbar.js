import React, { useState } from "react";
import logo from "../assets/logo1.png";
import { FaLayerGroup } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { MdLogin, MdLogout } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import Store from "./Store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/jpeg") {
      setSelectedImage(URL.createObjectURL(file));

      // Prepare the form data
      const formData = new FormData();
      formData.append("image", file);

      // Send the file to the backend
      try {
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const message = await response.text();
          alert(message);

          // const fetchData = async ()=>{
          //   const response = await axios.get("http://localhost:8000/api/getRecommendations");
          //   setCards(response.data);
          // }
          
          // <Store cards={cards}/>
      
          navigate('/store');


        } else {
          alert("Failed to upload the image.");
        }
      } catch (error) {
        console.error("Error uploading the image:", error);
      }
    } else {
      alert("Please upload a JPG image.");
    }
  };

  return (
    <div className="">
      <div className="bg-[#0071dc] px-3 py-2 lg:px-8 text-white flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-x-3 shrink-0">
          <a className="hover:bg-[#06529a] p-2 rounded-full" href="/">
            <img src={logo} alt="" className="h-12" />
          </a>

          <div className="md:flex items-center gap-2 hidden hover:bg-[#06529a] p-3 rounded-full">
            <FaLayerGroup className="text-[17px]" />
            <p className="text-[16px] font-semibold">Sections</p>
          </div>
          <div className="md:flex hidden items-center gap-2 hover:bg-[#06529a] p-3 rounded-full">
            <HiUserGroup className="text-[20px]" />
            <p className="text-[16px] font-semibold">Partners</p>
          </div>
        </div>
        {/* Middle */}
        <div className="hidden relative lg:flex items-center flex-1 mx-6">
          <input
            type="search"
            className="rounded-full py-1.5 outline-0 flex-1"
          />
          <div className="absolute bg-[#ffc220] p-1.5 rounded-full left-1.5">
            <GoSearch className="text-black" />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center gap-x-2">
          <a
            className="flex items-center gap-2 hover:bg-[#06529a] p-3 rounded-full"
            href="/signup"
          >
            <MdLogin className="text-[17px] rotate-90" />
            <p className="text-[16px] font-semibold">Sign up</p>
          </a>
          <a
            className="flex items-center gap-2 hover:bg-[#06529a] p-3 rounded-full whitespace-nowrap"
            href="/login"
          >
            <MdLogout className="text-[20px] -rotate-90" />
            <p className="text-[16px] font-semibold">Log in</p>
          </a>
          <div className="hover:bg-[#06529a] p-3 rounded-full">
            <AiOutlineShoppingCart className="w-7 h-7" />
          </div>
          {/* Image Upload */}
          <div className="hover:bg-[#06529a] p-3 rounded-full">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/jpeg"
                onChange={handleImageUpload}
                className="hidden"
              />
              <span className="text-[16px] font-semibold">Upload Image</span>
            </label>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="bg-[#0071dc] mt-[1px] text-white px-3 py-2 lg:px-8 flex items-center gap-6">
        <div className="flex items-center gap-1 hover:underline">
          <BsPhone />
          <p className="text-[15px] font-bold">Place an order on the App</p>
        </div>
        <div className="flex items-center gap-1 hover:underline">
          <BiWorld />
          <p className="text-[15px] hover:underline">TX Adress 87358</p>
        </div>
        <p className="hidden md:flex hover:underline">Deals on Phones</p>
        <p className="hidden md:flex font-bold hover:underline">
          $499 OFF on Laptops
        </p>
      </div>
    </div>
  );
};

export default Navbar;
