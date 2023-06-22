import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import Button from "../Button/Button";


const Card = () => {
  const [data, setData] = useState([]);
  // console.log(data);
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleSort = () => {
    const sortedData = data.sort((a,b) =>{
      return new Date(a.published_in) - new Date(b.published_in);
    })
    setData([...data, sortedData]);
    
  }

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(
        "https://openapi.programming-hero.com/api/ai/tools"
      );
      const allData = await res.json();
      setData(allData.data.tools);
    };
    loadData();
  }, []);

  return (
    <div>
      <span onClick={handleSort}>
        <Button>Sort By Date</Button>
      </span>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.slice(0, showAll ? 12 : 6).map((singleData) => (
          <SingleCard singleData={singleData} key={singleData.id}></SingleCard>
        ))}
      </div>
      {!showAll && (
        <span onClick={handleShowMore}>
          <Button>Show More</Button>
        </span>
      )}
    </div>
  );
  
};

export default Card;
