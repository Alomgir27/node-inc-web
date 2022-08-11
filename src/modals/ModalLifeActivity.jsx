import React from "react";

import Modal from "./Modal";

const ModalLifeActivity = (props) => {
  return (
    <div>
      <Modal className="schedule-modal" bottomAligned {...props}>
        <div className="schedule-modal-body">
          <h3 className="section-title mb-4">Life Activity</h3>

          <div className="head">
            <div className="d-flex align-items-center">
              <div className="img">
                <img
                  src="./assets/vectors/toyota-prius-prime.svg"
                  alt="toyota-prius"
                />
              </div>
              <div className="text ms-3">
                <div className="fw-600 lh-1">2020 Toyota Prius Prime</div>
                <h5 className="sub-title">JFTK9887263312</h5>
                <h5 className="sub-title fs-7">
                  Noded &amp; Validated
                  <img src="./assets/vectors/validated.svg" alt="validated" />
                </h5>
              </div>
            </div>
          </div>

          <div className="py-1 mt-5 emboss-c">
            <div className="items px-2 br-8 mt-4">
              {[
                {
                  text1: "Service Sheet",
                  text2: "Rear Brake Tab - WO #90847867342-23",
                  text3: "23/05/2022",
                },
                {
                  text1: "Service Sheet",
                  text2: "Oil Change - #90847867342-23",
                  text3: "23/05/2022",
                },
                {
                  text1: "Service Sheet",
                  text2: "Rear Brake Tab - WO #90847867342-23",
                  text3: "23/05/2022",
                },
                {
                  text1: "Rear Brake Tab - WO #90847867342-23",
                  text2: "Garage Lelaval",
                  text3: "23/05/2022",
                },
              ].map((el, idx) => {
                return <ActvityItem {...el} key={"activity-item" + idx} />;
              })}
            </div>
            <div className="items hidden">
              <div className="blurred-overlay text-center">
                <img src="./assets/vectors/lock-1.svg" alt="lock" />
                <div className="fs-26 fw-600">
                  Upgrade to see <br />5 years history
                </div>
              </div>
              {[
                {
                  text1: "Service Sheet",
                  text2: "Rear Brake Tab - #90847867342-23",
                  text3: "23/05/2022",
                },
                {
                  text1: "Service Sheet",
                  text2: "Oil Change - #90847867342-23",
                  text3: "23/05/2022",
                },
                {
                  text1: "Service Sheet",
                  text2: "Rear Brake Tab - #90847867342-23",
                  text3: "23/05/2022",
                },
                {
                  text1: "Service Sheet",
                  text2: "Rear Brake Tab - #90847867342-23",
                  text3: "23/05/2022",
                },
                {
                  text1: "Service Sheet",
                  text2: "Garage Lelaval - #90847867342-23",
                  text3: "23/05/2022",
                },
              ].map((el, idx) => {
                return <ActvityItem {...el} key={"activity-item" + idx} />;
              })}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const ActvityItem = ({ text1, text2, text3 }) => {
  return (
    <div className="activity-item mb-5">
      <div className="text-1">
        <div className="box"></div> {text1}
      </div>
      <div className="text-2">{text2}</div>
      <div className="text-3">{text3}</div>
    </div>
  );
};

export default ModalLifeActivity;
