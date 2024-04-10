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
    <>
      <div className="container">
        <input type="text" id="searchBar" placeholder="Search" />

        <h2>Alla auktioner</h2>
        {auctions && auctions.length > 0 && (
          <ul>
            {auctions.map((auction, index) => (
              <ul key={index} id="auctionTitle">
                <h3 >{auction.Title}</h3>
              </ul>
            ))}
          </ul>
        )}
        <div id="category">
          <h2>Kategori</h2>
          <h4>Alla kategorier   (13)</h4>
          <h4>Konst  (3)</h4>
          <h4>Klockor   (6)</h4>
          <h4>Böcker   (4)</h4>
        </div>
      </div>
    </>
  );
}

export default FirstPage;
