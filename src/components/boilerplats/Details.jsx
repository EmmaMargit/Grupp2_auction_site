/* import React, { useEffect, useState } from "react";

function Details() {
  const [getAuctionById, setGetAuctionById] = useState([]);

  useEffect(() => {
    const getSpecifikAuction = () => {
      fetch(`https://auctioneer2.azurewebsites.net/auction/2wvu/${AuctionID}`)
        .then((res) => res.json())
        .then((data) => setGetAuctionById(data));
    };
    getSpecifikAuction();
  }, []);
  return (
    <div>
      <h1>Testar data</h1>
      <ul>
        {getAuctionById &&
          Array.isArray(getAuctionById) &&
          getAuctionById.map((item, index) => (
            <li key={index}>
              {item.Title} {item.Description}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Details;
 */