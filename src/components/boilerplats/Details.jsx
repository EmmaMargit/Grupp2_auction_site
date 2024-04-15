import React from "react";
import styles from "../../stylesheet/Details.module.css";
import { useLocation } from "react-router-dom";

function Details() {
  const location = useLocation();
  const { auction } = location.state;

  const formatDate = (dateString) => {
    const postDate = new Date(dateString);
    const formattedDate = `${postDate.getFullYear()}-${
      postDate.getMonth() + 1
    }-${postDate.getDate()} ${postDate.toLocaleTimeString()}`;
    return formattedDate;
  };

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
      </div>
    </div>
  );
}

export default Details;
