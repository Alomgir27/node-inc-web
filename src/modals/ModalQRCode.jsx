import React from "react";

import Modal from "./Modal";
import QRCode from "qrcode.react";


const ModalQRCode = (props) => {
  return (
    <div>
      <Modal {...props}>
        <div
          className="scan-modal-body mb-5"
          style={{ backgroundColor: "transparent" }}
        >
          <div className="container-fluid px-0 d-flex justify-content-center">
            <div className="row text-center mt-5 d-flex flex-column justify-content-center align-items-center">
              <h1 className="gradient-text">Numeric Identity</h1>
              <p className="text-muted fs-18 mt-3">Toyo Tires-2019</p>
              <p className="text-muted fs-18">Noded form 2019-02</p>

              <div className="w-75 py-4 emboss-white mt-4 rounded-3">
                <QRCode id="1" value="UUID" fgColor="#aab3c3" />
                <p className="text-muted fs-18 mt-2">09234-11234-324</p>
              </div>

              <div className="w-100 d-flex justify-content-between mt-5">
                <button className="btn btn-add btn-gradient" gradient>
                  Transfer
                </button>
                <button className="btn btn-add btn-gradient" gradient>
                  Print
                  
                </button>
                
              </div>
            </div>
          </div>
        </div>
      
      </Modal>
    </div>
  );
};

export default ModalQRCode;
