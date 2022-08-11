import React from "react";

import Modal from "./Modal";
import FancyInput from "../components/FancyInput";

const ModalNode = (props) => {
  return (
    <div>
      <Modal
        buttonText="Node"
        className="node-modal"
        bodyClassName="node-modal-body-container"
        {...props}
      >
        <div className="node-modal-body">
          <h3 className="mb-3 section-title">Node Something</h3>
          <FancyInput
            select
            options={[
              {
                text: "Select in the menu",
                disabled: true,
                selected: true,
              },
            ]}
            id="client"
            name="client"
            placeholder="Select in the menu"
            rootClassName="appointment-select"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModalNode;
