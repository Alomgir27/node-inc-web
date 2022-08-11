import React, { useState } from "react";
import clsx from "clsx";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import AddBtn from "../../components/AddBtn";
import SearchInput from "../../components/SearchInput";
import CoursesLayout from "../../layouts/CoursesLayout";
import FancyInput from "../../components/FancyInput";

import "./Events&Blocks.scss";

const EventsAndBlocks = () => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const onChange = (date) => {
    console.log(date.toString());
  };
  return (
    <CoursesLayout title="Events &amp; Blocks">
      <div id="blocks-container">
        <div className="container-fluid px-0">
          <div className="row gy-5">
            <div className="col-lg-4">
              <DateRange
                rangeColors={["#1e55a9", "#000"]}
                ranges={date}
                moveRangeOnFirstSelection={false}
                onChange={(item) => setDate([item.selection])}
              />
              <div className="mt-5 emboss-white br-16 px-lg-3 py-4">
                <div className="funcs my-4 px-2 d-flex justify-content-between">
                  <SearchInput
                    inputStyle={{ maxWidth: 220 }}
                    moveRangeOnFirstSelection
                    retainEndDateOnFirstSelection
                    rootClassName="w-100"
                    placeholder="Type Pass Name"
                  />
                </div>

                <div className="left-items px-2">
                  {[
                    {
                      name: "Private Course with Ludo",
                      type: "Cégep - Sept 23 to March 12",
                      tag: "Block",
                      active: true,
                    },
                    {
                      name: "Unavailable location",
                      type: "Polyvalente - Sept 7 to Sept 8",
                      tag: "Block",
                    },
                    {
                      name: "Teakwondo Compet",
                      type: "Cégep - Sept 23 to Sept 23",
                      tag: "Event",
                    },
                  ].map((el, idx) => {
                    const { active, name, type, tag } = el;

                    return (
                      <div
                        key={"service" + idx}
                        className={clsx("item p-3", { active })}
                      >
                        <div className="d-flex justify-content-between">
                          <div className="fw-600">{name}</div>
                          <h5 className="text-light-5 sub-title">{tag}</h5>
                        </div>
                        <h5 className="mt-2 text-light-5 sub-title">{type}</h5>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-lg-8 ps-lg-5">
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-center mb-5">
                    <div className="br-50 p-3 round-tab">
                      <img src="./assets/vectors/courses-tab-1.svg" alt="" />
                    </div>
                    <div className="br-50 p-3 round-tab">
                      <img src="./assets/vectors/courses-tab-2.svg" alt="" />
                    </div>
                    <div className="br-50 p-3 round-tab">
                      <img src="./assets/vectors/courses-tab-3.svg" alt="" />
                    </div>
                    <div className="br-50 p-3 round-tab">
                      <img src="./assets/vectors/courses-tab-4.svg" alt="" />
                    </div>
                    <div className="br-50 emboss-md-inner p-3 round-tab">
                      <img src="./assets/vectors/courses-tab-4.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="d-flex justify-content-between">
                    <h3 className="section-title">Passes</h3>
                    <AddBtn pale title="ADD" />
                  </div>

                  <div className="mt-5">
                    {[
                      {
                        name: "23-09-2021",
                        type: "Cégep",
                        tag: "Active",
                        active: true,
                      },
                      {
                        name: "06-01-2022",
                        type: "Cégep",
                        tag: "Active",
                      },
                      {
                        name: "12-03-2022",
                        type: "Cégep",
                        tag: "Active",
                      },
                    ].map((el, idx) => {
                      const { active, name, type, tag } = el;

                      return (
                        <div
                          key={"pass" + idx}
                          className={clsx("item px-4 py-4", {
                            active,
                            "br-16 emboss-white": active,
                          })}
                        >
                          <div className="d-flex justify-content-between me-4">
                            <div className="fw-600">{name}</div>
                            <h5 className="text-grad-blue">{tag}</h5>
                          </div>
                          <h5 className="text-light-5 sub-title">{type}</h5>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="emboss-inner br-16 p-5 mt-md-0 mt-5">
                    <h3 className="section-title">
                      Bryandy Boyd{" "}
                      <img src="./assets/vectors/verified-black.svg" alt="" />
                    </h3>
                    <h5 className="mt-2 text-light-6 sub-title">
                      Profile : Charles Lamothe
                    </h5>

                    <div className="d-flex mt-3">
                      <div className="noded-img">
                        <img src="./assets/img/client-vector-1.png" alt="" />
                      </div>
                      <div className="noded-img">
                        <img
                          className="sm"
                          src="./assets/vectors/car-1.svg"
                          alt=""
                        />
                      </div>
                      <div className="noded-img active">
                        <img src="./assets/img/client-vector-2.png" alt="" />
                      </div>
                    </div>

                    <div className="container-fluid px-0 mt-4">
                      <div className="row">
                        <div className="col-sm-6">
                          <FancyInput
                            rootClassName="my-3"
                            embossed={false}
                            disabled
                            label="Status"
                            placeholder="Active"
                          />
                        </div>
                        <div className="col-sm-6">
                          <FancyInput
                            rootClassName="my-3"
                            embossed={false}
                            disabled
                            label="Type"
                            placeholder="Individual"
                          />
                        </div>
                        <div className="col-sm-6">
                          <FancyInput
                            rootClassName="my-3"
                            embossed={false}
                            disabled
                            label="Start time"
                            placeholder="23-09-2021 1:00pm"
                          />
                        </div>
                        <div className="col-sm-6">
                          <FancyInput
                            rootClassName="my-3"
                            embossed={false}
                            disabled
                            label="End time"
                            placeholder="23-09-2021 1:00pm"
                          />
                        </div>
                        <div className="col-sm-6">
                          <FancyInput
                            rootClassName="my-3"
                            embossed={false}
                            disabled
                            label="Location"
                            placeholder="Cégep"
                          />
                        </div>
                        <div className="col-sm-6">
                          <FancyInput
                            rootClassName="my-3"
                            embossed={false}
                            disabled
                            label="Sub Location"
                            placeholder="Room 232"
                          />
                        </div>
                        <div className="col-sm-6">
                          <FancyInput
                            rootClassName="my-3"
                            embossed={false}
                            disabled
                            label="On Contract?"
                            placeholder="No"
                          />
                        </div>
                      </div>
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

export default EventsAndBlocks;
