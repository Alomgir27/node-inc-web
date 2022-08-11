import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useSelect } from "downshift";
import "react-datepicker/dist/react-datepicker.css";
import CoursesLayout from "../layouts/CoursesLayout";
import AddBtn from "../components/AddBtn";
import SchedularActivities from "../components/SchedularActivities";
import ModalAppointment from "../modals/ModalAppointment";
import Select from "../components/select/select";
import Option from "../components/select/option";
import FancyInput from "../components/FancyInput";
const CoursesSchedule = () => {
  const [isModalOpenState, setIsModalOpenState] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedDay, setselectedDay] = useState();
  function handleSelectedLocation(e) {
    setSelectedLocation(e.selectedItem);
  }
  function handleSelectedDay(e) {
    setselectedDay(e.selectedItem);
  }
  return (
    <>
      <ModalAppointment
        isOpen={isModalOpenState}
        modalCloseHandler={() => setIsModalOpenState(false)}
      />
      <CoursesLayout title="Schedule">
        <div className="appointment-container">
          <div className="d-flex justify-content-end align-items-center my-4 top-container">
            <div className="d-flex w-75 ps-5 justify-content-evenly">
              <div className=" d-flex align-items-center w-50 justify-content-around">
                <div className="date-picker-root me-4 ">
                  <FancyInput
                    id="date"
                    type="date"
                    name="date"
                    placeholder="start time"
                    inputClassName="dateInput"
                    // onChange={onChangeDate}
                    // value={date}
                  />
                </div>
                <div>
                  <DropdownSelect
                    options={["location1", "location2"]}
                    placeholder="All Employee"
                    SelectedOption={selectedLocation}
                    handleSelectedItemChange={(e) => handleSelectedLocation(e)}
                  />
                </div>

                <div>
                  <DropdownSelect
                    options={["day1", "day2"]}
                    placeholder="Polyvalente"
                    SelectedOption={selectedDay}
                    handleSelectedItemChange={(e) => handleSelectedDay(e)}
                  />
                </div>
              </div>
              <div className="d-flex w-50 align-items-center">
                <AddBtn
                  onClick={() => setIsModalOpenState(true)}
                  pale
                  smallHeight
                  title="SERVICE"
                  className="w-50 justify-content-center"
                />
                <AddBtn
                  onClick={() => setIsModalOpenState(true)}
                  bg
                  pale
                  title="BLOCK"
                  className="w-50 justify-content-center"
                />
                <AddBtn
                  noIcon
                  onClick={() => setIsModalOpenState(true)}
                  bg
                  pale
                  title="PRINT LISTS"
                  className="w-50 justify-content-center"
                />
              </div>
            </div>
          </div>

          <div className="schedule-control-section-wrap">
            <SchedularActivities />
          </div>
        </div>
      </CoursesLayout>
    </>
  );
};

function DropdownSelect({
  options,
  placeholder,
  SelectedOption,
  handleSelectedItemChange,
}) {
  const items = options;
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    selectedItem,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    SelectedOption,
    onSelectedItemChange: handleSelectedItemChange,
  });
  return (
    <>
      <button
        type="button"
        className="landmark-select position-relative d-flex align-items-center"
        {...getToggleButtonProps()}
      >
        {selectedItem ? selectedItem : placeholder} &nbsp;
        <img src="./assets/vectors/arrow-down-dark.svg" alt="bin" />
      </button>
      <ul
        className="position-absolute landmark-select-options"
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className="landmark-select-option"
              style={
                highlightedIndex === index ? { backgroundColor: "#e7ebee" } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </>
  );
}

export default CoursesSchedule;
