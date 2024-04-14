import React, { useRef, useState, useEffect } from "react";
import "../../stylesheet/FirstPage.css"
import { Link } from "react-router-dom";

function FirstPage() {
  // Alla auktioner
  const [auctions, setAuctions] = useState([]);
  const inputField = useRef(null); //hänvisa till input
  const [searchItem, setSearchItem] = useState("");
  //const [searchResult, setSearchResult] = useState([]); //state för sökresultatet

  useEffect(() => {
    getAuctions();
  }, []);

  const handleInputField = (event) => {
    const searchItem = inputField.current.value;
  };

  const handleInputBtn = (event) => {
    event.preventDefault();
    getSearchedAuctions(searchItem);
  }


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

  //Funktion för att hämta specifik auktion efter sökning
  function getSearchedAuctions(searchItem) {
    fetch(`https://auctioneer2.azurewebsites.net/auction/2wvu/${searchItem}`)
      .then((response) => response.json())
      .then((result) => {
        // Uppdatera listan med alla auktioner med sökresultatet
        setAuctions(result.auctions);
      })
      .catch((error) => {
        console.error("Felmeddelande", error);
      });
  }

  return (
    <>
      <div className="container">

        <form onSubmit={handleInputBtn}>
          <input type="text" id="searchBar" ref={inputField} onChange={handleInputField} placeholder="Search" />
          <button type="submit" id="searchBtn">Sök auktion</button>
        </form>

        <div id="category">

          {auctions && auctions.length > 0 && (
            <ul>
              {auctions.map((auction, index) => (
                <ul key={index} id="auctionTitle">
                  <Link
                    to={`/auction/${auction.AuctionID}`}
                    state={{ auction: auction }}
                  >
                    <h2 id="auctionTitle">{auction.Title}</h2>
                  </Link>
                  <h3 id="auctionStartingPrice">{auction.StartingPrice}</h3>
                  <h3 id="auctionEndDate">{auction.EndDate}</h3>
                </ul>
              ))}
            </ul>
          )} </div>
        {/* <div id="category">
>>>>>>> CSS-kungen
          <h2>Kategori</h2>
          <h4>Alla kategorier (13)</h4>
          <h4>Konst (3)</h4>
          <h4>Klockor (6)</h4>
          <h4>Böcker (4)</h4>

        </div> */}

      </div>
    </>
  );
}

export default FirstPage;

