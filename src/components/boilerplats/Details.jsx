import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    fetch(`https://auctioneer2.azurewebsites.net/bid/2wvu/${id}`)

      .then((response) => {
        return response.json()
      })

      .then((data) => {
        setBids(data)
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching bids: ", error);
      })

  }, [id])


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3>{auction.Title}</h3>
        <div className={styles.detailP}>
          <p className={styles.label}>Description:</p>
          <p>{auction.Description}</p>
        </div>
        <div className={styles.detailP}>
          <p className={styles.label}>Start Date:</p>
          <p>{formatDate(auction.StartDate)}</p>
        </div>
        <div className={styles.detailP}>
          <p className={styles.label}>End Date:</p>
          <p>{formatDate(auction.EndDate)}</p>
        </div>
        <div className={styles.detailP}>
          <p className={styles.label}>Starting Price:</p>
          <p>{auction.StartingPrice}</p>
        </div>
        <h3>Bids</h3>
        <ul>
          {bids.map((bid, index) => (
            <li key={index}>
              Bidder: {bid.Bidder},<br />
              Amount: {bid.Amount} kr
              <br /><br />

            </li>
          ))}

        </ul>
      </div>
    </div>
  );
}

export default Details;
