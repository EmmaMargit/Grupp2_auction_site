import React, { useEffect, useState, useRef } from "react";
import styles from "../../stylesheet/Details.module.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";

function Details() {
  const location = useLocation();
  const { auction } = location.state;
  const currentDateForDeleting = new Date();
  const endDateForDeleting = new Date(auction.EndDate);

  const formatDate = (dateString) => {
    const postDate = new Date(dateString);
    const formattedDate = `${postDate.getFullYear()}-${postDate.getMonth() + 1
      }-${postDate.getDate()} ${postDate.toLocaleTimeString()}`;
    return formattedDate;
  };

  const { Id } = useParams();
  const [bids, setBids] = useState([]);
  const [highestBid, setHighestBid] = useState(null);
  const userBidRef = useRef(null);
  const userNameRef = useRef(null); // Ref för att hämta värdet från namninput
  const [bidErrorMessage, setBidErrorMessage] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`https://auctioneer2.azurewebsites.net/bid/2wvu/${Id}`)
      .then((response) => response.json())
      .then((data) => {
        setBids(data);
      })
      .catch((error) => {
        console.error("Error fetching bids: ", error);
      });
  }, [Id]);

  useEffect(() => {
    const currentDate = new Date();
    const endDate = new Date(auction.EndDate);
    if (currentDate > endDate) {
      const highestBid =
        bids.length > 0
          ? bids.reduce((previousHighestBid, currentBid) =>
              previousHighestBid.Amount > currentBid.Amount
                ? previousHighestBid
                : currentBid
            )
          : null;
      setHighestBid(highestBid);
    }
  }, [bids]);


// Lägga nytt bud med hjälp av Arrow function: 
const placeBid = () => {
  const userBid = parseInt(userBidRef.current.value);
  const userName = userNameRef.current.value; // Hämta värdet från namninput
  
  const highestBid = bids.length > 0 ? Math.max(...bids.map(o => o.Amount)) : auction.StartingPrice;

  if (userBid > highestBid) {
    console.log("Valid bid. Proceeding with request...");

    userBidRef.current.value = ''; // Nollställ input efter att budet har lagts
    userNameRef.current.value = ''; // Nollställ namninput efter att budet har lagts
    setBidErrorMessage(''); // Återställ felmeddelandet om budet är tillräckligt högt

    fetch(`https://auctioneer2.azurewebsites.net/bid/2wvu`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "Amount": userBid,
      "AuctionID": auction.AuctionID,
      "Bidder": userName
    })
  })
  .then(response => response.json())
  .then(newBid => {

    // Uppdatera tillståndet för bud
    setBids([...bids, { Amount: userBid, Bidder: userName }]);
  })
  .catch(error => console.error("Error placing bid:", error));

  console.log("Bid placed by", userName, ":", userBid); // Logga budet och användarens namn
  } else {
    setBidErrorMessage('Your bid is too low or invalid.');
  }
}
  const deleteAuction = () => {
    const deleteURL = `https://auctioneer2.azurewebsites.net/auction/2wvu/${Id}`;
    console.log("DELETE URL:", deleteURL);
    fetch(deleteURL, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete");
      } else {
        console.log("Successfully deleted");
        navigate("/");
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h3>{auction.Title}</h3>
        <div className={styles.detailP}>
          <p className={styles.label}>Description:</p>
          <p>{auction.Description}</p>
        </div>
        <div className={styles.detailP}>
          <p className={styles.label}>Starting Price:</p>
          <p>{auction.StartingPrice} kr</p>
        </div>
        <div className={styles.detailP}>
          <p className={styles.label}>Start Date:</p>
          <p>{formatDate(auction.StartDate)}</p>
        </div>
        <div className={styles.detailP}>
          <p className={styles.label}>End Date:</p>
          <p>{formatDate(auction.EndDate)}</p>
        </div>
      </div>
              
      {highestBid ? (
        <div className={styles.detailP}>
          <p className={styles.label}>Winning bid:</p>
          <p className={styles.label}>Bidder: {highestBid.Bidder},</p>
          <p className={styles.label}>Amount: {highestBid.Amount} kr</p>
        </div>
      ) : (
        currentDateForDeleting < endDateForDeleting && (
          <div className={styles.bids}>
            <h3>Bids</h3>
            <ul>
              {bids.map((bid, index) => (
                <ul className={styles.bidiInfo} key={index}>
                  <span>{bid.Bidder}</span>
                  <span>{bid.Amount} kr</span>
                </ul>
              ))}
            </ul>
         
          {/* Input för budgivarens namn */}
          <input type="text" ref={userNameRef} /> 

          {/* Input för budgivarens bud */}
          <input type="number" ref={userBidRef} />

          <button onClick={() => placeBid()}>Place Bid</button>
        )

      )}
      {bids.length === 0 && currentDateForDeleting > endDateForDeleting ? (
        <div>
          <p>There is no bids for this auction, you can delete it</p>
          <button onClick={deleteAuction}>Delete Auction</button>
        </div>
      ) : null}

    </div>
  );
}

export default Details;
