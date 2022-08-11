import React, { useState } from "react";
import AddBtn from "../components/AddBtn";

import Tabs from "../components/Tabs";
import CoursesLayout from "../layouts/CoursesLayout";
import ModalOrder from "../modals/ModalOrder";

const CoursesRequests = () => {
  const [isModalOpenState, setIsModalOpenState] = useState(false);

  const modalOpenHandler = () => {
    setIsModalOpenState(true);
  };

  const modalCloseHandler = () => {
    setIsModalOpenState(false);
  };

  return (
    <CoursesLayout title="Requests">
      <ModalOrder
        isOpen={isModalOpenState}
        modalCloseHandler={modalCloseHandler}
      />
      <div className="requests-container">
        <div className="d-flex justify-content-between align-items-center mt-4 table-head ps-xxl-5 ms-xxl-4">
          <Tabs
            text
            tabClassName="mb-4 mb-sm-0"
            className="flex-column flex-sm-row w-100"
            tabGroupName="requests-tabs"
            data={[
              {
                label: "All",
                target: "all",
                badgeText: "27",
                active: true,
              },
              {
                label: "On Hold",
                target: "on-hold",
                badgeText: "4",
              },
              {
                label: "To Do",
                target: "todo",
                badgeText: "4",
              },
              {
                label: "In Progress",
                target: "in-progress",
                badgeText: "7",
              },
              {
                label: "Done",
                target: "done",
                badgeText: "12",
              },
              {
                label: "Archived",
                target: "archived",
                badgeText: "9",
              },
            ]}
          />

          <div className="d-flex align-items-center">
            <AddBtn onClick={modalOpenHandler} pale title="NEW" />
          </div>
        </div>

        <div className="table-container ps-sm-5 pe-sm-4 short-vertical-scrollbar mt-3">
          <table>
            <thead>
              <tr>
                <th>
                  #
                  <div className="sort">
                    <img src="./assets/vectors/sort-up.svg" alt="sort" />
                    <img src="./assets/vectors/sort-down.svg" alt="sort" />
                  </div>
                </th>
                <th>
                  Request Name
                  <div className="sort">
                    <img src="./assets/vectors/sort-up.svg" alt="sort" />
                    <img src="./assets/vectors/sort-down.svg" alt="sort" />
                  </div>
                </th>
                <th>Leader</th>
                <th>
                  Status
                  <div className="info">
                    <img src="./assets/vectors/info.svg" alt="" />
                  </div>
                </th>
                <th>Categore</th>
                <th>
                  Start &amp; Due Date
                  <div className="info">
                    <img src="./assets/vectors/info.svg" alt="" />
                  </div>
                </th>
                <th>Noded with</th>
              </tr>
            </thead>
            <tbody className="emboss-white br-16">
              {[
                {
                  name: "Allosaurus web app",
                  LU: "./assets/vectors/requests-user-1.svg",
                  status: "done",
                  categorie: "3",
                  startDate: "15 May 2021",
                  dueDate: "15 May 2021",
                  nodedWith: "WO #342354543",
                },
                {
                  name: "MicroRaptor website",
                  LU: "./assets/vectors/requests-user-1.svg",
                  status: "done",
                  categorie: "3",
                  startDate: "15 May 2021",
                  dueDate: "15 May 2021",
                  nodedWith: "WO #342354543",
                },
                {
                  name: "Tarius landing page",
                  LU: "./assets/vectors/requests-user-2.svg",
                  status: "hold",
                  categorie: undefined,
                  startDate: undefined,
                  dueDate: undefined,
                  nodedWith: "WO #342354543",
                },
                {
                  name: "Rugops App",
                  LU: "./assets/vectors/requests-user-1.svg",
                  status: "todo",
                  categorie: "3",
                  startDate: "15 May 2021",
                  dueDate: "15 May 2021",
                  nodedWith: "Mathilde Dubé",
                },
                {
                  name: "Erketu",
                  LU: "./assets/vectors/requests-user-1.svg",
                  status: "todo",
                  categorie: "3",
                  startDate: "15 May 2021",
                  dueDate: "15 May 2021",
                  nodedWith: "Christian Latour",
                },
                {
                  name: "Order Part Light",
                  LU: "./assets/vectors/requests-user-2.svg",
                  status: "progress",
                  categorie: "3",
                  startDate: "15 May 2021",
                  nodedWith: "WO #894578534",
                },
                {
                  name: "Gemini",
                  LU: "./assets/vectors/requests-user-3.svg",
                  status: "done",
                  categorie: "3",
                  startDate: "15 May 2021",
                  dueDate: "15 May 2021",
                  nodedWith: "WO #894578534",
                },
                {
                  name: "Allosaurus web app",
                  LU: "./assets/vectors/requests-user-1.svg",
                  status: "done",
                  categorie: "3",
                  startDate: "15 May 2021",
                  dueDate: "15 May 2021",
                  nodedWith: "WO #342354543",
                },
                {
                  name: "MicroRaptor website",
                  LU: "./assets/vectors/requests-user-1.svg",
                  status: "done",
                  categorie: "3",
                  startDate: "15 May 2021",
                  dueDate: "15 May 2021",
                  nodedWith: "WO #342354543",
                },
                {
                  name: "Tarius landing page",
                  LU: "./assets/vectors/requests-user-2.svg",
                  status: "hold",
                  categorie: undefined,
                  startDate: undefined,
                  dueDate: undefined,
                  nodedWith: "WO #342354543",
                },
                {
                  name: "Rugops App",
                  LU: "./assets/vectors/requests-user-1.svg",
                  status: "todo",
                  categorie: "3",
                  startDate: "15 May 2021",
                  dueDate: "15 May 2021",
                  nodedWith: "Mathilde Dubé",
                },
                {
                  name: "Erketu",
                  LU: "./assets/vectors/requests-user-1.svg",
                  status: "todo",
                  categorie: "3",
                  startDate: "15 May 2021",
                  dueDate: "15 May 2021",
                  nodedWith: "Christian Latour",
                },
                {
                  name: "Order Part Light",
                  LU: "./assets/vectors/requests-user-2.svg",
                  status: "progress",
                  categorie: "3",
                  startDate: "15 May 2021",
                  nodedWith: "WO #894578534",
                },
                {
                  name: "Gemini",
                  LU: "./assets/vectors/requests-user-3.svg",
                  status: "done",
                  categorie: "3",
                  startDate: "15 May 2021",
                  dueDate: "15 May 2021",
                  nodedWith: "WO #894578534",
                },
                {
                  name: "Rugops App",
                  LU: "./assets/vectors/requests-user-1.svg",
                  status: "todo",
                  categorie: "3",
                  startDate: "15 May 2021",
                  dueDate: "15 May 2021",
                  nodedWith: "Mathilde Dubé",
                },
                {
                  name: "Erketu",
                  LU: "./assets/vectors/requests-user-1.svg",
                  status: "todo",
                  categorie: "3",
                  startDate: "15 May 2021",
                  dueDate: "15 May 2021",
                  nodedWith: "Christian Latour",
                },
                {
                  name: "Order Part Light",
                  LU: "./assets/vectors/requests-user-2.svg",
                  status: "progress",
                  categorie: "3",
                  startDate: "15 May 2021",
                  nodedWith: "WO #894578534",
                },
                {
                  name: "Gemini",
                  LU: "./assets/vectors/requests-user-3.svg",
                  status: "done",
                  categorie: "3",
                  startDate: "15 May 2021",
                  dueDate: "15 May 2021",
                  nodedWith: "WO #894578534",
                },
              ].map((el, idx) => {
                const {
                  name,
                  LU,
                  status,
                  categorie,
                  startDate,
                  dueDate,
                  nodedWith,
                } = el;

                return (
                  <tr key={"requests-item" + idx}>
                    <td>{idx + 1}</td>
                    <td>{name}</td>
                    <td>
                      <img src={LU} alt="user" />
                    </td>
                    <td>
                      <div className={`status-badge ${status}`}>
                        <div className="text">
                          {status === "done" && "Done"}
                          {status === "hold" && "On Hold"}
                          {status === "todo" && "To Do"}
                          {status === "progress" && "In Progress"}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={`category${categorie ? "" : " empty"}`}>
                        {categorie || (
                          <img
                            src="./assets/vectors/schedule-add.svg"
                            alt="add"
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="date">{startDate}</div> <span>&gt;</span>
                      <div className="date">{dueDate}</div>
                    </td>
                    <td>{nodedWith}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </CoursesLayout>
  );
};

export default CoursesRequests;
