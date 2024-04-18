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
    const formattedDate = `${postDate.getFullYear()}-${
      postDate.getMonth() + 1
    }-${postDate.getDate()} ${postDate.toLocaleTimeString()}`;
    return formattedDate;
  };

  const { Id } = useParams();
  const [bids, setBids] = useState([]);
  const [highestBid, setHighestBid] = useState(null);
  const userBidRef = useRef(null);
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
        bids.length > 0 // kontroll om det finns några bud
          ? bids.reduce(
              (
                previousHighestBid,
                currentBid // jämföra tidigare högsta budet med nuvarande but
              ) =>
                previousHighestBid.Amount > currentBid.Amount
                  ? previousHighestBid
                  : currentBid
            )
          : null;
      setHighestBid(highestBid);
    }
  }, [bids]);

  const placeBid = () => {
    const userBid = parseInt(userBidRef.current.value);
    if (!isNaN(userBid) && userBid > (highestBid ? highestBid.Amount : 0)) {
      userBidRef.current.value = ""; // Nollställ input efter att budet har lagts
      console.log("Bid placed:", userBid);
    } else {
      alert("Your bid is too low or invalid.");
    }
  };

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
          <input type="number" ref={userBidRef} />
          <button onClick={placeBid}>Place Bid</button>
        </div>
      )}
      {bids.length === 0 && currentDateForDeleting > endDateForDeleting ? (
        <div>
          <p>Det finns inga bud ännu, du kan ta bort auktionen</p>
          <button onClick={deleteAuction}>Delete Auction</button>
        </div>
      ) : null}
    </div>
  );
}

export default Details;

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
