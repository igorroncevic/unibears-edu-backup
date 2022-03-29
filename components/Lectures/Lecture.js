import React from "react";
import Navigation from "./Navigation";
import Video from "./Video";

function Lecture({ lecture }) {
  const { name, description, source } = lecture;

  return (
    <div className="container">
      <h2 className="font-weight-light py-3"> {name} </h2>
      <Video source={source} />
      <p className="py-3"> {description} </p>
      <h3> Additional docs </h3>
      <div> File </div>
      <hr />
      <Navigation />
    </div>
  );
}

export default Lecture;
