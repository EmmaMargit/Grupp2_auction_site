import React, { useRef, useState } from "react";
import "../stylesheet/FirstPage.css";

function FirstPage() {
  const inputField = useRef(null); //Referens till inpufält
  const [searchResult, setSearchResult] = useState([]); //State för sökresultatet

  const inputHandler = (event) => {
    const value = inputField.current.value;
  }

  const inputBtn = (event) => {
    event.preventDefault();
  }

  //Funktion för att hämta alla auktioner

  function getAuctions() {
    fetch(`länk att fetcha`)
      .then((response) => response.json())
      .then((result) => {
        setMealResult(result.meals);
      })
      .catch((error) => {
        console.error("Felmeddelande", error);
      });

  }

  return (
    <div className="container">
      <form className="inputStyling" onSubmit={inputBtn}>
        <input type="text" ref={inputField} onChange={inputHandler} />
        <button type="submit">Sök</button>
      </form>
      <h2>Alla auktioner</h2>
    </div>
  )
};

export default FirstPage;