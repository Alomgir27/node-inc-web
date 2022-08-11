import React from "react";

import Modal from "./Modal";
import AddBtn from "../components/AddBtn";
import Input from "../components/Input";
import FancyInput from "../components/FancyInput";
import { BASEURL, sendNetworkRequest } from "../http/http-request";
const ModalProfile = (props) => {
  const WorkshopRequest = async (event) => {
    event.preventDefault();
    sendNetworkRequest(
      `${BASEURL}/invoice/fbdc6b9f-c735-4b45-93ad-2b1ed871bc38`,
      "GET",
      ""
    )
      .then((res) => {
        if (res.status == 200) {
          //  const {id,target_entity_id,owner_entity_id} = res.data;
          console.log(res.data);
          sendNetworkRequest(`${BASEURL}/request`, "POST", {
            invoice_id: res.data.id,
            item_id: "fbdc6b9f-c735-4b45-93ad-2b1ed871bc38",
            target_entity_id: res.data.origin_invoicing_profile.id,
            target_user_id: res.data.target_entity_id.id,
          })
            .then((response) => {
              if (response.status == 201) {
                alert("Request has successfully been created");
              }
            })
            .catch((err) => {
              alert(err.response.data.error[0].msg);
              console.log(err.response);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form action="" onSubmit={WorkshopRequest}>
      <div>
        <Modal
          title="Order Rear Light"
          className="order-modal"
          buttonText="SAVE"
          headInput={{
            embossed: false,
            add: true,
            id: "assigned",
            name: "assigned",
            label: "Assign to",
            labelClassName: "mb-0 fs-14",
            prominant: true,
          }}
          headRightComp={
            <div className="options d-flex ms-3 align-items-end pb-3">
              <div className="btn">
                <img src="./assets/vectors/clip.svg" alt="clip" />
              </div>
              <div className="btn">
                <img src="./assets/vectors/pta-ni.svg" alt="pta-ni" />
              </div>
              <div className="btn ms-4 ps-2">
                <img src="./assets/vectors/horizontal-menu.svg" alt="menu" />
              </div>
            </div>
          }
          {...props}
        >
          <div className="profile-modal-body">
            <div className="profile-modal-main">
              <div className="container-fluid px-0">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="emboss-input pb-3">
                      <div className="fw-600">Description</div>
                      <div className="text-small text-dark">
                        Clays is a new type of tool that brings together the
                        best parts of spreadsheets, coding &amp; simple
                        automation. Quickly connect your apps and code into
                        automated workflows.
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <FancyInput
                      select
                      options={[
                        {
                          text: "INTERNAL (IR)",
                        },
                      ]}
                      prominant
                      id="internal"
                      name="internal"
                    />
                  </div>
                </div>
              </div>

              <div className="ps-3">
                <div className="mt-4 d-flex justify-content-between">
                  <div className="fw-700 fs-12 sub-title">Sub-Tasks</div>
                  <AddBtn pale small />
                </div>

                <div className="sub-tasks">
                  {[
                    {
                      checked: true,
                      text: "Create real-time seeket for agenda",
                      day: "Tommorrow",
                    },
                    {
                      text: "Suggest a discussion of statistics",
                    },
                  ].map((el, idx) => {
                    return (
                      <div
                        key={"sub-task" + idx}
                        className={`sub-task${el.checked ? " checked" : ""}`}
                      >
                        <Input
                          defaultChecked={el.checked}
                          greenCheckbox
                          options={[{ text: el.text }]}
                          checkbox
                        />
                        <div>
                          {!el.day && (
                            <img
                              src="./assets/vectors/calender-4.svg"
                              alt="calender"
                            />
                          )}
                          {el.day && (
                            <div className="day">
                              <img
                                className="me-2"
                                src="./assets/vectors/calender-4-red.svg"
                                alt="calender"
                              />
                              {el.day}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <div className="emboss-c flex-grow-1 me-4">
                  <div className="p-4 py-3">
                    <div className="fw-700 fs-12 sub-title mb-3">
                      Attachments
                    </div>

                    <div className="attachment-sm ms-2">
                      <img
                        src="./assets/img/comment-attachment.jpg"
                        alt="attachment"
                      />
                    </div>
                  </div>
                </div>
                <AddBtn className="mt-3" pale small />
              </div>
            </div>

            <div className="comments mt-4">
              {[
                {
                  name: "Moinul Hasan",
                  task: "created this task.",
                  date: "Yesterday at 6:27 PM",
                  edit: "change the due date oct 12.",
                  editDate: "Oct 2.",
                },
                {
                  name: "Moinul Hasan",
                  task: "attached",
                  date: "2 days ago",
                  attachment: "./assets/img/comment-attachment.jpg",
                },
              ].map((el, idx) => {
                const { name, task, date, edit, editDate, attachment } = el;

                return (
                  <div key={"comment" + idx} className="comment-item">
                    <div className="img">
                      <img
                        src="./assets/vectors/comment-user.svg"
                        alt="comment-user"
                      />
                    </div>
                    <div className="text">
                      <div className="text-1 fs-13">
                        {name + " " + task}{" "}
                        <span className="text-light-5 fs-11">{date}</span>
                      </div>
                      {edit && (
                        <div className="text-2">
                          <span className="fs-11 fw-600">{name}</span>{" "}
                          <span className="fs-11 fw-500"> {edit}</span>{" "}
                          <span className="text-light-5 fs-11">{editDate}</span>
                        </div>
                      )}
                      {attachment && (
                        <div className="attachment">
                          <img src={attachment} alt="name" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      </div>
    </form>
  );
};

export default ModalProfile;
