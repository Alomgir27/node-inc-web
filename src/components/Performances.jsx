import React from "react";

const Performances = ({ withHead }) => {
  return (
    <>
      {withHead && (
        <div className="d-flex justify-content-start align-items-center mb-4 pt-5">
          <img
            src="./assets/vectors/arrow-up.svg"
            className="me-3"
            alt="arrow-up"
          />
          <h3 className="section-title">Performances</h3>
        </div>
      )}
      <div className="performances">
        <div className="performance-item">
          <h3 className="section-title">47%</h3>
          <h4 className="sub-title">Today's work</h4>
          <div className="progress-bar">
            <div className="bg"></div>
            <div className="progress" style={{ width: "47%" }}></div>
          </div>
        </div>
        <div className="performance-item">
          <h3 className="section-title">76%</h3>
          <h4 className="sub-title">Clients Connected</h4>
          <div className="progress-bar">
            <div className="bg"></div>
            <div className="progress" style={{ width: "76%" }}></div>
          </div>
        </div>
        <div className="performance-item">
          <h3 className="section-title">97%</h3>
          <h4 className="sub-title">Satisfaction</h4>
          <div className="progress-bar">
            <div className="bg"></div>
            <div className="progress" style={{ width: "97%" }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Performances;
