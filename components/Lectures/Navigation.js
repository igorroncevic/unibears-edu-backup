import React from "react";

function Navigation() {
  return (
    <div className="container d-flex justify-content-between">
      <button
        onClick={() => {}}
        className="btn btn-light d-flex flex-row"
        type="button"
      >
        <div style={{ transform: "rotate(180deg)", paddingLeft: "5px" }}>
          <i className="flaticon-right-chevron"></i>
        </div>
        <div>Previous</div>
      </button>
      <button
        onClick={() => {}}
        className="btn btn-light d-flex flex-row"
        type="button"
      >
        <div>Next</div>
        <div style={{ paddingLeft: "5px" }}>
          <i className="flaticon-right-chevron"></i>
        </div>
      </button>
    </div>
  );
}

export default Navigation;
