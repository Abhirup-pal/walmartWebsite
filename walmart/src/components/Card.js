import React from "react";

const Card = ({ photo, title, price }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md">
      {/* Image */}
      <img
        src={photo}
        alt={title}
        className="w-56 h-56 rounded-lg object-cover mb-2"
      />

      {/* Text Content */}
      <div className="flex flex-col items-center w-[13rem] text-center">
        <p className="text-[13px] font-semibold mb-1">{title}</p>
        <p className="text-[13px] text-gray-700">Rs. {price}/-</p>
      </div>
    </div>
  );
};

export default Card;
