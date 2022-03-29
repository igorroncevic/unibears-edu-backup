import React from "react";

function Video({ source }) {
  return (
    <div className="embed-container">
      <iframe
        src={source}
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Video;
