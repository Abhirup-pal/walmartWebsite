import React from "react";
import Card from "./Card";
import images from '../Images'; // Adjust the path based on where index.js is located

const Deals = (props) => {
  const cards = props.cards;

  return (
    <div className="w-full">
      <div className="grid grid-cols-5 w-[70vw] gap-4 mt-4 mx-auto">
        {cards.length ? cards.map((card) => {
          {/* const photo = images[card.article_id] || 'default-image-path'; // Use a default image if not found */}
          let num=card.article_id;
          let str2=num.toString();
          const photo=images[str2]
          console.log(str2)
          return (
            <Card
              photo={photo}
              title={card.prod_name}
              price={card.price}
            />
          );
        }) : <h1>Loading...</h1>}
      </div>
    </div>
  );
};

export default Deals;
