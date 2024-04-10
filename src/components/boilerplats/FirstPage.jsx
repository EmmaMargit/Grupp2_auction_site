import React, { useState, useEffect } from "react";
import "../../stylesheet/FirstPage.css";
import { Link } from "react-router-dom";

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
              <ul key={index}>
                {/* TODO: Gör om Link nedan, den måste oxå importeras. sen måste ni i Details lyfta in useLocation och inte gå via props.
                <Link to={`/auction/${auction.AuctionID}`} state={{ auction: auction }}>Till specifik auktion</Link> */}
                <Link
                  to={`/auction/${auction.AuctionID}`}
                  state={{ auction: auction }}
                >
                  <h3 id="auctionTitle">{auction.Title}</h3>
                </Link>
              </ul>
            ))}
          </ul>
        )}
        <div id="category">
          <h2>Kategori</h2>
          <h4>Alla kategorier (13)</h4>
          <h4>Konst (3)</h4>
          <h4>Klockor (6)</h4>
          <h4>Böcker (4)</h4>
        </div>
      </div>
    </>
  );
}

export default FirstPage;
