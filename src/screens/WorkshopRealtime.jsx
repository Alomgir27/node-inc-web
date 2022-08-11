import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkshopLayout from "../layouts/WorkshopLayout";
import Input from "../components/Input";
import Switch from "../components/Switch";
import FancyInput from "../components/FancyInput";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "../components/DraggableElement";
import DragDrop from "./Drag_and_Drop/DragDrop";
import moment from "moment";

const getItems = (count, prefix) =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `item-${randomId}`,
      prefix,
      content: `item ${randomId}`,
      title: "Liquid flows under",
      subTitle: "Toyota Prius 2021",
      location: "Location 2",
      progress: 60,
      userName: "Vanessa Duba",
      time: "14:00",
      withSwitch: true,
      switchActive: true,
      userImg: "./assets/img/table-user-2.png",
      bottomUserImg: "./assets/vectors/card-user-6.svg",
    };
  });
const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};
const tokens = JSON.parse(localStorage.getItem("tokens"));
const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const WorkshopRealtime = () => {
  const [date, setDate] = useState(
    moment(`${new Date()}`).format("YYYY-MM-DD")
  );

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  const previousDate = () => {
    setDate(moment(date).subtract(1, "day").format("YYYY-MM-DD"));
  };

  const nextDate = () => {
    setDate(moment(date).add(1, "days").format("YYYY-MM-DD"));
  };

  const InvoiceId = localStorage.getItem("invoiceId");
  // for Update InvoiceId
  const patchHandler = async () => {
    try {
      const res = await axios({
        method: "PATCH",
        headers: {
          authorization: `Bearer ${tokens.accessToken}`,
          idToken: tokens.idToken,
          refresh_token: tokens.refreshToken,
        },
        data: {
          metadata: {
            status: 0,
          },
        },
        // provide invoice id you can get it from localStorage
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/invoice/${InvoiceId}`,
      });
      // setCardsData(res.data.invoices);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // patchHandler();
  }, []);
  return (
    <WorkshopLayout>
      <div className="realtime-container">
        <div className="container-fluid px-0 mt-3">
          <div className="row gy-4">
            <div className="col-12">
              <div className="d-flex justify-content-end align-items-center mb-4">
                <div className="mx-3 d-flex justify-content-center align-items-center gap-2">
                  <button
                    className="bottom-btns-profile btn m-2 btn-emboss"
                    onClick={() => previousDate()}
                  >
                    <img
                      src="./assets/vectors/arrow-left-blue.svg"
                      alt="arrow-up"
                    />
                  </button>

                  <FancyInput
                    id="date"
                    type="date"
                    name="date"
                    placeholder="start time"
                    inputClassName="dateInput"
                    onChange={onChangeDate}
                    value={date}
                  />

                  <button
                    className="bottom-btns-profile btn m-2 btn-emboss"
                    onClick={() => nextDate()}
                  >
                    <img
                      src="./assets/vectors/arrow-right-blue.svg"
                      alt="arrow-left"
                    />
                  </button>
                </div>
                <Input
                  select
                  id="employee"
                  name="employee"
                  options={[{ text: "All Employees" }]}
                />
              </div>
            </div>

            <div className="DragDropContextContainer">
              <DragDrop
                date={date ? date : moment(new Date()).format("YYYY-MM-DD")}
              />
            </div>
          </div>
        </div>
      </div>
    </WorkshopLayout>
  );
};

const RealtimeCards = ({ cardsData }) => {
  return (
    <div className="cards">
      {cardsData.map((el, idx) => {
        const {
          title,
          subTitle,
          location,
          progress,
          userName,
          time,
          userImg,
          withSwitch,
          switchActive,
          withAdd,
          bottomUserImg,
          displaced,
        } = el;
        return (
          <div
            key={"card-" + title + idx}
            className={`card-wrap${displaced ? " card-displaced" : ""}`}
          >
            <div className="card">
              <div className="card-head d-flex justify-content-between align-items-center">
                <div className="text">
                  <div className="fw-600">{title}</div>
                  <h5 className="sub-title text-light-5">{subTitle}</h5>
                </div>
                <div className="options d-flex justify-content-end align-items-center">
                  {withSwitch && <Switch defaultChecked={switchActive} />}
                  {userImg && (
                    <img className="user-img" src={userImg} alt="add" />
                  )}
                  {withAdd && (
                    <button className="btn btn-plus">
                      <img
                        src="./assets/vectors/workshop-cart-add.svg"
                        alt="add"
                      />
                    </button>
                  )}
                </div>
              </div>
              <div className="card-body">
                <h4 className="sub-title text-light-5">{location}</h4>
                <div className="progress-bar">
                  <div className="bg"></div>
                  <div
                    className="progress"
                    style={{ width: progress + "%" }}
                  ></div>
                </div>
              </div>
              <div className="card-foot">
                <div className="user-info">
                  {bottomUserImg && <img src={bottomUserImg} alt="card-user" />}
                  <h4 className="sub-title text-light-5">{userName}</h4>
                </div>
                <div className="time">
                  <div className="text fw-600">{time}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default WorkshopRealtime;
