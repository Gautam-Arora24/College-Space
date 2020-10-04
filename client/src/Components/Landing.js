import React from "react";
import Typography from "@material-ui/core/Typography";
import ReceiptIcon from "@material-ui/icons/Receipt";
import laptop from "../Images/laptop.jpg";
const Landing = () => {
  return (
    <div className="hero">
      <div className="hero-image">
        <img src={laptop} />{" "}
      </div>
      <div className="hero-text">
        <h2>College Space</h2>
        <Typography variant="h5" color="textSecondary" component="p">
          <ReceiptIcon /> A one stop destination for students and teachers. Here
          teachers can share notes with students and can make announcements.
        </Typography>
      </div>
    </div>
  );
};
export default Landing;
