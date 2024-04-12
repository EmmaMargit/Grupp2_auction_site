import React from "react";
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
    <div style={{ marginTop: "40vh" }}>
      <h3>{auction.Title}</h3>
      <p>Description: {auction.Description}</p>
      <p>Start Date: {formatDate(auction.StartDate)}</p>
      <p>End Date: {formatDate(auction.EndDate)}</p>
      <p>Starting Price: {auction.StartingPrice}</p>
    </div>
  );
}

export default Details;
