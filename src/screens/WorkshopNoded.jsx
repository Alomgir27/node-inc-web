import React from "react";

import WorkshopFormLayout from "../layouts/WorkshopFormLayout";

const WorkshopNoded = () => {
  return (
    <WorkshopFormLayout>
      <div className="noded-container">
        <div className="container-fluid px-0">
          <div className="row">
            <div className="col-sm-6 noded-items-container">
              <h3 className="section-title">Noded</h3>

              <div className="noded-items">
                <div className="noded-item">
                  <div className="img">
                    <img
                      src="./assets/vectors/toyota-prius-prime.svg"
                      alt="noded-item"
                    />
                  </div>
                  <div className="text">
                    <div className="text-dark-3 fw-600">
                      2020 Toyota Prius Prime
                    </div>
                    <h5 className="sub-title">JFTK9887263312</h5>
                    <div className="text-dark-3 fw-400 fs-7 text-manrope d-flex align-items-center">
                      Noded &amp; Validated
                      <img
                        className="ms-2"
                        src="./assets/vectors/validated.svg"
                        alt="validated"
                      />
                    </div>
                  </div>
                </div>
                <div className="noded-item">
                  <div className="img">
                    <img
                      src="./assets/vectors/toyo-goodrich-2021.svg"
                      alt="noded-item"
                    />
                  </div>
                  <div className="text">
                    <div className="text-dark-3 fw-600">Toyo GoodRich 2021</div>
                    <h5 className="sub-title">Need to be Validate</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 feed-items-container">
              <h3 className="section-title">Live Feed</h3>
              <div className="noded-item">
                <div className="img">
                  <img src="./assets/vectors/feed-2.svg" alt="feed-item" />
                </div>
                <div className="text">
                  <div className="text-dark-3 fw-600">Repair Scratch</div>
                  <h5 className="sub-title fs-10">7 min ago</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-5 pt-5">
            <h3 className="section-title">Client</h3>
            <button className="btn btn-dark btn-update">
              <img
                className="update"
                src="./assets/vectors/edit.svg"
                alt="edit"
              />
              Edit
            </button>
          </div>

          <div className="profile-info d-flex mt-4">
            <div className="left">
              <div className="img">
                <img src="./assets/img/clint-vector-lg.png" alt="client-img" />
              </div>
            </div>
            <div className="right">
              <div className="d-flex justify-content-start align-items-start flex-md-row flex-column justify-content-md-between">
                <div>
                  <div className="user-name d-flex align-items-center">
                    <h4 className="evidence-word">Bryandy Boyd</h4>
                    <img
                      src="./assets/vectors/verified-black.svg"
                      className="ms-4"
                      alt="verified"
                    />
                  </div>
                  <div className="location">
                    <div className="text-manrope fw-400">
                      3452 av. de la Tour, Québec (QC) G1V 9J3 Canada
                    </div>
                  </div>
                </div>
                <button className="btn btn-blue-high ms-md-4 ms-0 mt-md-0 mt-3">
                  Life Activity
                </button>
              </div>

              <div className="container-fluid px-0 mt-3">
                <div className="row gx-0 gy-4">
                  <div className="col-md-6">
                    <div className="text-bold">ernest.mason@gmail.com</div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-bold">561-303-6106</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-5">
            <h3 className="section-title text-dark-4">Appointment</h3>
            <button className="btn btn-dark btn-update">
              <img
                className="update"
                src="./assets/vectors/edit.svg"
                alt="edit"
              />
              Edit
            </button>
          </div>
          <div className="oppointment">
            <div className="item">
              <div className="item-main">
                <div className="left">
                  <div className="date">September 8, 2022</div>
                  <div className="time">14:00</div>
                </div>
                <div className="right">
                  <div className="badge">Emplyee 1</div>
                </div>
              </div>

              <div className="progress-bar">
                <div className="bg"></div>
                <div className="progress" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>

          <h3 className="section-title mt-5 text-dark-4">Requests</h3>

          <div className="requests-list-container short-vertical-scrollbar">
            <div className="requests-list mt-2">
              {[
                {
                  titleText: "Order Rear Light",
                  boxClr: "#5165F7",
                  category: 3,
                  date: "21 Sep 2021",
                },
              ].map((el, idx) => {
                const { titleText, date, category } = el;

                return (
                  <div className="requests-list-item" key={"req-list" + idx}>
                    <div className="mini-info">
                      <div className="sub-title">{titleText}</div>
                    </div>
                    <div className="more-info">
                      <div className="todo d-flex align-items-center">
                        <div
                          className="round-box me-2"
                          style={{ backgroundColor: "#C26666" }}
                        ></div>
                        <div className="caption">To do</div>
                      </div>
                      <div className="prod-name">
                        <h5 className="sub-title">Category {category}</h5>
                      </div>
                      <div className="date">
                        <h5 className="sub-title">{date}</h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="d-flex justify-content-end mt-5">
            <button className="btn btn-blue btn-rounded">
              Convert to Invoice
              <img
                className="ms-3"
                src="./assets/vectors/r-arrow-btn.svg"
                alt="right-arrow"
              />
            </button>
          </div>
        </div>
      </div>
    </WorkshopFormLayout>
  );
};

export default WorkshopNoded;
