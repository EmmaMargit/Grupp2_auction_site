import React, { useState, useEffect } from "react";
import "../../stylesheet/FirstPage.css"

function FirstPage() {
  // Alla auktioner
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    getAuctions();
  }, []);

  // Funktion för att hämta alla auktioner
  function getAuctions() {
    fetch(`https://auctioneer2.azurewebsites.net/auction/2wvu`)
      .then((response) => response.json())
      .then((result) => {
        // Kolla om det finns auktioner
        if (result && result.length > 0) {
          setAuctions(result);
        }
      })
      .catch((error) => {
        console.error("Felmeddelande", error);
      });
  }

  return (
    <div className="container">
      <h2>Alla auktioner</h2>
      {auctions && auctions.length > 0 && (
        <ul>
          {auctions.map((auction, index) => (
            <li key={index}>
              <h3>{auction.Title}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FirstPage;
