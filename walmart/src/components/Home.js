import React from 'react';
import Deals from "./Deals";
import Hero from "./Hero";

function Home({cards}) 
{
    return(
        <div className="bg-[#e6f1fc]">
            <Hero />
            <Deals cards={cards}/>
        </div>
    )
}

export default Home;