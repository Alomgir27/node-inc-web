import axios from "axios";
import React, { useEffect, useState } from "react";

import Modal from "./Modal";

const ModalAdditionalData = (props) => {
  const [additionalData, setAdditionalData] = useState({});
  const [activeTab, setActiveTab] = useState("diagrams");
  useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization:
              "Basic ZDA0YWRlYWMtMjU3OS00MTY1LTg4ZTYtMzM1NTYzMjFmZTUw",
            "partner-token": "9fd5e41209dc44d1b27f6c4287da6bd5",
          },
          url: `http://api.carmd.com/v3.0/decode?vin=1GNALDEK9FZ108495`,
        });
        setAdditionalData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handelActiveTab = (e) => {
    setActiveTab(e.target.id);
  };
  return (
    <div>
      <Modal
        titleVector="./assets/vectors/vehecial-icon.svg"
        title="Car's details"
        {...props}
        headClassName="additionalmodal-head"
      >
        <div className="form-modal-body pb-5">
          <div className="d-flex justify-content-evenly mb-4 position-absolute additional-header">
            <img
              className="rounded mr-3"
              src="./assets/vectors/téléchargement.jpeg"
              alt=""
              width="30%"
            />
            <div className="d-flex flex-column justify-content-center">
              <div className="fs-14 fw-bold">JFTK9887263312</div>
              <div className="fs-14 fw-500 lh-1 mt-2">
                2020 Toyota Prius Prime
              </div>
              <div className="fs-14 fw-300">LE HATCHBACK 4-DR</div>
            </div>
          </div>
          <div className="w-100">
            <div className="tabs">
              {activeTab == "diagrams" ? (
                <>
                  <div className="px-4 mt-5 d-flex justify-content-between w-100">
                    <div className="text-left">
                      <h2>Doors</h2>
                      <p className="text-muted">4</p>
                    </div>
                    <div className="text-left">
                      <h2>OEM Doors</h2>
                      <p className="text-muted">5</p>
                    </div>
                    <div className="text-left">
                      <h2>Brake System</h2>
                      <p className="text-muted">Hydraulic</p>
                    </div>
                  </div>
                  <div className="px-4 mt-5 d-flex justify-content-between w-100">
                    <div className="text-left">
                      <h2>Engine</h2>
                      <p className="text-muted">
                        {additionalData?.transmission}
                      </p>
                    </div>
                    <div className="text-left">
                      <h2>Cylinders</h2>
                      <p className="text-muted">4</p>
                    </div>
                    <div className="text-left">
                      <h2>Tires Name</h2>
                      <p className="text-muted">5</p>
                    </div>
                  </div>
                  <div className="px-4 mt-5 d-flex justify-content-between w-100">
                    <div className="text-left">
                      <h2>Brake System</h2>
                      <p className="text-muted">Hydraulic</p>
                    </div>
                    <div className="text-left">
                      <h2>Front Brake Diameter</h2>
                      <p className="text-muted">10.0</p>
                    </div>
                    <div className="text-left">
                      <h2>Rear Brake Diameter</h2>
                      <p className="text-muted">10.2</p>
                    </div>
                  </div>
                  <div className="px-4 mt-5 d-flex justify-content-between w-100">
                    <div className="text-left">
                      <h2>Fuel Quality</h2>
                      <p className="text-muted">87</p>
                    </div>
                    <div className="text-left">
                      <h2>Fuel type</h2>
                      <p className="text-muted">Gasoline</p>
                    </div>
                    <div className="text-left">
                      <h2>Oil Capacity</h2>
                      <p className="text-muted">4.2</p>
                    </div>
                  </div>
                  <div className="px-4 mt-5 d-flex justify-content-between w-100">
                    <div className="text-left">
                      <h2>Axle Ratio</h2>
                      <p className="text-muted">4.11</p>
                    </div>
                    <div className="text-left">
                      <h2>Transmission</h2>
                      <p className="text-muted">CVT</p>
                    </div>
                    <div className="text-left">
                      <h2>Body</h2>
                      <p className="text-muted">Hatchback</p>
                    </div>
                  </div>
                </>
              ) : activeTab == "warranty" ? (
                <>
                  <div className="px-4 mt-5 d-flex justify-content-between w-100">
                    <div className="text-left">
                      <h2>Accessory</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>New Car Basic Warranty</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Drivetrain/Powertrain</h2>
                      <p className="text-muted">5</p>
                    </div>
                  </div>
                  <div className="px-4 mt-5 d-flex justify-content-between w-100">
                    <div className="text-left">
                      <h2>Safety Restraint System</h2>
                      <p className="text-muted">
                        {additionalData?.transmission}
                      </p>
                    </div>
                    <div className="text-left">
                      <h2>Corrosion Perforation</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Hybrid Specific Components</h2>
                      <p className="text-muted">5</p>
                    </div>
                  </div>
                  <div className="px-4 mt-5 d-flex justify-content-between w-100">
                    <div className="text-left">
                      <h2>Transmission</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Tires</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Doors</h2>
                      <p className="text-muted">5</p>
                    </div>
                  </div>
                  <div className="px-4 mt-5 d-flex justify-content-between w-100">
                    <div className="text-left">
                      <h2>Transmission</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Tires</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Doors</h2>
                      <p className="text-muted">5</p>
                    </div>
                  </div>
                  <div className="px-4 mt-5 d-flex justify-content-between w-100">
                    <div className="text-left">
                      <h2>Transmission</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Tires</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Doors</h2>
                      <p className="text-muted">5</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="px-4 mt-5 d-flex justify-content-between w-100">
                    <div className="text-left">
                      <h2>Transmission</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Tires</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Doors</h2>
                      <p className="text-muted">5</p>
                    </div>
                  </div>
                  <div className="px-4 mt-5 d-flex justify-content-between w-100">
                    <div className="text-left">
                      <h2>Transmission</h2>
                      <p className="text-muted">
                        {additionalData?.transmission}
                      </p>
                    </div>
                    <div className="text-left">
                      <h2>Tires</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Doors</h2>
                      <p className="text-muted">5</p>
                    </div>
                  </div>
                  <div className="px-4 mt-5 d-flex justify-content-between w-100">
                    <div className="text-left">
                      <h2>Transmission</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Tires</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Doors</h2>
                      <p className="text-muted">5</p>
                    </div>
                  </div>
                  <div className="px-4 mt-5 d-flex justify-content-between w-100">
                    <div className="text-left">
                      <h2>Transmission</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Tires</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Doors</h2>
                      <p className="text-muted">5</p>
                    </div>
                  </div>
                  <div className="px-4 mt-5 d-flex justify-content-between w-100">
                    <div className="text-left">
                      <h2>Transmission</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Tires</h2>
                      <p className="text-muted">Data</p>
                    </div>
                    <div className="text-left">
                      <h2>Doors</h2>
                      <p className="text-muted">5</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="mt-5 px-4 d-flex justify-content-around">
              <button
                id="diagrams"
                className={`additional-btns ${
                  activeTab == "diagrams" ? "emboss" : "emboss-white"
                }  `}
                onClick={handelActiveTab}
              >
                Basic Data
              </button>
              <button
                id="warranty"
                className={`additional-btns ${
                  activeTab == "warranty" ? "emboss" : "emboss-white"
                }  `}
                onClick={handelActiveTab}
              >
                Engine/Tranmission
              </button>
              <button
                id="history"
                className={`additional-btns ${
                  activeTab == "history" ? "emboss" : "emboss-white"
                }  `}
                onClick={handelActiveTab}
              >
                Warranties
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalAdditionalData;
