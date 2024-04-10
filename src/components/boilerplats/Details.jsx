import React from "react";
import { useLocation } from "react-router-dom";

function Details() {
  const location = useLocation();
  const { auction } = location.state;
  console.log(auction);

  return (
    <div style={{ marginTop: "40vh" }}>
      <h3>{auction.Title}</h3>
      <small>Robin hej hej</small>
    </div>
  );
}

export default Details;
