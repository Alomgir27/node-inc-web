import React, { useEffect, useState } from "react";

import Modal from "./Modal";
import FancyInput from "../components/FancyInput";
import nodeAxios from "../utils/nodeAxios";

const ModalEmployee = (props) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await nodeAxios("GET", "core/employees");
      const selectData = response.map((employee) => ({
        value: employee.entity_id.id,
        text: `${employee.human_identity_id.first_name} ${employee.human_identity_id.last_name}`,
        selected: false,
      }));

      setEmployees([
        {
          text: "Select in the menu",
          disabled: true,
          selected: true,
        },
        ...selectData,
      ]);
    })();
  }, []);
  const handleEmployeeUpdate = async () => {
    const invoice_id = localStorage.getItem("invoiceId");
    await nodeAxios("PATCH", `invoice/${invoice_id}`, {
      metadata: {
        assign: selectedEmployee,
      },
    });
    props.loadInvoice();
  };
  return (
    <div>
      <Modal
        buttonText="Done"
        className="node-modal"
        bodyClassName="node-modal-body-container"
        {...props}
        title="Update Employee"
        handleEmployeeUpdate={handleEmployeeUpdate}
      >
        <div className="node-modal-body">
          <h3 className="mb-3 section-title">Change assigned</h3>
          <FancyInput
            select
            options={employees}
            id="client"
            name="client"
            placeholder="Select in the menu"
            rootClassName="appointment-select"
            onChange={(e) => setSelectedEmployee(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ModalEmployee;
