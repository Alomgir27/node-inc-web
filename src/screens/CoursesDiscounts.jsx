import React from "react";
import clsx from "clsx";

import AddBtn from "../components/AddBtn";
import SearchInput from "../components/SearchInput";
import CoursesLayout from "../layouts/CoursesLayout";
import FancyInput from "../components/FancyInput";

const CoursesRequests = () => {
  return (
    <CoursesLayout title="Rules">
      <div className="discounts-container">
        <div className="container-fluid px-0">
          <div className="row gy-5">
            <div className="col-lg-4">
              <div className="emboss-white br-16 px-3 py-4 h-100">
                <div className="funcs my-4 px-2 d-flex justify-content-between">
                  <SearchInput
                    rootClassName="w-100"
                    placeholder="Type Predictive Name"
                  />
                  <AddBtn title="NEW" />
                </div>

                <div className="left-items px-2">
                  {[
                    {
                      name: "Brake Change",
                      type: "Service",
                      used: 12,
                      active: true,
                    },
                    {
                      name: "Tire Change",
                      type: "Service",
                      used: 12,
                    },
                    {
                      name: "Brake Change",
                      type: "Service",
                      used: 12,
                    },
                    {
                      name: "Brake Change",
                      type: "Service",
                      used: 12,
                    },
                    {
                      name: "Brake Change",
                      type: "Article",
                      used: 12,
                    },
                    {
                      name: "Brake Change",
                      type: "Article",
                      used: 12,
                    },
                  ].map((el, idx) => {
                    const { active, name, type, used } = el;

                    return (
                      <div
                        key={"service" + idx}
                        className={clsx("item p-3", { active })}
                      >
                        <div className="d-flex justify-content-between">
                          <div className="fw-500">{name}</div>
                          <h5 className="text-light-5 sub-title">
                            Used {used} times
                          </h5>
                        </div>
                        <h5 className="mt-2 text-light-5 sub-title">{type}</h5>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-lg-8 ps-lg-5">
              <div className="d-flex">
                <FancyInput
                  rootClassName="mt-0 px-5 py-4 br-16 me-5 flex-grow-1"
                  id="title"
                  label="Title of Predictive"
                  value="Brake Change"
                />
                <FancyInput
                  rootClassName="mt-0"
                  small
                  prominant
                  embossed={false}
                  add
                  id="services"
                  label="Add Services"
                  value="Brake Change"
                />
                <FancyInput
                  rootClassName="mt-0 ps-4 pe-5"
                  small
                  prominant
                  embossed={false}
                  add
                  id="node"
                  label="Node Form"
                  value="Brake Change"
                />
              </div>

              <div className="settings">
                <div className="item">
                  <div className="title">TRIGGERS</div>

                  <div className="item-main">
                    <div className="item-sub-section">
                      <div className="fw-600 fs-16 d-flex">
                        Rule from Service Sheet
                        <img
                          className="ms-3"
                          src="./assets/vectors/bin-3.svg"
                          alt="bin"
                        />
                      </div>

                      <div className="d-flex">
                        <img
                          className="me-3"
                          src="./assets/vectors/bin-3.svg"
                          alt="bin"
                        />
                        <div className="text fw-400 fs-16 ">
                          When
                          <span className="text-blue fw-600">
                            {" "}
                            Services
                          </span>{" "}
                          are together with a count of 3;
                        </div>
                      </div>
                    </div>
                    <div className="item-sub-section">
                      <div className="fw-600 fs-16">&amp; based on days</div>

                      <div className="d-flex">
                        <img
                          className="me-3"
                          src="./assets/vectors/bin-3.svg"
                          alt="bin"
                        />
                        <div className="text fw-400 fs-16 ">
                          <span className="text-blue fw-600 fs-16">2</span> days
                          before{" "}
                          <span className="text-blue fw-600 fs-16">all </span>
                          Services will begin
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="item">
                  <div className="title">ACTIONS</div>

                  <div className="item-main">
                    <div className="item-sub-section">
                      <div className="fw-600 fs-16 d-flex">
                        Discount to do{" "}
                        <img
                          className="ms-3"
                          src="./assets/vectors/bin-3.svg"
                          alt="bin"
                        />
                      </div>

                      <div className="d-flex">
                        <img
                          className="me-3"
                          src="./assets/vectors/bin-3.svg"
                          alt="bin"
                        />
                        <div className="text fw-400 fs-16 ">
                          When
                          <span className="text-blue fw-600">
                            {" "}
                            Services
                          </span>{" "}
                          are together with a count of 3;
                        </div>
                      </div>
                    </div>
                    <div className="item-sub-section">
                      <div className="fw-600 fs-16">&amp; based on days</div>

                      <div className="d-flex">
                        <img
                          className="me-3"
                          src="./assets/vectors/bin-3.svg"
                          alt="bin"
                        />
                        <div className="text fw-400 fs-16 ">
                          <span className="text-blue fw-600 fs-16">2</span> days
                          before{" "}
                          <span className="text-blue fw-600 fs-16">all </span>
                          Services will begin
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end mt-5">
                <button className="btn btn-gradient px-5">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CoursesLayout>
  );
};

export default CoursesRequests;
