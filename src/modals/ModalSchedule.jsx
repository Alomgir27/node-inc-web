import React from "react";

import Modal from "./Modal";
import FancyInput from "../components/FancyInput";

const ModalSchedule = (props) => {
  return (
    <div>
      <Modal
        title="Schedule"
        forText="Zumba Class"
        buttonText="Define"
        {...props}
      >
        <div className="schedule-modal-body">
          <div className="row item w-100 mb-3">
            <div className="col-12 d-flex align-items-center w-100 justify-content-between px-4">
              <p>Monday</p>
              <div className="d-flex align-items-center w-75 justify-content-around">
                <FancyInput
                  sMargin
                  id="date"
                  type="time"
                  name="date"
                  placeholder="start time"
                  inputClassName="dateInput"
                  step="900"
                />
                <p>to</p>
                <FancyInput
                  sMargin
                  id="date"
                  type="time"
                  name="date"
                  placeholder="start time"
                  inputClassName="dateInput"
                />
              </div>
            </div>
          </div>
          <div className="row item w-100 mb-3">
            <div className="col-12 d-flex align-items-center w-100 justify-content-between px-4">
              <p>Tuesday</p>
              <div className="d-flex align-items-center w-75 justify-content-around">
                <FancyInput
                  sMargin
                  id="date"
                  type="time"
                  name="date"
                  placeholder="start time"
                  inputClassName="dateInput"
                />
                <p>to</p>
                <FancyInput
                  sMargin
                  id="date"
                  type="time"
                  name="date"
                  placeholder="start time"
                  inputClassName="dateInput"
                />
              </div>
            </div>
          </div>
          <div className="row item w-100 mb-3">
            <div className="col-12 d-flex align-items-center w-100 justify-content-between px-4">
              <p>Wednesday</p>
              <div className="d-flex align-items-center w-75 justify-content-around">
                <FancyInput
                  sMargin
                  id="date"
                  type="time"
                  name="date"
                  placeholder="start time"
                  inputClassName="dateInput"
                />
                <p>to</p>
                <FancyInput
                  sMargin
                  id="date"
                  type="time"
                  name="date"
                  placeholder="start time"
                  inputClassName="dateInput"
                />
              </div>
            </div>
          </div>

          <div className="row item w-100 mb-3">
            <div className="col-12 d-flex align-items-center w-100 justify-content-between px-4">
              <p>Thursday</p>
              <div className="d-flex align-items-center w-75 justify-content-around">
                <FancyInput
                  sMargin
                  id="date"
                  type="time"
                  name="date"
                  placeholder="start time"
                  inputClassName="dateInput"
                />
                <p>to</p>
                <FancyInput
                  sMargin
                  id="date"
                  type="time"
                  name="date"
                  placeholder="start time"
                  inputClassName="dateInput"
                />
              </div>
            </div>
          </div>
          <div className="row item w-100 mb-3">
            <div className="col-12 d-flex align-items-center w-100 justify-content-between px-4">
              <p>Friday</p>
              <div className="d-flex align-items-center w-75 justify-content-around">
                <FancyInput
                  sMargin
                  id="date"
                  type="time"
                  name="date"
                  placeholder="start time"
                  inputClassName="dateInput"
                />
                <p>to</p>
                <FancyInput
                  sMargin
                  id="date"
                  type="time"
                  name="date"
                  placeholder="start time"
                  inputClassName="dateInput"
                />
              </div>
            </div>
          </div>
          <div className="row item w-100 mb-3">
            <div className="col-12 d-flex align-items-center w-100 justify-content-between px-4">
              <p>Saturday</p>
              <div className="d-flex align-items-center w-75 justify-content-around">
                <FancyInput
                  sMargin
                  id="date"
                  type="time"
                  name="date"
                  placeholder="start time"
                  inputClassName="dateInput"
                />
                <p>to</p>
                <FancyInput
                  sMargin
                  id="date"
                  type="time"
                  name="date"
                  placeholder="start time"
                  inputClassName="dateInput"
                />
              </div>
            </div>
          </div>
          <div className="row item w-100 mb-3">
            <div className="col-12 d-flex align-items-center w-100 justify-content-between px-4">
              <p>Sunday</p>
              <div className="d-flex align-items-center w-75 justify-content-around">
                <FancyInput
                  sMargin
                  id="date"
                  type="time"
                  name="date"
                  placeholder="start time"
                  inputClassName="dateInput"
                />
                <p>to</p>
                <FancyInput
                  sMargin
                  id="date"
                  type="time"
                  name="date"
                  placeholder="start time"
                  inputClassName="dateInput"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalSchedule;
