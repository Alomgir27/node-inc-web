import React, { useEffect, useState, useContext } from 'react';
import DatePicker from "react-datepicker";
import clsx from "clsx";

import CoursesLayout from "../layouts/CoursesLayout.jsx";
import Select from "../components/select/select";
import Option from "../components/select/option";
import Switch from "../components/Switch";

const CoursesLive = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <CoursesLayout>
      <div className="realtime-container courses-live">
        <div className="container-fluid px-0 mt-3">
          <div className="row gy-4">
            <div className="col-12">
              <div className="d-flex justify-content-end align-items-center mb-4">
                <div className="date-picker-root">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MMMM dd, yyyy"
                  />
                  <img
                    className="calendar ms-4 me-5"
                    src="./assets/vectors/calendar.svg"
                    alt="calendar"
                  />
                </div>
                <Select
                  placeholder="All Employee"
                  style={{ marginLeft: 50, minWidth: 110 }}
                >
                  <Option value="All Employee">All Employee</Option>
                  <Option value="Employee 1">Employee 1</Option>
                  <Option value="Employee 2">Employee 2</Option>
                </Select>
                <Select
                  placeholder="Polyvalente"
                  style={{ marginLeft: 50, minWidth: 110 }}
                >
                  <Option value="All Employee">Polyvalente</Option>
                  <Option value="Location 1">Location 1</Option>
                  <Option value="Location 2">Location 2</Option>
                </Select>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="in-progress">
                <div className="sub-section">
                  <h3 className="section-title">Polyvalente : Local 213</h3>

                  <div className="cards in-progress">
                    {[
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                        nodedImg: "./assets/img/table-user-2.png",
                      },
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                        nodedImg: "./assets/img/table-user-2.png",
                      },
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                        nodedImg: "./assets/img/table-user-2.png",
                      },
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                        nodedImg: "./assets/img/table-user-2.png",
                      },
                    ].map((el, idx) => {
                      return <User key={Math.random() + idx} {...el} />;
                    })}
                  </div>
                </div>

                <div className="sub-section">
                  <h3 className="section-title">Polyvalente : Gym 4</h3>

                  <div className="cards in-progress">
                    {[
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                        nodedImg: "./assets/img/table-user-2.png",
                      },
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                        nodedImg: "./assets/img/table-user-2.png",
                      },
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                        nodedImg: "./assets/img/table-user-2.png",
                      },
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                        nodedImg: "./assets/img/table-user-2.png",
                      },
                    ].map((el, idx) => {
                      return <User key={Math.random() + idx} {...el} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="in-progress">
                <div className="sub-section">
                  <h3 className="section-title">Polyvalente : Gym 5</h3>

                  <div className="cards in-progress">
                    {[
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                        nodedImg: "./assets/img/table-user-2.png",
                      },
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                        nodedImg: "./assets/img/table-user-2.png",
                      },
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                        nodedImg: "./assets/img/table-user-2.png",
                      },
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                        nodedImg: "./assets/img/table-user-2.png",
                      },
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                        nodedImg: "./assets/img/table-user-2.png",
                      },
                    ].map((el, idx) => {
                      return <User key={Math.random() + idx} {...el} />;
                    })}
                  </div>
                </div>

                <div className="sub-section">
                  <div className="cards-wrap displaced">
                    <div className="cards">
                      {[
                        {
                          userImg: "./assets/vectors/card-user-4.svg",
                          name: "Christiano Rollado",
                          courseName: "Zumba Course (3/8)",
                          time: "43 min",
                          nodedImg: "./assets/img/table-user-2.png",
                        },
                        {
                          userImg: "./assets/vectors/card-user-4.svg",
                          name: "Christiano Rollado",
                          courseName: "Zumba Course (3/8)",
                          time: "43 min",
                          nodedImg: "./assets/img/table-user-2.png",
                        },
                      ].map((el, idx) => {
                        return <User key={Math.random() + idx} {...el} />;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="next-up" style={{ height: "unset" }}>
                <div className="sub-section">
                  <h3 className="section-title">Waiting</h3>

                  <div className="cards emb">
                    {[
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                      },
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                      },
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        time: "43 min",
                      },
                    ].map((el, idx) => {
                      return <User key={Math.random() + idx} {...el} />;
                    })}
                  </div>
                </div>
              </div>

              <div className="done">
                <div className="sub-section">
                  <h3 className="section-title">Finish / Quit</h3>

                  <div className="cards emb">
                    {[
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                        amount: "$",
                      },
                      {
                        userImg: "./assets/vectors/card-user-4.svg",
                        name: "Christiano Rollado",
                        courseName: "Zumba Course (3/8)",
                      },
                    ].map((el, idx) => {
                      return <User key={Math.random() + idx} {...el} />;
                    })}
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

const User = ({ userImg, name, courseName, time, amount, nodedImg }) => {
  return (
    <div className="live-user d-flex justify-content-between align-items-center">
      <img src={userImg} alt="card-user" />
      <div>
        <div className="fw-600">{name}</div>
        <div className="fs-12 text-light-5 lh-1">{courseName}</div>
      </div>
      <Switch className="ms-1" defaultChecked={true} />
      <div className={clsx("fs-12 text-light-5 ms-2", { "text-blue": amount })}>
        {time || amount || ""}
      </div>
      {nodedImg && <img style={{ width: 36 }} src={nodedImg} alt="card-user" />}
    </div>
  );
};

export default CoursesLive;
