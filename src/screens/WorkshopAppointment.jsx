/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import WorkshopLayout from "../layouts/WorkshopLayout";
import AddBtn from "../components/AddBtn";
import Schedular from "../components/Schedular";
import BlockEvents from "../components/BlockEvents";
import ModalAppointment from "../modals/ModalAppointment";
import ModalPasses from "../modals/ModalPassesAppointment";
import { BASEURL, sendNetworkRequest } from "../http/http-request";
import FancyInput from "../components/FancyInput";
import moment from "moment";

const WorkshopAppointment = () => {
  const [appointmentModalOpenState, setAppointmentModalOpenState] = useState(false);
  const [passesModalOpenState, setPassesModalOpenState] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [clientList, setCLientList] = useState([]);
  const [humanList, setHumanList] = useState([]);
  const [passesValue, setPassesValue] = useState(null);
  const [passes, setPasses] = useState([]);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(3);
  const [subPasses, setSubPasses] = useState([]);


  const modalOpenHandler = (func) => {
    func(true);
  };
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


  const goto = (x) => {
    if(x == -1){
      if(left + x >= 0){
        setLeft(left + x);
        setRight(Math.max(right + x, 3));
      }
    }
    else {
      if(x + right <= passes.length){
        setLeft(left + x);
        setRight(right + x);
      }
    }
  }


  const createPasses = async () => {
    if(passesValue === null)return
    try {
      const res = await sendNetworkRequest(`${BASEURL}/service/pass/manual`, 'POST', {
          startDate: passesValue?.startDate,
          endDate: passesValue?.endDate,
          // assigned_to: "",
          service_id: '9137ea1e-2c68-4357-884c-7ff5a2f390b2',
          name: passesValue?.name,
          status: passesValue?.status,
          timer: passesValue?.timer
      });
      console.log(res);
      setPassesValue(null);
      alert('Passes Created Successfully');
    } catch(err){
      console.log(err);
    }
  }
  const FetchPasses = async () => {
     try {
       const res = await sendNetworkRequest(`${BASEURL}/service/passes/daily?date=${moment(date).format('MM-DD-YYYY')}`);
       console.log(res);
       setPasses(res?.data?.passes);
       if(res?.data?.passes){
        let item = [];
        for (let i = left; i < Math.min(res.data.passes.length, right); ++i){
          item.push(res.data.passes[i]);
        }
        setSubPasses(item);
       }
     } catch(err){
       console.log(err);
     }
  }
  useEffect(() => {
    let item = [];
    for (let i = left; i < Math.min(passes.length, right); ++i){
      item.push(passes[i]);
    }
    setSubPasses(item);
  }, [left, right])
  useEffect(() => {
    createPasses();
  }, [passesValue]);
  useEffect(() => {
    FetchPasses();
  }, [date]);

  useEffect(() => {
    const fetch = async () => {
      sendNetworkRequest(`${BASEURL}/core/employees`)
        .then((response) => {
          let ef = [
            {
              text: "Select in the menu",
              disabled: true,
              // selected: true,
            },
          ];
          response.data.map((e) => {
            
            ef.push({
              text: e.human_identity_id.first_name,
              value: e.human_identity_id.id,
              // disabled: false,
              // selected: true,
            });
            // console.log(response.data);
          });
          setEmployeeList(ef);
        })
        .catch((err) => {
          console.log(err);
        });
      const currentUser = await sendNetworkRequest(`${BASEURL}/users/me`);
      sendNetworkRequest(
        `${BASEURL}/users/connections/${currentUser.data.user.id}/0`,
        "GET",
        ""
      )
        .then(async (response) => {
          let ef = [];
          // const human = []
          response.data.connections.forEach(async (el) => {
            const res = await sendNetworkRequest(
              `${BASEURL}/users/entity/${el.entity_id.id}`
            );
            ef.push({
              text:
                res.data.human_identity_id.first_name +
                " " +
                res.data.human_identity_id.last_name,
              value: el.entity_id.id,
              // disabled: false,
              // selected: true,
            });
            // human.push(res.data)
          });
          setCLientList(ef);
          // setHumanList(human)
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    fetch();
  }, []);

  const modalCloseHandler = (func) => {
    func(false);
  };
  return (
    <WorkshopLayout>
      <div className="appointment-container">
        <div className="d-flex justify-content-end align-items-center my-4">
          <div className="mx-3 d-flex justify-content-center align-items-center gap-2">
            <button
              className="bottom-btns-profile btn m-2 btn-emboss"
              onClick={() => previousDate()}
            >
              <img src="./assets/vectors/arrow-left-blue.svg" alt="arrow-up" />
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
          <AddBtn
            pale
            title="NEW"
            onClick={() => modalOpenHandler(setAppointmentModalOpenState)}
          />
        </div>
        <ModalAppointment
          isOpen={appointmentModalOpenState}
          employeeList={employeeList}
          clientList={clientList}
          humanList={humanList}
          modalCloseHandler={() =>
            modalCloseHandler(setAppointmentModalOpenState)
          }
        />
        <div className="schedule-control-section-wrap">
          <BlockEvents
            Date={date ? date : moment(`${new Date()}`).format("YYYY-MM-DD")}
          />
        </div>

        <div className="week-load">
          <div className="left">
            <div className="ps-3">
            <div className="btn center-content mb-2 p-0">
                  <img src="./assets/vectors/car-1.svg" alt="rental" />
                </div>
              <h3 className="section-title">Rental Passes</h3>
              <div className="text-label fs-10 text-light-5 lh-1 mt-1">
                Cars rental passes <br /> will be posted here
              </div>
            </div>
            
        <div className="d-flex ps-3">
          <AddBtn
            
            title="PASS"
            onClick={() => modalOpenHandler(setPassesModalOpenState)}
          />
          <ModalPasses
          isOpen={passesModalOpenState}
          savePass={setPassesValue}
          modalCloseHandler={() => {
            modalCloseHandler(setPassesModalOpenState)
          }
          }
        />
        </div>
            <div className="selector">
              <div className="d-flex align-items-center">
              </div>
            </div>
          </div>
          <div className="right">
            <div className="load-main">
              {/* {[
                {
                  size: "two",
                  number: 2,
                  userImg: "./assets/img/chat-me.png",
                },
                {
                  size: "two",
                  number: 2,
                  userImg: "./assets/img/chat-me.png",
                },
                {
                  size: "four",
                  number: 4,
                  userImg: "./assets/img/chat-me.png",
                },
                {
                  size: "two",
                  number: 2,
                  userImg: "./assets/img/chat-me.png",
                },
                {
                  size: "one",
                  number: 1,
                  userImg: "./assets/img/chat-me.png",
                },
                {
                  size: "two",
                  number: 2,
                  userImg: "./assets/img/chat-me.png",
                },
              ]. */}
              {subPasses && (
                 subPasses.map((item, idx) => {
                  return (
                    <div key={"load-item" + idx} 
                    className="item"
                    style={{
                      backgroundColor : 'rgba(37, 37, 107, 0.4)',
                      margin: '5px 8px',
                      borderRadius: '5px',
                      width: '100%',
                      padding: '8px',
                      height: '80px'
                    }}
                    >
                      <div className="number-wrap"
                      style={{
                        display: 'flex',
                        flexDirection:'column',
                        textAlign: 'center',
                        alignItems:'center',
                        justifyContent:'center'
                      }}
                      >
                          <div 
                          className="text-light"
                          style={{
                            fontSize: '20px',
                            textTransform: 'uppercase',
                            margin:'5px 0'
                          }}
                          >{item?.name}</div>
                          <div 
                          className='text-light'
                          >
                            {moment(item?.startDate).format('hh:mm') + ' to '+ moment(item?.endDate).format('hh:mm ')}
                          </div>
                      </div>
                      {/* <img src={userImg} alt="" /> */}
                    </div>
                  );
                 })
              )}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center ">
          <button
              className="bottom-btns-profile btn m-2 btn-emboss"
              onClick={() => goto(-1)}
           >
              <img src="./assets/vectors/arrow-left-blue.svg" alt="arrow-up" />
          </button>

           <button
              className="bottom-btns-profile btn m-2 btn-emboss"
              onClick={() => goto(+1)}
            >
              <img
                src="./assets/vectors/arrow-right-blue.svg"
                alt="arrow-left"
              />
            </button>
        </div>
        
      </div>
    </WorkshopLayout>
  );
};

export default WorkshopAppointment;
