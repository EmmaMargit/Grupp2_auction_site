import React, { useEffect, useState, useRef } from "react";
import styles from "../../stylesheet/Details.module.css";
import { useLocation, useParams } from "react-router-dom";

function Details() {
  const location = useLocation();
  const { auction } = location.state;

  const formatDate = (dateString) => {
    const postDate = new Date(dateString);
    const formattedDate = `${postDate.getFullYear()}-${postDate.getMonth() + 1
      }-${postDate.getDate()} ${postDate.toLocaleTimeString()}`;
    return formattedDate;
  };

  const { id } = useParams();
  const [bids, setBids] = useState([]);
  const [highestBid, setHighestBid] = useState(null);
  const [auctionClosed, setAuctionClosed] = useState(false);
  const userBidRef = useRef(null);
  const userNameRef = useRef(null); // Ref för att hämta värdet från namninput
  const [bidErrorMessage, setBidErrorMessage] = useState('');

  useEffect(() => {
    fetch(`https://auctioneer2.azurewebsites.net/bid/2wvu/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBids(data);
      })
      .catch((error) => {
        console.error("Error fetching bids: ", error);
      });
  }, [id]);

  useEffect(() => {
    const currentDate = new Date();
    const endDate = new Date(auction.EndDate);
    if (currentDate > endDate) {
      setAuctionClosed(true);
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
  }, [auction.EndDate, bids]);

// Lägga nytt bud med hjälp av Arrow function: 
const placeBid = () => {
  const userBid = parseInt(userBidRef.current.value);
  const userName = userNameRef.current.value; // Hämta värdet från namninput

  console.log(auction);
  
  if ((userBid >= auction.StartingPrice) && (userBid > Math.max(...bids.map(o => o.Amount))|| bids.length === 0)) {

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
    setBids(prevBids => [...prevBids, newBid]);
  })
  .catch(error => console.error("Error placing bid:", error));

  console.log("Bid placed by", userName, ":", userBid); // Logga budet och användarens namn
} else {
  setBidErrorMessage('Your bid is too low or invalid.');
}
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
      {auctionClosed ? (
        <div className={styles.detailP}>
          <p className={styles.label}>Winning bid:</p>
          {highestBid ? (
            <div className={styles.detailP}>
              <p className={styles.label}>Bidder: {highestBid.Bidder},</p>
              <p className={styles.label}>Amount: {highestBid.Amount} kr</p>
            </div>
          ) : (
            <p>No bids for this auction, auction is closed!</p>
          )}
        </div>
      ) : (
        <div className={styles.bids}>
          <h3>Bids</h3>
          <ul>
            {bids.map((bid, index) => (
              <li key={index}>
                Bidder: {bid.Bidder}<br />
                Amount: {bid.Amount} kr
                <br />
                <br />
              </li>
            ))}
          </ul>
          {bidErrorMessage && <p className={styles.errorMessage}>{bidErrorMessage}</p>}

          {/* Input för budgivarens namn */}
          <input type="text" ref={userNameRef} /> 

          {/* Input för budgivarens bud */}
          <input type="number" ref={userBidRef} />

          <button onClick={() => placeBid()}>Place Bid</button>

        </div>
      )}
    </div>
  );
}

export default Details;


// Lägga nytt bud med hjälp av Arrow function: 
// const placeBid = () => {
//   const userBid = parseInt(userBidRef.current.value);
//   const userName = userNameRef.current.value; // Hämta värdet från namninput
//   if (userBid > (Math.max(...bids.map(o => o.Amount)) || auction.StartingPrice)) {
//     userBidRef.current.value = ''; // Nollställ input efter att budet har lagts
//     userNameRef.current.value = ''; // Nollställ namninput efter att budet har lagts
//     setBidErrorMessage(''); // Återställ felmeddelandet om budet är tillräckligt högt

//     fetch(`https://auctioneer2.azurewebsites.net/bid/2wvu`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "Amount": userBid,
//       "AuctionID": auction.AuctionID,
//       "Bidder": userName
//     })
//   })
//   .then(response => response.json())
//   .then(newBid => {

//     // Uppdatera tillståndet för bud
//     setBids(prevBids => [...prevBids, newBid]);
    
//   })
//   .catch(error => console.error("Error placing bid:", error));

//   console.log("Bid placed by", userName, ":", userBid); // Logga budet och användarens namn
// } else {
//   setBidErrorMessage('Your bid is too low or invalid.');
// }
// };



// const placeBid = () => {
//   const userBid = parseInt(userBidRef.current.value);
//   const userName = userNameRef.current.value;

//   console.log("User bid:", userBid); // Logga användarens bud
//   console.log("Starting price:", auction.StartingPrice); // Logga startpriset

//   if (userBid <= 0) {
//     // Kontrollera om budet är mindre än eller lika med noll
//     setBidErrorMessage('Your bid must be greater than zero.');
//     return; // Avsluta funktionen om budet är ogiltigt
//   }

//   if (bids.length === 0 && userBid < auction.StartingPrice) {
//     // Kontrollera om det är det första budet och om det är lägre än eller lika med startpriset
//     setBidErrorMessage('Your bid must be higher than or equal to the starting price.');
//     return; // Avsluta funktionen om budet är för lågt
//   }

//   if (userBid <= Math.max(...bids.map(bid => bid.Amount))) {
//     // Kontrollera om budet är lägre än eller lika med det högsta budet
//     setBidErrorMessage('Your bid must be higher than the current highest bid.');
//     return; // Avsluta funktionen om budet är för lågt
//   }

//   if (userBid === auction.StartingPrice) {
//     // Kontrollera om budet är lika med startpriset
//     setBidErrorMessage('Your bid must be higher than the starting price.');
//     return; // Avsluta funktionen om budet är för lågt
//   }

//   // Om budet är godkänt, fortsätt med att lägga till budet
//   fetch(`https://auctioneer2.azurewebsites.net/bid/2wvu`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "Amount": userBid,
//       "AuctionID": auction.AuctionID,
//       "Bidder": userName
//     })
//   })
//   .then(response => response.json())
//   .then(newBid => {
//     // Uppdatera tillståndet för bud
//     setBids(prevBids => [...prevBids, newBid]);
//     console.log("Bid placed by", userName, ":", userBid);
//   })
//   .catch(error => console.error("Error placing bid:", error));

//   // Återställ felmeddelandet om budet är tillräckligt högt
//   setBidErrorMessage('');
//   // Logga budet och användarens namn
//   console.log("Bid placed by", userName, ":", userBid); 
// };


  // Lägga nytt bud med hjälp av Arrow function: 
//   const placeBid = () => {
//     const userBid = parseInt(userBidRef.current.value);
//     const userName = userNameRef.current.value; // Hämta värdet från namninput
//     if (userBid > (Math.max(...bids.map(o => o.Amount)) || auction.StartingPrice)) {
//       userBidRef.current.value = ''; // Nollställ input efter att budet har lagts
//       userNameRef.current.value = ''; // Nollställ namninput efter att budet har lagts
//       setBidErrorMessage(''); // Återställ felmeddelandet om budet är tillräckligt högt

//       fetch(`https://auctioneer2.azurewebsites.net/bid/2wvu`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         "Amount": userBid,
//         "AuctionID": auction.AuctionID,
//         "Bidder": userName
//       })
//     })
//     .then(response => response.json())
//     .then(newBid => {

//       // Uppdatera tillståndet för bud
//       setBids(prevBids => [...prevBids, newBid]);
//       // console.log("Bid placed by", userName, ":", userBid);
//     })
//     .catch(error => console.error("Error placing bid:", error));

//     console.log("Bid placed by", userName, ":", userBid); // Logga budet och användarens namn
//   } else {
//     setBidErrorMessage('Your bid is too low or invalid.');
//   }
// };



// TODO: Gör en fetch - POST bid
      // Posta mot serven 
      // uppdatera statet


// import React, { useEffect, useState } from "react";
// import styles from "../../stylesheet/Details.module.css";
// import { useLocation, useParams } from "react-router-dom";

// function Details() {
//   const location = useLocation();
//   const { auction } = location.state;

//   const formatDate = (dateString) => {
//     const postDate = new Date(dateString);
//     const formattedDate = `${postDate.getFullYear()}-${
//       postDate.getMonth() + 1
//     }-${postDate.getDate()} ${postDate.toLocaleTimeString()}`;
//     return formattedDate;
//   };

//   const { id } = useParams();
//   const [bids, setBids] = useState([]);
//   const [highestBid, setHighestBid] = useState(null);
//   const [auctionClosed, setAuctionClosed] = useState(false);

//   useEffect(() => {
//     fetch(`https://auctioneer2.azurewebsites.net/bid/2wvu/${id}`)
//       .then((response) => {
//         return response.json();
//       })

//       .then((data) => {
//         setBids(data);
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching bids: ", error);
//       });
//   }, [id]);

//   useEffect(() => {
//     const currentDate = new Date();
//     const endDate = new Date(auction.EndDate);
//     if (currentDate > endDate) {
//       setAuctionClosed(true);
//       const highestBid =
//         bids.length > 0 // kontroll om det finns några bud
//           ? bids.reduce(
//               (
//                 previousHighestBid,
//                 currentBid // jämföra tidigare högsta budet med nuvarande but
//               ) =>
//                 previousHighestBid.Amount > currentBid.Amount
//                   ? previousHighestBid
//                   : currentBid
//             )
//           : null;
//       setHighestBid(highestBid); // sätter högsta budet i state
//     }
//   }, [auction.EndDate, bids]);

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <h3>{auction.Title}</h3>
//         <div className={styles.detailP}>
//           <p className={styles.label}>Description:</p>
//           <p>{auction.Description}</p>
//         </div>
//         <div className={styles.detailP}>
//           <p className={styles.label}>Start Date:</p>
//           <p>{formatDate(auction.StartDate)}</p>
//         </div>
//         <div className={styles.detailP}>
//           <p className={styles.label}>End Date:</p>
//           <p>{formatDate(auction.EndDate)}</p>
//         </div>
//         <div className={styles.detailP}>
//           <p className={styles.label}>Starting Price:</p>
//           <p>{auction.StartingPrice}</p>
//         </div>
//         {auctionClosed ? ( // om auctionen är stängd och har bud visa bud och högsta budgivare
//           <div className={styles.detailP}>
//             <p className={styles.label}>Winning bid:</p>
//             {highestBid ? (
//               <div className={styles.detailP}>
//                 <p className={styles.label}>Bidder: {highestBid.Bidder},</p>
//                 <p className={styles.label}>Amount: {highestBid.Amount} kr</p>
//               </div>
//             ) : (
//               <p>No bids for this auction, auction is closed!</p> // om auktionen är stängd men inte har bud visa meddelandet!
//             )}
//           </div>
//         ) : (
//           <div>
//             <h3>Bids</h3>
//             <ul>
//               {bids.map((bid, index) => (
//                 <li key={index}>
//                   Bidder: {bid.Bidder},<br />
//                   Amount: {bid.Amount} kr
//                   <br />
//                   <br />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Details;
