import React, { useState } from "react";
import AddBtn from "../components/AddBtn";
import { useSelect } from "downshift";
import SearchInput from "../components/SearchInput";
import Select from "../components/select/select";
import Option from "../components/select/option";
import CoursesLayout from "../layouts/CoursesLayout";

const CoursesRegistration = () => {
  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedDay, setselectedDay] = useState();
  const [selectedProfile, setSelectedProfile] = useState();
  const [activeProfiles, setActiveProfiles] = useState([
    { img: "./assets/img/client-vector-5.png" },
  ]);
  function handleSelectedLocation(e) {
    setSelectedLocation(e.selectedItem);
  }
  function handleSelectedDay(e) {
    setselectedDay(e.selectedItem);
  }

  const handelDrag = (user) => {
    setSelectedProfile(user);
  };

  const handelDragOverYoga = (e) => {
    e.preventDefault();
  };
  const handelDropYoga = (e) => {
    e.preventDefault();
    setActiveProfiles((prevState) => [...activeProfiles, selectedProfile]);
  };

  const profiles = [
    {
      img: "./assets/img/client-vector-1.png",
    },
    {
      img: "./assets/img/client-vector-2.png",
    },
    {
      img: "./assets/img/client-vector-3.png",
    },
  ];
  return (
    <CoursesLayout title="Services Registration">
      <div className="registration-container">
        <div className="container-fluid px-0">
          <div className="row gy-5">
            <div className="col-lg-8 d-flex flex-column justify-content-between">
              <div className="noded ">
                <div className="row gy-4">
                  <div className="col-lg-4">
                    <div className="card emboss-white br-16">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <h3 className="section-title">Bryandy Boyd</h3>
                          <img
                            className="ms-2"
                            src="./assets/vectors/verified-black.svg"
                            alt="verified"
                          />
                        </div>

                        <img src="./assets/vectors/bin-3.svg" alt="bin" />
                      </div>

                      <div className="mt-3 w-75 d-flex flex-wrap justify-content-between">
                        {profiles.map((user) => {
                          return (
                            <div
                              className="img bg-secondary rounded-circle drag"
                              onDragStart={() => handelDrag(user)}
                            >
                              <img src={user.img} alt="client" />
                            </div>
                          );
                        })}
                      </div>

                      <div className="my-3 d-flex justify-content-between mt-4 mb-4">
                        <DropdownSelect
                          options={["location1", "location2"]}
                          placeholder="locations"
                          SelectedOption={selectedLocation}
                          handleSelectedItemChange={(e) =>
                            handleSelectedLocation(e)
                          }
                        />

                        <DropdownSelect
                          options={["day1", "day2"]}
                          placeholder="Days"
                          SelectedOption={selectedDay}
                          handleSelectedItemChange={(e) => handleSelectedDay(e)}
                        />
                      </div>

                      <div className="mt-2">
                        <SearchInput
                          rootClassName="w-50"
                          placeholder="Specific search..."
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card emboss-white br-16">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <h3 className="section-title">Bryandy Boyd</h3>
                          <img
                            className="ms-2"
                            src="./assets/vectors/verified-black.svg"
                            alt="verified"
                          />
                        </div>

                        <img src="./assets/vectors/bin-3.svg" alt="bin" />
                      </div>

                      <div className="mt-3 w-75 d-flex flex-wrap justify-content-between">
                        <div className="img bg-secondary rounded-circle">
                          <img
                            src="./assets/img/client-vector-1.png"
                            alt="client"
                          />
                        </div>
                        <div className="img bg-secondary rounded-circle px-3 d-flex justify-content-center align-items-center">
                          <img
                            className="sm"
                            src="./assets/vectors/car-1.svg"
                            alt="car"
                            width="35px"
                          />
                        </div>
                        <div className="img bg-secondary rounded-circle">
                          <img
                            src="./assets/img/client-vector-1.png"
                            alt="client"
                          />
                        </div>
                      </div>

                      <div className="my-3 d-flex justify-content-between mt-4 mb-4">
                        <DropdownSelect
                          options={["location1", "location2"]}
                          placeholder="locations"
                          SelectedOption={selectedLocation}
                          handleSelectedItemChange={(e) =>
                            handleSelectedLocation(e)
                          }
                        />

                        <DropdownSelect
                          options={["day1", "day2"]}
                          placeholder="Days"
                          SelectedOption={selectedDay}
                          handleSelectedItemChange={(e) => handleSelectedDay(e)}
                        />
                      </div>

                      <div className="mt-2">
                        <SearchInput
                          rootClassName="w-100"
                          placeholder="Specific search..."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <AddBtn pale />
                  </div>
                </div>
              </div>

              <div className="registrations mt-5 pt-5">
                <div className="row">
                  <div className="col-xxl-3 col-lg-4 col-md-6">
                    <div
                      className="card text-center emboss-white d-flex flex-column justify-content-center align-items-center"
                      // onDragOverCapture={handelDragOverYoga}
                      onDrop={handelDropYoga}
                      onDragOver={handelDragOverYoga}
                    >
                      <img src="./assets/vectors/reg-1.svg" alt="img" />

                      <div className="mt-2 badge bg-secondary rounded-pill w-50 mb-2 text-light">
                        Indoors
                      </div>

                      <div className="fw-600 fs-16 mb-1 ">Yoga Class</div>

                      <div className="text-light-8 mb-1 text-muted">
                        Cégep - Patricia
                      </div>
                      <div className="text-light-8 text-muted">
                        09/08 - Monday 19:00
                      </div>

                      <h5 className="sub-title mt-4">112,90$</h5>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-md-6">
                    <div className="card text-center emboss-white d-flex flex-column justify-content-center align-items-center">
                      <img src="./assets/vectors/reg-2.svg" alt="img" />

                      <div className="mt-2 badge bg-secondary rounded-pill w-50 mb-2 text-light">
                        Indoors
                      </div>

                      <div className="fw-600 fs-16 mb-1 ">Dance Class</div>

                      <div className="text-light-8 mb-1 text-muted">
                        Cégep - Patricia
                      </div>
                      <div className="text-light-8 text-muted">
                        09/08 - Monday 19:00
                      </div>

                      <h5 className="sub-title mt-4">112,90$</h5>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-md-6">
                    <div className="card text-center emboss-white d-flex flex-column justify-content-center align-items-center">
                      <img src="./assets/vectors/reg-3.svg" alt="img" />

                      <div className="mt-2 badge bg-secondary rounded-pill w-50 mb-2 text-light">
                        Indoors
                      </div>

                      <div className="fw-600 fs-16 mb-1 ">Dance Class</div>

                      <div className="text-light-8 mb-1 text-muted">
                        Cégep - Patricia
                      </div>
                      <div className="text-light-8 text-muted">
                        09/08 - Monday 19:00
                      </div>

                      <h5 className="sub-title mt-4">112,90$</h5>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-md-6">
                    <div className="card text-center emboss-white d-flex flex-column justify-content-center align-items-center">
                      <img src="./assets/vectors/reg-4.svg" alt="img" />

                      <div className="mt-2 badge bg-secondary rounded-pill w-50 mb-2 text-light">
                        Indoors
                      </div>

                      <div className="fw-600 fs-16 mb-1 ">Day Camp</div>

                      <div className="text-light-8 mb-1 text-muted">
                        Cégep - Patricia
                      </div>
                      <div className="text-light-8 text-muted">
                        09/08 - Monday 19:00
                      </div>

                      <h5 className="sub-title mt-4">112,90$</h5>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="d-flex justify-content-end">
                <button className="btn btn-gradient">
                  Convert to Invoice
                  <img
                    className="ms-3"
                    src="./assets/vectors/r-arrow-btn.svg"
                    alt="arrow"
                  />
                </button>
              </div> */}
            </div>
            <div className="col-lg-4">
              <div className="d-flex justify-content-between">
                <h3 className="section-title">Details</h3>
                <div className="text-poppins fw-600 fs-18">#329878316-23</div>
              </div>
              <div className="details-container">
                <div className="details-main mt-3">
                  <h3 className="section-title fs-18">Bryandy Boyd</h3>

                  {activeProfiles.map((pro) => {
                    return (
                      <div className="item w-100 mt-3">
                        <div className="text">
                          <div className="w-100 d-flex justify-content-between">
                            <div className="line d-flex align-items-center">
                              <div className="c-pointer img user-img">
                                <img src={pro.img} alt="img" />
                              </div>
                              <div>
                                <div className="fw-600">Yoga Class</div>
                                <div className="sub-title text-light-5 fs-12">
                                  A32-2342-123-2321
                                </div>
                              </div>
                            </div>
                            <div className="line">
                              <h4 className="sub-title">87.00$</h4>
                              <div className="fw-600 text-blue">x1</div>
                            </div>
                          </div>
                          <div className="ps-5">
                            <h5 className="mt-3 sub-title fw-500 text-blue mb-1">
                              Passes noded with this
                            </h5>
                            <div className="line">
                              <div className="radio-container">
                                <label className="custom-radio">
                                  (8 x) 90 min. Monday 19h
                                  <input
                                    defaultChecked={true}
                                    type="checkbox"
                                    name="gender"
                                    defaultValue={"checked"}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                              {/* <h5 className="sub-title"></h5> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="details-main">
                  <h3 className="section-title">Bryandy Boyd</h3>

                  <div className="w-100 d-flex justify-content-between">
                    <div className="line d-flex align-items-center">
                      <div className="c-pointer img user-img">
                        <img src="./assets/img/client-vector-7.png" alt="img" />
                      </div>
                      <div>
                        <div className="fw-600">Day Camp</div>
                        <div className="sub-title text-light-5 fs-12">
                          A32-2342-123-2321
                        </div>
                      </div>
                    </div>
                    <div className="line">
                      <h4 className="sub-title">87.00$</h4>
                      <div className="fw-600 text-blue">x1</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="details-foot">
                <div className="col-12">
                  <div className="row px-3 pt-4">
                    <div className="col-6 pb-3 text-dark-4 text-manrope fw-800 fs-12">
                      Subtotal
                    </div>
                    <div className="col-6 pb-3 text-dark-4 text-manrope fs-12 d-flex justify-content-end">
                      100.00$
                    </div>
                    <div className="col-6 text-dark-4 text-manrope fw-800 fs-12">
                      TPS
                    </div>
                    <div className="col-6 text-dark-4 text-manrope fs-12 d-flex justify-content-end">
                      5.00$
                    </div>
                    <div className="col-6 pb-3 text-dark-4 text-manrope fw-800 fs-12">
                      TVQ
                    </div>
                    <div className="col-6 pb-3 text-dark-4 text-manrope fs-12 d-flex justify-content-end">
                      9.98$
                    </div>
                    <div className="col-6 pb-3 text-dark-4 text-manrope fw-800 fs-14">
                      Total
                    </div>
                    <div className="col-6 pb-3 text-dark-4 text-manrope fw-800 fs-14 d-flex justify-content-end">
                      114.98$
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CoursesLayout>
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
        <img src="./assets/vectors/arrow-down-dark.svg" alt="bin" /> &nbsp;
        {selectedItem ? selectedItem : placeholder}
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

export default CoursesRegistration;
