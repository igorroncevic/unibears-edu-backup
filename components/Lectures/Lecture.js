import React from "react";
import PortableText from "../Common/CustomPortableText";
import Navigation from "./Navigation";
import Video from "./Video";

function Lecture({ lecture }) {
  const { name, overview, source } = lecture;

  return (
    <div className="container">
      <h2 className="font-weight-light py-3"> {title} </h2>
      <Video source={source} />
      <p className="py-3">
        <PortableText content={overview} />
      </p>
      <h3> Additional docs </h3>
      <div> File </div>
      <hr />
      <Navigation />
    </div>
  );
}

export default Lecture;
