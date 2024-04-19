import React, { useRef, useState, useEffect } from "react";
import "../../stylesheet/FirstPage.css";
import { Link } from "react-router-dom";

function FirstPage() {
  // Alla auktioner
  const [auctions, setAuctions] = useState([]);
  const [allAuctions, setAllAuctions] = useState([]); // En state för att spara alla auktioner

  //snappa upp sökfältet
  const inputField = useRef(null); //hänvisa till input

  // Hämta alla auktioner på startsidan på en gång
  useEffect(() => {
    getAuctions();
  }, []);

  const handleInputField = (event) => {
    const searchItem = inputField.current.value;
  };

  // Eventhandler när man sökt på specifik auktion eller ej
  const handleInputBtn = (event) => {
    event.preventDefault();

    const searchItem = inputField.current.value.trim();
    if (searchItem === "") {
      getAuctions();
    } else {
      getSearchedAuctions(searchItem);
    }
  };

  // Funktion för att hämta alla auktioner
  function getAuctions() {
    fetch(`https://auctioneer2.azurewebsites.net/auction/2wvu`)
      .then((response) => response.json())
      .then((result) => {
        // Kolla om det finns auktioner
        if (result && result.length > 0) {
          setAuctions(result);
          setAllAuctions(result); // Spara alla auktioner i en separat state
        }
        console.log(result);
      })
      .catch((error) => {
        console.error("Felmeddelande", error); // Felmeddalande om det ej finns auktioner
      });
  }

  // Funktion för att hämta specifik auktion efter sökning
  function getSearchedAuctions(searchItem) {
    const specificAuctions = allAuctions.filter((auction) =>
      auction.Title.toLowerCase().includes(searchItem.toLowerCase())
    );
    setAuctions(specificAuctions); // Uppdatera state med de sökta auktionsorden
  }

  let openAuction = "";
  let closedAuction = "";

  //Ändra stil på datumet
  const formatDate = (dateString) => {
    const postDate = new Date(dateString);
    const formattedDate = `${postDate.getFullYear()}-${postDate.getMonth() + 1
      }-${postDate.getDate()} ${postDate.toLocaleTimeString()}`;
    return formattedDate;
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleInputBtn}>
          <input
            type="text"
            id="searchBar"
            ref={inputField}
            onChange={handleInputField}
            placeholder="Search"
          />
          <button type="submit" id="searchBtn">
            Sök auktion
          </button>
        </form>
        <h2>Alla auktioner</h2>
        {auctions && auctions.length > 0 && (
          <ul>
            {auctions.map((auction, index) => (
              <ul key={index} id="auctionTitle">
                <Link
                  to={`/auction/${auction.AuctionID}`}
                  state={{ auction: auction }}
                >
                  {/* Vi valde att endast ha med nedan info på startsidan, detaljvyn visar mer info */}

                  <h2 id="auctionTitle">{auction.Title}</h2>
                </Link>
                <h3 id="auctionStartingPrice">{auction.StartingPrice}</h3>
                <h3 id="auctionEndDate">{formatDate(auction.EndDate)}</h3>
                {auction.EndDate < new Date().toISOString() ? (
                  (closedAuction = (
                    <h3 style={{ color: "red" }}>Closed auction</h3>
                  ))
                ) : (
                  <h3 style={{ color: "green" }}>Open auction</h3>
                )}
              </ul>
            ))}
          </ul>
        )}

        {/* <div id="category">
          <h2>Kategori</h2>
          <h4>Alla kategorier (13)</h4>
          <h4>Konst (3)</h4>
          <h4>Klockor (6)</h4>
          <h4>Böcker (4)</h4>
        </div>  */}
      </div>
    </>
  );
}

export default FirstPage;
