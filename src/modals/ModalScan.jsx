import React from "react";

import Modal from "./Modal";

const ModalScan = (props) => {
  return (
    <div>
      <Modal
        titleVector="./assets/vectors/modal-scan.svg"
        title="Scan to Move"
        {...props}
      >
        <div className="scan-modal-body mb-5">
          <div className="container-fluid px-0">
            <div className="row">
              <div className="col-sm-6">
                <div className="left">
                  <img src="./assets/img/scan.png" alt="scan" />
                  <div className="text my-3 text-center">
                    <h4 className="sub-title text-blue">
                      Scan anything to Find it into the system
                    </h4>
                    <h5 className="sub-title text-light-5">
                      Client Code, Item, Storage
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="right">
                  <div className="item">
                    <h5 className="sus-evidence-word">Christian Lacroix</h5>
                    <div className="text-x-small">Closest to you</div>
                  </div>
                  <div className="item">
                    <h5 className="sus-evidence-word">Jade Dubois</h5>
                    <div className="text-x-small">2nd closer to you</div>
                  </div>
                  <div className="item">
                    <h5 className="sus-evidence-word">Monique Labonté</h5>
                    <div className="text-x-small">3rd closer to you</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalScan;
